const MUTATION_TYPES = {
  setSecretaryId: 'SET_SECRETARY_ID',
  setFilterParams: 'SET_FILTER_PARAMS',
  setPagingParam: 'SET_PAGING_PARAM',
  init: 'INIT'
}

const actions = {
  setSecretaryId: ({ commit }, secretaryId) => {
    commit(MUTATION_TYPES.setSecretaryId, secretaryId)
  },
  setFilterParams: ({ commit }, filterParams) => {
    commit(MUTATION_TYPES.setFilterParams, filterParams)
  },
  setPagingParam: ({ commit }, pagingParam) => {
    commit(MUTATION_TYPES.setPagingParam, pagingParam)
  },
  init: ({ commit }) => {
    commit(MUTATION_TYPES.init)
  }
}

const mutations = {
  [MUTATION_TYPES.setSecretaryId]: (state, secretaryId) => {
    state.secretaryId = secretaryId
  },
  [MUTATION_TYPES.setFilterParams]: (state, filterParams) => {
    state.filterParams = Object.assign({}, filterParams)
  },
  [MUTATION_TYPES.setPagingParam]: (state, pagingParam) => {
    state.pagingParam = pagingParam
  },
  [MUTATION_TYPES.init]: (state) => {
    state.secretaryId = '',
    state.filterParams = {}
  }
}

export { actions, mutations, MUTATION_TYPES }
