<template>
  <div :class="[docContainer]">

    <h2 class="mb-5"><b>Les consentements à signer</b></h2>

    <!-- signed consentement -->
    <div v-for="(con, idx) in consentement" :key="idx" class="w-full">
      <div :class="['mt-5 sm:mt-5', docClass]">
        <div :class="titleClass">Consentement éclaire patient</div>

        <div :class="['w-6/12 sm:w-2/12 lg:w-2/12 flex justify-center']">
          <p :class="['py-1 px-3', con.file && con.isSigned ? 'bg-green-200 text-blue-900' : 'bg-red-200 text-red-900']">
            {{ con.file && con.isSigned ? 'complet' : 'incomplet' }}
          </p>
        </div>
        
        <div v-if="con.file && con.isSigned" :class="[filenameClass, 'underline border']">
          <a :href="$getFileLink(con.file) || ''">{{ con.file || '' }}</a>
        </div>

        <div v-else-if="sendRequested" :class="filenameClass">
          <p>{{ sendRequested ? 'Demander en cours' : '' }}</p>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex-alt'
export default {
  name: "DossierInfo",
  data() {
    return {
      docContainer: `
        w-full xl:w-10/12
        border shadow mt-5 py-5 px-5 
        text-tgreen 
        flex flex-col items-center justify-center`,

      docClass: `
        w-full
        'mt-5 sm:mt-5'
        flex flex-col items-start justify-center 
        sm:flex-row sm:justify-around sm:items-center`,

      titleClass: `
        w-full 
        sm:w-5/12 
        lg:w-5/12 
        mb-2 sm:mb-0
        tex-left 
        sm:text-right`,

      filenameClass: `
        break-all 
        w-full sm:w-5/12 lg:w-5/12
        mb-2 sm:mb-0
        text-center`,

      sendSMSBtnClass: `
        py-2 px-5 rounded-3xl hover:shadow-xl mt-5
        text-sm text-white 
        flex justify-start items-center`,
    }
  },
  computed: {
    ...mapState({
      fullDossier: (state) => state.dossier.fullDossier
    }),
    consentement() {
      return (this.fullDossier || {}).consentement
    },
    sendRequested() {
      return (this.fullDossier || {}).sendRequested
    },
  },
}
</script>
