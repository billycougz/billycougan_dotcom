import React, { Component } from "react";
import { createWarzoneMatch as createWarzoneMatchMutation } from "../graphql/mutations";
import { API } from "aws-amplify";
import { listWarzoneMatchs } from "../graphql/queries";
import wallpaper from "./warzone.jpg";

export default class Warzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [{}],
      friends: [],
      availablePlayers: [],
      returnedMatches: []
    };
  }

  componentDidMount() {
    this.fetchWarzoneMatches();
    this.fetchFriends().then(friends => {
      this.setState({ players: [{}], friends, availablePlayers: friends });
    });
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
      alert(
        "There are " + emptyCount + " fields that still need to be entered."
      );
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
      "background-size": "cover"
    };
    return (
      <div id="warzone-container" style={backgroundStyles}>
        <h1 className="warzone-logo">WARZONE</h1>
        <h1 className="warzone-logo">Tracker</h1>
        <table className="tinted-container">
          <thead>
            <tr>
              <th>Player</th>
              <th>Score</th>
              <th>Kills</th>
              <th>Deaths</th>
              <th>Damage</th>
            </tr>
          </thead>
          <tbody>
            {this.state.players.map((player, index) => (
              <tr key={"player-" + index}>
                <td>
                  <select
                    value={player.id}
                    onChange={event =>
                      this.onSelectPlayer(event, player, index)
                    }
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
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    onChange={event =>
                      this.onUpdatePlayer(event, index, "score")
                    }
                  ></input>
                </td>
                <td>
                  <input
                    type="number"
                    onChange={event =>
                      this.onUpdatePlayer(event, index, "kills")
                    }
                  ></input>
                </td>
                <td>
                  <input
                    type="number"
                    onChange={event =>
                      this.onUpdatePlayer(event, index, "deaths")
                    }
                  ></input>
                </td>
                <td>
                  <input
                    type="number"
                    onChange={event =>
                      this.onUpdatePlayer(event, index, "damage")
                    }
                  ></input>
                </td>
                <td>
                  <button
                    hidden={!index && this.state.players.length === 1}
                    onClick={() => this.onRemovePlayer(player, index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            <button
              hidden={this.state.players.length === 4}
              onClick={() => this.onAddPlayer()}
            >
              Add player
            </button>
            <button onClick={() => this.onSubmit()}>Submit</button>
          </tbody>
        </table>
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
      </div>
    );
  }
}
