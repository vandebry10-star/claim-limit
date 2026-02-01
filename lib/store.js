const store = global.__CLAIM_STORE__ || {
  sessions: {},
  codes: {}
}

global.__CLAIM_STORE__ = store

export default store
