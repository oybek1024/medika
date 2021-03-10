<template>
  <div v-if="ficheInfoFile || (fullDossier.ordonnance && fullDossier.ordonnance.length)" :class="docContainer">

    <!-- title -->
    <div class="flex w-full mt-1 mb-3 my-1 sm:px-3 items-center">
      <div class="w-2/12">
         <div class="h-t_h40 w-t_w40 sm:h-t_h50 sm:w-t_w50 rounded-full bg-twarning text-white flex items-center justify-center text-2xl sm:text-3xl font-bold">
          3
        </div>
      </div>
      <h2 class="w-8/12 ml-3 sm:ml-0 text-left sm:text-center"><b>Je consulte les documents envoyés par Medika</b></h2>
    </div>

    <!-- fichier info -->
    <div v-if="ficheInfoFile" :class="[docClass, docLayoutClass]">
      <!-- text -->
      <div class="w-full sm:w-8/12 lg:w-8/12 flex justify-start py-2">
        <p class="mr-1">1.</p> 
        <p>Fiche d’Information patient</p>
      </div>
      <!-- button -->
      <div class="w-full sm:w-4/12 lg:w-4/12">
        <button :class="btnClass" @click.prevent="openFile(ficheInfoFile)">
          <i class="feather icon-download mr-1"/>Consulter ou Imprimer
        </button>
      </div>
    </div>

    <!-- ordonnance list -->
    <div v-for="(ordonance, idx) in fullDossier.ordonnance" :key="idx" :class="['mt-1', docClass, docLayoutClass]">
      <!-- text -->
      <div class="w-full sm:w-8/12 lg:w-8/12 flex justify-start py-2">
        <p class="mr-1">{{ (2 + idx) + "." }}</p>
        <p v-html="ordonance.titre"></p>
      </div>
      <!-- button -->
      <div class="w-full sm:w-4/12 lg:w-4/12">
        <button :class="btnClass" @click.prevent="openFile(ordonance.file)">
          <i class="feather icon-download mr-1"/>Consulter ou Imprimer
        </button>
      </div>
    </div>
      
  </div>
</template>

<script>
import { mapState } from 'vuex-alt'
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
        sm:flex-row sm:justify-start sm:items-center`,
      
      btnClass: 'py-2 px-5 w-56 rounded-3xl hover:shadow-xl bg-t_dark_green text-sm text-white',
    }
  },
  computed: {
    ...mapState({
      fullDossier: (state) => state.dossier.fullDossier
    }),
    ficheInfoFile() {
      return ((this.fullDossier || {}).examenId || {}).ficheInfoFile
    }
  },
  methods: {
    getFirstUpcase(titre) {
      return titre.charAt(0).toUpperCase() + titre.slice(1);
    },
    openFile(url) {
      window.open(this.$getFileLink(url));
    }
  }
}
</script>

