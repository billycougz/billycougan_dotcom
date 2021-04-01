import React, { Component } from "react";
import { createWarzoneMatch as createWarzoneMatchMutation } from "../graphql/mutations";
import { API, Auth } from "aws-amplify";
import { listWarzoneMatchs } from "../graphql/queries";
import { Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { listUsers } from "../graphql/queries";
import "./warzone.css";

class Warzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      players: [{}],
      friends: [],
      availablePlayers: [],
      matches: [],
      view: "add"
    };
  }

  async fetchUsers() {
    const apiData = await API.graphql({ query: listUsers });
    return apiData.data.listUsers ? apiData.data.listUsers.items : [];
  }

  componentDidMount() {
    this.fetchWarzoneMatches();
    this.fetchUsers().then(users => {
      console.log(users);
      this.findCurrentUser(users);
      this.setState({
        players: [{}],
        friends: users,
        availablePlayers: users
      });
    });
  }

  async findCurrentUser(users) {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const currentUser = users.find(user => user.id === attributes.sub);
    console.log(currentUser);
    this.setState({ currentUser });
  }

  async createWarzoneMatch() {
    let { players } = this.state;
    players.forEach(player => {
      player.playerId = player.id.toString();
      delete player.id;
      delete player.username;
    });
    const data = {
      results: players
    };
    console.log(players);
    await API.graphql({
      query: createWarzoneMatchMutation,
      variables: { input: data }
    });
  }

  async fetchWarzoneMatches() {
    const apiData = await API.graphql({ query: listWarzoneMatchs });
    const matches = apiData.data.listWarzoneMatchs.items;
    await Promise.all(
      matches.map(async note => {
        return note;
      })
    );
    console.log(matches);
    this.setState({ matches });
    //setNotes(apiData.data.ListWarzoneMatchs.items);
  }

  getPlayerAverages(playerId) {
    const totals = { score: 0, kills: 0, deaths: 0, damage: 0 };
    let count = 0;
    this.state.matches.forEach(item => {
      const playerResult = item.results.find(
        result => result.playerId === playerId
      );
      if (playerResult) {
        totals.score += playerResult.score;
        totals.kills += playerResult.kills;
        totals.deaths += playerResult.deaths;
        totals.damage += playerResult.damage;
        count++;
      }
    });
    return {
      score: totals.score / count,
      kills: totals.kills / count,
      deaths: totals.deaths / count,
      damage: totals.damage / count
    };
  }

  getPlayerNameFromId(id) {
    const friend = this.state.friends.find(friend => friend.id === id);
    return friend ? friend.username : null;
  }

  onAddPlayer() {
    const players = this.state.players;
    players.push({});
    this.setState({ players });
  }

  onSelectPlayer(event, player, playerIndex) {
    let { players, availablePlayers, friends } = this.state;
    // Store the previously selected player - will need to be added back to available players
    const previouslySelectedPlayer = friends.find(
      friend => friend.id === player.id
    );
    // Update the selected player
    const selectedPlayer = availablePlayers.find(
      player => player.id === event.target.value
    );
    player.id = selectedPlayer.id;
    player.username = selectedPlayer.username;
    players[playerIndex] = player;
    // Update the available players
    availablePlayers = this.state.availablePlayers.filter(
      player => player.id !== event.target.value
    );
    if (previouslySelectedPlayer) {
      availablePlayers.push(previouslySelectedPlayer);
    }
    this.setState({ players, availablePlayers });
  }

  onRemovePlayer(player, playerIndex) {
    let { players, availablePlayers, friends } = this.state;
    // Store the previously selected player - will need to be added back to available players
    const previouslySelectedPlayer = friends.find(
      friend => friend.id === player.id
    );
    if (previouslySelectedPlayer) {
      availablePlayers.push(previouslySelectedPlayer);
    }
    players.splice(playerIndex, 1);
    this.setState({ players, availablePlayers });
  }

  onUpdatePlayer(event, playerIndex, attribute) {
    console.log(event);
    const { players } = this.state;
    players[playerIndex][attribute] = event.target.value;
    this.setState({ players });
  }

  onSubmit() {
    let emptyCount = 0;
    for (const player of this.state.players) {
      if (!player.id) {
        emptyCount++;
      }
      if (!player.score && player.score !== 0) {
        emptyCount++;
      }
      if (!player.kills && player.kills !== 0) {
        emptyCount++;
      }
      if (!player.deaths && player.deaths !== 0) {
        emptyCount++;
      }
      if (!player.damage && player.damage !== 0) {
        emptyCount++;
      }
    }
    if (emptyCount) {
      alert("There are " + emptyCount + " empty fields.");
    } else {
      this.createWarzoneMatch();
      // const doSubmit = window.confirm("Ready to submit?");
    }
    console.log(this.state.players);
  }

  render() {
    return (
      <div id="warzone-container">
        <h1 className="warzone-logo pt-2">WARZONE</h1>
        <h1 className="warzone-logo">Tracker</h1>
        <Alert variant="warning" className="portrait-warning">
          When using a mobile device, it's recommended to view this app in
          landscape mode.
        </Alert>
        <div className="mb-3 text-center">
          <ToggleButtonGroup type="checkbox" value={this.state.view}>
            <ToggleButton
              variant="light"
              value="add"
              onChange={e => {
                this.setState({ view: "add" });
              }}
            >
              Add Game
            </ToggleButton>
            <ToggleButton
              variant="light"
              value="history"
              onChange={e => {
                this.setState({ view: "history" });
              }}
            >
              View History
            </ToggleButton>
            <ToggleButton
              variant="light"
              value="averages"
              onChange={e => {
                this.setState({ view: "averages" });
              }}
            >
              View Averages
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        {this.state.view === "add" && (
          <div className="tinted-container">
            <Table responsive>
              <thead>
                <tr>
                  <th style={{ width: "33%" }}>Player</th>
                  <th>Score</th>
                  <th>Kills</th>
                  <th>Contracts</th>
                  <th>Damage</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.players.map((player, index) => (
                  <tr key={"player-" + index}>
                    <td>
                      <Form.Group>
                        <Form.Control
                          value={player.id}
                          onChange={event =>
                            this.onSelectPlayer(event, player, index)
                          }
                          as="select"
                          type="number"
                        >
                          <option value={player.id}>
                            {player.username ? player.username : ""}
                          </option>
                          {this.state.availablePlayers.map(
                            (availablePlayer, index) => (
                              <option
                                key={"availablePlayer-" + index}
                                value={availablePlayer.id}
                              >
                                {availablePlayer.username}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Control
                          type="number"
                          inputMode="numeric"
                          onChange={event =>
                            this.onUpdatePlayer(event, index, "score")
                          }
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Control
                          type="number"
                          inputMode="numeric"
                          onChange={event =>
                            this.onUpdatePlayer(event, index, "kills")
                          }
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Control
                          type="number"
                          inputMode="numeric"
                          onChange={event =>
                            this.onUpdatePlayer(event, index, "deaths")
                          }
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group>
                        <Form.Control
                          type="number"
                          onChange={event =>
                            this.onUpdatePlayer(event, index, "damage")
                          }
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Button
                        variant="secondary"
                        hidden={!index && this.state.players.length === 1}
                        onClick={() => this.onRemovePlayer(player, index)}
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="pl-3 pb-4">
              <Button
                className="mr-3"
                variant="secondary"
                hidden={this.state.players.length === 4}
                onClick={() => this.onAddPlayer()}
              >
                Add player
              </Button>
              <Button variant="primary" onClick={() => this.onSubmit()}>
                Submit
              </Button>
            </div>
          </div>
        )}

        {this.state.view === "history" &&
          this.state.matches.map((match, index) => (
            <div key={index}>
              <div className="tinted-container">
                <p className="date">
                  {new Date(match.createdAt).toDateString()}
                  {" · "}
                  {new Date(match.createdAt).toLocaleTimeString()}
                </p>
                <Table responsive>
                  <thead>
                    <tr>
                      <th style={{ width: "33%" }}>Player</th>
                      <th>Score</th>
                      <th>Kills</th>
                      <th>Contracts</th>
                      <th>Damage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {match.results.map((result, index) => (
                      <tr key={index}>
                        <td>{this.getPlayerNameFromId(result.playerId)}</td>
                        <td>{result.score}</td>
                        <td>{result.kills}</td>
                        <td>{result.deaths}</td>
                        <td>{result.damage}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <br />
            </div>
          ))}
        {this.state.view === "averages" && (
          <div className="tinted-container">
            <Table responsive>
              <thead>
                <tr>
                  <th style={{ width: "33%" }}>Player</th>
                  <th>Score</th>
                  <th>Kills</th>
                  <th>Contracts</th>
                  <th>Damage</th>
                </tr>
              </thead>
              <tbody>
                {this.state.friends.map((player, index) => {
                  const averages = this.getPlayerAverages(player.id);
                  return !averages.score ? null : (
                    <tr key={index}>
                      <td>{this.getPlayerNameFromId(player.id)}</td>
                      <td>{averages.score}</td>
                      <td>{averages.kills}</td>
                      <td>{averages.deaths}</td>
                      <td>{averages.damage}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    );
  }
}

export default withAuthenticator(Warzone);
