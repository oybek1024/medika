<template>
   <div class= "w-full mt-5 mb-10 p-5 min-h-tmminbody sm:min-h-tminbody text-tgreen bg-white flex flex-col items-center justify-center">

    <p class="font-bold text-center text-base sm:text-xl mb-3 sm:mb-10 xl:mb-5">
      Patient : {{ fullDossier.fistName }} {{ fullDossier.lastName }}
    </p>
    <p class="font-bold text-center text-base sm:text-base mb-3 sm:mb-10 xl:mb-5">
      Dossier N° {{ fullDossier.noDossier}}
      <span :class="['border mr-5 px-5 py-1 text-white text-sm', fullDossier.isCompleted ? 'bg-tgreen' : 'bg-twarning']">
        {{fullDossier.isCompleted ? 'Complet' : 'Incomplet'}}
      </span>
      <i @click="getEditDossierLink()" class="feather icon-edit text-xl mr-1 hover:border cursor-pointer"></i>
    </p>

    <p class="text-center mt-3 mb-3 cursor-pointer underline" @click="backToDash">
      Revenir à l'espace Secretaire 
    </p>
    
    <dossier-general-info />
    
    <dossier-survey />

    <dossier-uploaded-doc />

    <dossier-consent />

    <button v-if="fullDossier && fullDossier.phone" :class="[sendSMSBtnClass, !fullDossier.isCompleted ? 'bg-t_dark_green' : 'bg-t_disabled']" @click.prevent="sendSMS">
      <p v-if="sending" class="text-xl animate-spin feather icon-loader mr-2"></p>
      <i class="feather icon-send mr-1"></i>Relancer SMS
    </button>
    <p v-if="fullDossier && !fullDossier.phone" class="bg-twarning px-3 text-white mt-3">Dossier n'a pas de numéro de téléphone</p>

    <dossier-history />

    <p class="text-center mt-5 cursor-pointer underline" @click="backToDash">
      Revenir à l'espace Secretaire 
    </p>


  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex-alt';

export default {
  name: 'DossierDashboard',
  components: {
    DossierGeneralInfo: () => import('./components/DossierGeneralInfo.vue'),
    DossierUploadedDoc: () => import('./components/DossierUploadedDoc.vue'),
    DossierConsent: () => import('./components/DossierConsent.vue'),
    DossierSurvey: () => import('./components/DossierSurvey.vue'),
    DossierHistory: () => import('./components/DossierHistory.vue')
  },
  data() {
    return {
      
      getDataError: '',
      sendSMSBtnClass: `
        py-2 px-5 rounded-3xl hover:shadow-xl mt-5
        text-sm text-white 
        flex justify-start items-center`,
      sending: false
    }
  },
  created() {
    let self = this;
    let dossierId = this.$route.params.dossierId;
    if (!(this.fullDossier && (this.fullDossier._id == dossierId)) ) {
      self.$myAuthAxios({
          url: `/dossier/${dossierId}`,
          method: "get"
        })
        .then(res => {
          let dossier = ((res.data || {}).data || {}).dossier;
          let status = (res.data || {}).status;
          if (status === "success" && dossier) {
            self.setFullDossier(dossier)
          }
        })
        .catch((error) => {
          self.getDataError = error;
        });
    }
  },
  computed: {
    ...mapState({
      fullDossier: (state) => state.dossier.fullDossier,
      pagingParam: (state) => state.secretary.pagingParam
    })
  },
  methods: {
    ...mapActions({
      setFullDossier: (actions) => actions.dossier.setFullDossier
    }),
    getEditDossierLink() {
      this.$router.push({ name: 'secretary-dossier-edit', params: { dossierId: this.fullDossier._id } });
    },
    backToDash() {
      this.$router.push({ name: 'secretary-dash', query: { page: this.pagingParam || 1 } });
    },
    async sendSMS() {
      let self = this;
      this.sending = true;
      let dossierId = this.$route.params.dossierId;
      await self.$myAuthAxios({
          url: `/sms/send`,
          method: "post",
          data: {
            dossierId: dossierId,
            link: `${window.location.origin}/${process.env.VUE_APP_DOSSIER_ROUTE}/login/${self.fullDossier.noDossier}`
          }
        })
        .then(res => {
          let sms = ((res.data || {}).data || {}).sms;
          let status = (res.data || {}).status;
          if ((status === "success") && sms) {
            this.sending = false;
          } else {
            this.sending = false;
          }
        })
        .catch((error) => {
          this.sending = false;
        });
    },
  }
}
</script>
