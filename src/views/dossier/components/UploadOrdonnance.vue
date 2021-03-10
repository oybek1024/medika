<template>
  <div :class="docContainer">

    <!-- title -->
    <div class="flex w-full mt-0 mb-0 sm:px-3 items-center">
      <div class="w-2/12">
         <div class="h-t_h40 w-t_w40 sm:h-t_h50 sm:w-t_w50 rounded-full bg-twarning text-white flex items-center justify-center text-2xl sm:text-3xl font-bold">
          2
        </div>
      </div>
      <h2 class="w-8/12 ml-3 sm:ml-0 text-left sm:text-center"><b>Je joins mon ordonnance</b></h2>
    </div>

    <!-- List of required document -->
    <div v-for="(doc, idx) in documentToUpload" :key="idx" :class="[docClass, docLayoutClass]">
      <!-- text -->
      <div class="w-full sm:w-4/12 lg:w-4/12 flex justify-start py-2">
        <p class="mr-1">{{idx + 1}}.</p> 
        <p>{{ doc.titre }}</p>
      </div>
      <!-- button -->
      <div class="w-full sm:w-4/12 lg:w-4/12 text-left sm:text-center">
        <button :class="btnClass" @click.prevent="chooseFile(doc.slugTitre)">
          <p v-if="uploadLoading == doc.slugTitre" class="text-xl animate-spin feather icon-loader mr-2"></p>
          <i class="feather icon-upload mr-1"/>Télécharger à nouveau
        </button>
        <!-- Error and message -->
        <p v-if="submitErr" class="text-center py-1 text-tdanger">
          <i class="feather icon-alert-triangle mr-1"/>{{submitErr}}
        </p>
        <p v-if="message" class="text-center py-1 text-success">
          <i class="feather icon-check mr-1"/>{{message}}
        </p>
      </div>
      <!-- uploaded filename -->
      <div class="w-full sm:w-4/12 lg:w-4/12 py-2 px-3">
        <a :href="$getFileLink(doc.file) || ''">{{ getFilename(doc.file) || '' }}</a>
      </div>
    </div>


    <!-- file -->
    <input type="file"
      ref="fileInput"
      id="input" 
      name="input"
      accept="image/*, .pdf, .doc, .docx"
      @change="onChange"
      style="height:1px;width:1px;overflow:hidden;margin-left:-99999px;position:absolute;">

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
        sm:flex-row sm:justify-start sm:items-center`,

      btnClass: 'py-2 px-5 w-56 rounded-3xl hover:shadow-xl bg-t_dark_green text-sm text-white',

      signloading: false,
      uploadLoading: false,

      submitErr: "",
      message: "",
      file: '',

      currentSlugTitre: ''
    }
  },
  computed: {
    ...mapState({
      fullDossier: (state) => state.dossier.fullDossier
    }),
    documentToUpload() {
      return (this.fullDossier || {}).documentUploaded || {}
    },
  },
  methods: {
    ...mapActions({
      setFullDossier: (actions) => actions.dossier.setFullDossier,
      setDossierId: (actions) => actions.dossier.setDossierId,
      setDossier: (actions) => actions.dossier.setDossier
    }),
    chooseFile (slugTitre) {
      this.currentSlugTitre = slugTitre;
      this.$refs.fileInput.click()
    },
    onChange() {
      let self = this;
      this.uploadLoading = this.currentSlugTitre;
      this.file = this.$refs.fileInput.files[0];
      if (!this.file) return;
      let formData = new FormData()
      formData.append('doc', this.file)
      this.$myAuthAxios({
          url: `/dossier/me/upload?slugTitre=${this.currentSlugTitre}`,
          method: 'PUT',
          data: formData
      })
      .then(res => {
        if (res.data) {
          self.message = self.$message.send_ok();
          let dossier = ((res.data || {} ).data || {} ).dossier || {}
          self.setDossierId(dossier._id);
          self.setDossier(dossier);
          const { examenId, examenCentreId, ...oldObj } = dossier;
          let newobj = Object.assign({}, {
            examenId: self.fullDossier.examenId, 
            examenCentreId: self.fullDossier.examenCentreId, 
            ...oldObj 
          });
          self.setFullDossier(newobj);
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
      }).then(() => {
        self.currentSlugTitre = '';
        self.uploadLoading = '';
      })
    },
    getFilename (path) {
      if (path) {
        let arr = path.split('/');
        if (arr && arr.length) {
          return arr[arr.length -1];
        }
      }
      return ''
    }
  }
}
</script>

