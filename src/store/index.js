import { Store } from 'vuex'

// modules
import { dossierStoreModule } from './modules/dossier'
import { secretaryStoreModule } from './modules/secretary'

export const createStore = () => new Store({
  modules: {
    dossier: dossierStoreModule,
    secretary: secretaryStoreModule
  }
})
