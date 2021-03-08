/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote {
    onCreateNote {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote {
    onUpdateNote {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote {
    onDeleteNote {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const onCreateWarzonePlayer = /* GraphQL */ `
  subscription OnCreateWarzonePlayer {
    onCreateWarzonePlayer {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateWarzonePlayer = /* GraphQL */ `
  subscription OnUpdateWarzonePlayer {
    onUpdateWarzonePlayer {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteWarzonePlayer = /* GraphQL */ `
  subscription OnDeleteWarzonePlayer {
    onDeleteWarzonePlayer {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreateWarzoneMatch = /* GraphQL */ `
  subscription OnCreateWarzoneMatch {
    onCreateWarzoneMatch {
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
export const onUpdateWarzoneMatch = /* GraphQL */ `
  subscription OnUpdateWarzoneMatch {
    onUpdateWarzoneMatch {
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
export const onDeleteWarzoneMatch = /* GraphQL */ `
  subscription OnDeleteWarzoneMatch {
    onDeleteWarzoneMatch {
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
