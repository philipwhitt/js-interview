import merge from 'lodash/merge'
import { combineReducers } from 'redux'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { users: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }

  return state
}

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action

  return state
}

const rootReducer = combineReducers({
  entities,
  errorMessage,
})

export default rootReducer