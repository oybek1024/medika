const MUTATION_TYPES = {
  setDossier: 'SET_DOSSIER',
  setFullDossier: 'SET_FULL_DOSSIER',
  setDossiers: 'SET_DOSSIERS',
  setDossierId: 'SET_DOSSIER_ID',
  setDossierHistory: 'SET_DOSSIER_HISTORY',
  init: 'INIT',
}

const actions = {
  setDossierHistory: ({ commit }, dossierHistory) => {
    commit(MUTATION_TYPES.setDossierHistory, dossierHistory);
  },
  setFullDossier: ({ commit }, fullDossier) => {
    commit(MUTATION_TYPES.setFullDossier, fullDossier);
  },
  setDossier: ({ commit }, dossier) => {
    commit(MUTATION_TYPES.setDossier, dossier);
  },
  setDossiers: ({ commit }, dossiers) => {
    commit(MUTATION_TYPES.setDossiers, dossiers);
  },
  setDossierId: ({ commit }, dossierId) => {
    commit(MUTATION_TYPES.setDossierId, dossierId);
  },
  init: ({ commit }) => {
    commit(MUTATION_TYPES.init)
  }
}

const mutations = {
  [MUTATION_TYPES.setDossierHistory]: (state, dossierHistory) => {
    state.dossierHistory = dossierHistory;
  },
  [MUTATION_TYPES.setFullDossier]: (state, fullDossier) => {
    state.fullDossier = Object.assign({}, fullDossier);
  },
  [MUTATION_TYPES.setDossier]: (state, dossier) => {
    state.dossier = Object.assign({}, dossier);
  },
  [MUTATION_TYPES.setDossiers]: (state, dossiers) => {
    state.dossiers = dossiers;
  },
  [MUTATION_TYPES.setDossierId]: (state, dossierId) => {
    state.dossierId = dossierId;
  },
  [MUTATION_TYPES.init]: (state) => {
    state.dossier = {};
    state.dossiers = [];
    state.fullDossier = {};
    state.dossierId = '';
  }
}

export { actions, mutations, MUTATION_TYPES }
