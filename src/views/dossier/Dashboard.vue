<template>
  <div class= "w-full mt-5 mb-10 p-5 min-h-tmminbody sm:min-h-tminbody text-tgreen bg-white flex flex-col items-center justify-center">

    <!-- subtitle -->
    <p class="font-bold text-center text-base sm:text-base mb-3 sm:mb-10 xl:mb-5">
      Votre dossier N° {{ fullDossier.noDossier}}
      <span :class="['px-5 py-1 text-white text-sm', fullDossier.isCompleted ? 'bg-tgreen' : 'bg-twarning']">
        {{fullDossier.isCompleted ? 'Complet' : 'Incomplet'}}
      </span>
    </p>

    <!-- patient/ Rdv infos -->
    <general-info />

    <p class="mt-3 mb-0 py-3 px-5 font-bold text-white bg-twarning text-center">Pour vous pré-enregistrer, merci de valider les 4 étapes ci-dessous</p>

    <!-- question before examen -->
    <survey-form />

    <!-- upload ordonnance -->
    <upload-ordonnance />

    <!-- document for patient -->
    <doc-for-patient />

    <!-- upload document -->
    <sign-consent />

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex-alt';
import UploadOrdonnance from './components/UploadOrdonnance.vue';

export default {
  name: 'DossierDashboard',
  components: {
    GeneralInfo: () => import('./components/GeneralInfo.vue'),
    DocForPatient: () => import('./components/DocForPatient.vue'),
    SurveyForm: () => import('./components/SurveyForm.vue'),
    SignConsent: () => import('./components/SignConsent.vue'),
    UploadOrdonnance: () => import('./components/UploadOrdonnance.vue')
  },
  data() {
    return {
      errMsg: ''
    }
  },
  created() {
    let self = this;
    if (!(this.fullDossier && this.fullDossier._id)) {
      self.$myAuthAxios({
        url: "/dossier/me",
        method: "get"
      })
      .then(res => {
        let dossier = ((res.data || {}).data || {}) .dossier;
        let status = (res.data || {}).status;
        if (status === "success" && dossier) {
          self.setFullDossier(res.data.data.dossier)
          self.setDossier(res.data.data.dossier)
        }
      })
      .catch((error) => {
        self.errMsg = error;
      });
    }
  },
  computed: {
    ...mapState({
      fullDossier: (state) => state.dossier.fullDossier
    })
  },
  methods: {
    ...mapActions({
      setDossier: (actions) => actions.dossier.setDossier,
      setFullDossier: (actions) => actions.dossier.setFullDossier
    })
  }
}
</script>
