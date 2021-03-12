import React, { Component } from "react";
import { createWarzoneMatch as createWarzoneMatchMutation } from "../graphql/mutations";
import { API } from "aws-amplify";
import { listWarzoneMatchs } from "../graphql/queries";
import wallpaper from "./warzone.jpg";
import { Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { withAuthenticator } from "@aws-amplify/ui-react";

class Warzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [{}],
      friends: [],
      availablePlayers: [],
      returnedMatches: [],
      view: "add",
      isMobilePortrait: false
    };
  }

  componentDidMount() {
    this.setIsMobilePortrait();
    window.addEventListener("resize", () => this.setIsMobilePortrait());
    this.fetchWarzoneMatches();
    this.fetchFriends().then(friends => {
      this.setState({ players: [{}], friends, availablePlayers: friends });
    });
  }

  setIsMobilePortrait() {
    const isMobilePortrait = window.innerWidth < 480;
    this.setState({ isMobilePortrait });
  }

  fetchFriends() {
    const friends = [
      { id: 1, name: "willycougz" },
      { id: 2, name: "smittytheman" },
      { id: 3, name: "pkcsmokecity" },
      { id: 4, name: "jacobmoneybagz" }
    ];
    return new Promise(resolve => {
      resolve(friends);
    });
  }

  async createWarzoneMatch() {
    let { players } = this.state;
    players.forEach(player => {
      player.playerId = player.id.toString();
      delete player.id;
      delete player.name;
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
    this.setState({ returnedMatches: matches });
    //setNotes(apiData.data.ListWarzoneMatchs.items);
  }

  getPlayerAverages(data, playerName) {
    const playerId = this.getPlayerIdFromName(playerName);
    console.log(playerName);
    const totals = { score: 0, kills: 0, deaths: 0, damage: 0 };
    let count = 0;
    data.forEach(item => {
      const playerResult = item.results.find(
        result => result.playerId == playerId
      );
      if (playerResult) {
        totals.score += playerResult.score;
        totals.kills += playerResult.kills;
        totals.deaths += playerResult.deaths;
        totals.damage += playerResult.damage;
        count++;
      }
    });
    const averages = {
      score: totals.score / count,
      kills: totals.kills / count,
      deaths: totals.deaths / count,
      damage: totals.damage / count
    };
    console.log(averages);
  }

  getPlayerIdFromName(name) {
    const friend = this.state.friends.find(friend => friend.name == name);
    return friend ? friend.id : null;
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
      friend => friend.id == player.id
    );
    // Update the selected player
    const selectedPlayer = availablePlayers.find(
      player => player.id == event.target.value
    );
    player.id = selectedPlayer.id;
    player.name = selectedPlayer.name;
    players[playerIndex] = player;
    // Update the available players
    availablePlayers = this.state.availablePlayers.filter(
      player => player.id != event.target.value
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
      friend => friend.id == player.id
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
      if (!player.score && player.score != 0) {
        emptyCount++;
      }
      if (!player.kills && player.kills != 0) {
        emptyCount++;
      }
      if (!player.deaths && player.deaths != 0) {
        emptyCount++;
      }
      if (!player.damage && player.damage != 0) {
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
    const backgroundStyles = {
      background: "url(" + wallpaper + ") no-repeat center center fixed",
      "-webkit-background-size": "cover",
      "-moz-background-size": "cover",
      "-o-background-size": "cover",
      "background-size": "cover",
      "min-height": "1000px"
    };
    return (
      <div id="warzone-container" style={backgroundStyles}>
        <h1 className="warzone-logo">WARZONE</h1>
        <h1 className="warzone-logo">Tracker</h1>
        {this.state.isMobilePortrait && (
          <Alert variant="warning">
            When using a mobile device, it's recommended to view this app in
            landscape mode.
          </Alert>
        )}
        <div className="mb-3 text-center">
          <ToggleButtonGroup type="checkbox" value={this.state.view}>
            <ToggleButton
              variant="light"
              value="add"
              onChange={e => {
                this.setState({ view: "add" });
              }}
            >
              Add new game
            </ToggleButton>
            <ToggleButton
              variant="light"
              value="view"
              onChange={e => {
                this.setState({ view: "view" });
              }}
            >
              View statistics
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
                  <th>Deaths</th>
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
                            {player.name ? player.name : ""}
                          </option>
                          {this.state.availablePlayers.map(
                            (availablePlayer, index) => (
                              <option
                                key={"availablePlayer-" + index}
                                value={availablePlayer.id}
                              >
                                {availablePlayer.name}
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

        {this.state.view === "view" && (
          <div className="tinted-container">
            <label>Username</label>
            <input
              type="text"
              onChange={event => {
                this.findAverageName = event.target.value;
              }}
            ></input>
            <button
              onClick={() =>
                this.getPlayerAverages(
                  this.state.returnedMatches,
                  this.findAverageName
                )
              }
            >
              Get averages
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default withAuthenticator(Warzone);
