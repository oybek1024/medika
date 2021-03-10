import { actions, mutations } from './actions-mutations'

const initialState = {
  secretaryId: '',
  pagingParam: '',
  filterParams: {
    complet: '',
    inComplet: '',
    sendRequested: '',
    minDate: '',
    maxDate: '',
    searchText: ''
  }
}

const getters = {
  // baseInfo: (state) => {
  //   return {}
  // }
}

const secretaryStoreModule = {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
actions}

export { secretaryStoreModule }
