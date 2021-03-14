/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      username
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      username
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      username
      createdAt
      updatedAt
    }
  }
`;
export const createWarzonePlayer = /* GraphQL */ `
  mutation CreateWarzonePlayer(
    $input: CreateWarzonePlayerInput!
    $condition: ModelWarzonePlayerConditionInput
  ) {
    createWarzonePlayer(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateWarzonePlayer = /* GraphQL */ `
  mutation UpdateWarzonePlayer(
    $input: UpdateWarzonePlayerInput!
    $condition: ModelWarzonePlayerConditionInput
  ) {
    updateWarzonePlayer(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteWarzonePlayer = /* GraphQL */ `
  mutation DeleteWarzonePlayer(
    $input: DeleteWarzonePlayerInput!
    $condition: ModelWarzonePlayerConditionInput
  ) {
    deleteWarzonePlayer(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const createWarzoneMatch = /* GraphQL */ `
  mutation CreateWarzoneMatch(
    $input: CreateWarzoneMatchInput!
    $condition: ModelWarzoneMatchConditionInput
  ) {
    createWarzoneMatch(input: $input, condition: $condition) {
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
export const updateWarzoneMatch = /* GraphQL */ `
  mutation UpdateWarzoneMatch(
    $input: UpdateWarzoneMatchInput!
    $condition: ModelWarzoneMatchConditionInput
  ) {
    updateWarzoneMatch(input: $input, condition: $condition) {
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
export const deleteWarzoneMatch = /* GraphQL */ `
  mutation DeleteWarzoneMatch(
    $input: DeleteWarzoneMatchInput!
    $condition: ModelWarzoneMatchConditionInput
  ) {
    deleteWarzoneMatch(input: $input, condition: $condition) {
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
