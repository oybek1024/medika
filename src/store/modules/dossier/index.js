import { actions, mutations } from './actions-mutations'

const initialState = {
  dossier: {},
  dossiers: {},
  fullDossier: {},
  dossierId: '',
  dossierHistory: []
}

const getters = {
  // baseInfo: (state) => {
  //   return {}
  // }
}

const dossierStoreModule = {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
actions}

export { dossierStoreModule }
