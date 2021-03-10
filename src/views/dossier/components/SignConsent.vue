<template>
  <div :class="docContainer">

    <!-- title -->
    <div class="flex w-full mt-1 mb-3 sm:px-3 items-center">
      <div class="w-2/12">
        <div class="h-t_h40 w-t_w40 sm:h-t_h50 sm:w-t_w50 rounded-full bg-twarning text-white flex items-center justify-center text-2xl sm:text-3xl font-bold">
          4
        </div>
      </div>
      <h2 class="w-8/12 ml-3 sm:ml-0 text-left sm:text-center"><b>Je donne mon consentement<sup class="text-red-500">*</sup></b></h2>
    </div>

    <!-- sub title -->
    <div :class="[docClass]">J'ai bien pris connaissance de toutes les informations transmises et je donne mon consentement :</div>
    
    <!-- list of consentement -->
    <div :class="['mt-5 sm:mt-5', docClass, docLayoutClass]" v-for="(consentement, idx) in fullDossier.consentement" :key="'consentement' + idx">
      
      <!-- checkbox and text -->
      <div :class="signTextClass">
        <!-- checkbox -->
        <div class="mr-3">
          <input v-if="!consentement.isSigned"
            type="checkbox" class="mr-2 cursor-pointer" 
            :disabled="consentement.isSigned || !fullDossier.readyToSign" 
            v-model="fullDossier.consentement[idx].isAccept" 
            :id="'consentement' + idx"/>
          <i v-if="consentement.isSigned" class="feather icon-check-square mr-1"></i>
        </div>
        <!-- text -->
        <a  class="font-medium underline" :href="consentementLink(consentement.file)" target="_blank">
          A la réalisation de l'examen - et le cas échéant - à un acte de téléradiologie et aux compléments d'honoraires
        </a>
        <!-- <a v-if="consentement.titre.split(';').length > 1" 
          class="font-medium underline" 
          :href="consentementLink(consentement.file)" 
          target="_blank">
          <p v-for="(item, idx) in consentement.titre.split(';')" :key="'titre' + idx" class="mb-1">
            {{getFirstUpcase(item.trim())}}
          </p>
        </a> -->
      </div>

      <!-- button signer -->
      <div :class="signBtnContainerClass">
        <!-- error & message -->
        <p v-if="submitErr" class="py-1 text-tdanger"><i class="feather icon-alert-triangle mr-1"/>{{submitErr}}</p>
        <p v-if="message" class="py-1 text-success"><i class="feather icon-check mr-1"/>{{message}}</p>
        <!-- button -->
        <button 
          v-if="!consentement.isSigned"
          :class="['mx-auto', signBtnClass, (fullDossier.consentement[idx].isAccept && !consentement.isSigned) ? 'bg-t_dark_green' : 'bg-t_disabled']" 
          @click.prevent="sign(consentement.file, consentement.slugTitre, (idx + 1))" 
          :disabled="consentement.isSigned || !fullDossier.readyToSign">
          <p v-if="signloading == (idx + 1)" class="text-xl animate-spin feather icon-loader mr-2"></p>
          <p>Signer</p>
        </button>
        <!-- if signed -->
        <div v-if="consentement.isSigned" :class="[dejaSigneClass]">
          <i class="feather icon-check-square mr-2"></i>
          <p>déjà signé</p>
        </div>
      </div>
    </div>

    <div :class="[docClass, 'mt-5 text-sm']">
      <sup class="text-red-500">*</sup> pour signer, il faut d'abord valider les étapes 1 à 3.
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex-alt'
export default {
  name: "DocForPatient",
  data() {
    return {
      docContainer: `
        w-full xl:w-10/12
        border shadow mt-5 py-5 px-5 
        text-tgreen 
        flex flex-col items-center justify-center`,

      docClass: `
        w-full
        sm:w-10/12 
        lg:w-10/12`,

      docLayoutClass: `
        flex flex-col items-start justify-center 
        sm:flex-row sm:justify-start sm:items-center
      `,

      signTextClass: `
        flex items-start justify-left
        w-full sm:w-8/12 lg:w-8/12
        mb-2 sm:mb-0`,

      signBtnContainerClass: `
        w-full sm:w-4/12 lg:w-4/12
        sm:text-center`,

      dejaSigneClass: `
        py-2 px-5
        text-base
        flex justify-center items-center`,

      signBtnClass: `
        py-2 px-5 rounded-3xl hover:shadow-xl
        text-sm text-white 
        flex justify-start items-center`,

      signloading: false,
      uploadLoading: false,

      submitErr: '',
      message: "",
      file: '',
      currentSlugTitre: ''
    }
  },
  computed: {
    ...mapState({
      fullDossier: (state) => state.dossier.fullDossier
    }),
  },
  methods: {
    ...mapActions({
      setFullDossier: (actions) => actions.dossier.setFullDossier,
      setDossierId: (actions) => actions.dossier.setDossierId,
      setDossier: (actions) => actions.dossier.setDossier
    }),
    getFirstUpcase(titre) {
      return titre.charAt(0).toUpperCase() + titre.slice(1);
    },
    consentementLink(file) {
      return this.$getFileLink(file);
    },
    sign(file, slugTitre, idx) {
      let self = this;
      this.signloading = idx;
      
      let today = new Date();
      // yyyy/mm/dd:hh:mm
      let yyyy = today.getFullYear();
      let mm = today.getMonth() + 1;
      let dd = today.getDate();
      let hh = today.getHours();
      let mn = today.getMinutes();
      if (mm < 10) mm = "0" + mm;
      if (dd < 10) dd = "0" + mm;
      if (hh < 10) hh = "0" + hh;
      if (mn < 10) mn = "0" + mn;
      let currentDate = `${yyyy}/${mm}/${dd}:${hh}:${mn}`;

      this.$myAuthAxios({
        url: `/dossier/me/sign?slugTitre=${slugTitre}`,
        method: 'PUT',
        data: {
          currentDate: currentDate
        }
      })
      .then(res => {
        if (res.data) {
          self.message = self.$message.send_ok();
          let dossier = ((res.data || {} ).data || {} ).dossier || {}
          self.setDossierId(dossier._id)
          self.setDossier(dossier)
          self.setDossier(dossier)
          const { examenId, examenCentreId, ...oldObj } = dossier;
          let newobj = Object.assign({}, {
            examenId: self.fullDossier.examenId, 
            examenCentreId: self.fullDossier.examenCentreId, 
            ...oldObj 
          });
          self.setFullDossier(newobj);
          self.signloading = false;
          window.open(self.$getFileLink(file), '_blank');
        }
      })
      .catch(err => {
        let data = (err || {}).data;
        let message = ((err || {}).data || {}).message;
        if (message) {
            self.submitErr = message;
        } else {
            self.submitErr = data;
        }
        self.signloading = false;
      })
    }
  }
}
</script>

