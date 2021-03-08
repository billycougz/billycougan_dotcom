/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWarzonePlayer = /* GraphQL */ `
  query GetWarzonePlayer($id: ID!) {
    getWarzonePlayer(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listWarzonePlayers = /* GraphQL */ `
  query ListWarzonePlayers(
    $filter: ModelWarzonePlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWarzonePlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWarzoneMatch = /* GraphQL */ `
  query GetWarzoneMatch($id: ID!) {
    getWarzoneMatch(id: $id) {
      id
      results {
        playerId
        score
        kills
        deaths
        damage
      }
      createdAt
      updatedAt
    }
  }
`;
export const listWarzoneMatchs = /* GraphQL */ `
  query ListWarzoneMatchs(
    $filter: ModelWarzoneMatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWarzoneMatchs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        results {
          playerId
          score
          kills
          deaths
          damage
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
