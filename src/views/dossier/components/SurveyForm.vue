<template>
  <div v-if="jsform && jsform.length" :class="formContainerClass">

    <!-- title -->
    <div class="flex w-full mt-1 mb-3 sm:px-3 items-center">
      <div class="w-2/12">
        <div class="h-t_h40 w-t_w40 sm:h-t_h50 sm:w-t_w50 rounded-full bg-twarning text-white flex items-center justify-center text-2xl sm:text-3xl font-bold">
          1
        </div>
      </div>
      <h2 class="w-8/12 ml-3 sm:ml-0 text-left sm:text-center"><b>Je remplis le questionnaire médical</b></h2>
    </div>

    <div v-for="(question, idx) in jsform" :key="idx" class="w-full">

      <!-- start question -->
      <div :class="qContainerClass">
        <!-- question -->
        <div :class="qClass"><span v-if="question.ansrequired" class="text-red-500 mr-1">*</span>{{ question.q }}</div>
        <!-- question radio box -->
        <div v-if="question.anstype === 'checkbox'" :class="chbxClass">
          <input type="radio" 
            :id="idx + 'quest oui'" 
            :name="idx + 'quest oui'" 
            v-model="question.ansVal" value="oui" class="mr-1">
          <label :for="idx + 'quest oui'" class="mr-5">Oui</label><br>
          <input type="radio" 
            :id="idx + 'quest non'" 
            :name="idx + 'quest non'" 
            v-model="question.ansVal" value="non" class="mr-1">
          <label :for="idx + 'quest non'">Non</label><br>
        </div>
        <!-- question area -->
        <div v-else-if="question.anstype === 'textarea'" :class="chbxClass">
          <textarea 
            :id="idx + 'quest textarea'" 
            :name="idx + 'quest textarea'" 
            class="border p-2 w-full" rows="3" placeholder="Entrez votre reponse ici" 
            v-model="question.ansVal">
          </textarea>
        </div>
        <div v-else :class="chbxClass"></div>
      </div>
      <!-- end question -->

      <!-- start sub question -->
      <div v-if="question.subQuestion && question.subQuestion.length">
        <div v-for="(subQuestion, subIdx) in question.subQuestion" :key="'subQuestion' + subIdx">
          
          <div :class="qContainerClass">
            <!-- subquestion -->
            <div :class="subQClass">
              <span v-if="subQuestion.ansrequired" class="text-red-500 mr-1">*</span>
              <span class="mr-1">{{subIdx + 1}}.</span>
              <p>{{ subQuestion.q }}</p>
            </div>
            <!-- subquestion radio box -->
            <div v-if="subQuestion.anstype === 'checkbox'" :class="subQChbxClass">
              <input type="radio" 
                :id="idx + ' subQuest oui' + subIdx" 
                :name="idx + 'subQuest oui' + subIdx" 
                v-model="subQuestion.ansVal" value="oui" class="mr-1">
              <label :for="idx + 'subQuest oui' + subIdx" class="mr-5">Oui</label><br>
              <input type="radio" 
                :id="idx + 'subQuest non' + subIdx" 
                :name="idx + 'subQuest non' + subIdx" 
                v-model="subQuestion.ansVal" value="non" class="mr-1">
              <label :for="idx + 'subQuest non' + subIdx">Non</label><br>
            </div>
            <!-- subquestion area -->
            <div v-else-if="subQuestion.anstype === 'textarea'" :class="subQChbxClass">
              <textarea 
                :id="idx + 'subQuest textarea' + subIdx" 
                :name="idx + 'subQuest textarea' + subIdx" 
                class="border w-full p-2" rows="3" placeholder="Entrez votre reponse ici" 
                v-model="subQuestion.ansVal">
              </textarea>
            </div>
            <div v-else :class="subQChbxClass"></div>
          </div>

        </div>
      </div>
      <!-- end sub question -->

    </div>

    <!-- error & message -->
    <div class="flex justify-center w-full">
      <p v-if="submitErr" class="py-1 text-tdanger"><i class="feather icon-alert-triangle mr-1"/>{{submitErr}}</p>
    </div>
    <div class="flex justify-center w-full">
      <p v-if="message" class="py-1 text-success"><i class="feather icon-check mr-1"/>{{message}}</p>
    </div>
    
    <!-- button -->
    <button :class="sendResponseClass" @click="sendAnswer">
      <p v-if="loading" class="text-xl animate-spin feather icon-loader mr-2"></p>
      <p>Envoyer votre réponse</p>
    </button>
      
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex-alt'
export default {
  name: "DocForPatient",
  data() {
    return {
      formContainerClass: `
      w-full xl:w-10/12
      border shadow
      mt-5 py-5 sm:py-5 
      px-3 sm:px-1 lg:px-5
      text-tgreen 
      flex flex-col items-center justify-center`,

      qContainerClass: `
      w-full mt-2 
      flex flex-col items-start justify-center 
      sm:flex-row sm:justify-center sm:items-center`,

      subQClass: `
      w-full sm:w-5/12 lg:w-6/12 
      mb-2 sm:mb-0 pl-3
      tex-left text-sm font-medium 
      break-words
      flex justify-start items-start`,
      
      qClass: `
      w-full sm:w-5/12 lg:w-6/12 
      mb-2 sm:mb-0 
      tex-left text-sm font-semibold`,

      chbxClass: `
      w-full sm:w-5/12 lg:w-4/12 
      pl-0 sm:pl-5 
      flex justify-center sm:justify-center items-center`,

      subQChbxClass: `
      w-full sm:w-5/12 lg:w-4/12 
      pl-3 sm:pl-5
      flex justify-center sm:justify-center items-center`,

      sendResponseClass: `
      mx-auto mt-3 sm:mt-5 hover:shadow-xl rounded-3xl 
      px-5 py-2 
      bg-t_dark_green font-bold text-white 
      flex justify-around items-center`,

      loading: false,
      submitErr: '',
      message: ''
    }
  },
  computed: {
    ...mapState({
      fullDossier: (state) => state.dossier.fullDossier
    }),
    jsform() {
      let fullDossierQuestionnaireForm = ((this.fullDossier || {}).questionnaireForm || {}); 
      let examenQuestionnaireForm = (((this.fullDossier || {}).examenId || {}).questionnaireForm || {});
      if (fullDossierQuestionnaireForm && Object.keys(fullDossierQuestionnaireForm) && Object.keys(fullDossierQuestionnaireForm).length) {
        return fullDossierQuestionnaireForm;
      } 
      return examenQuestionnaireForm;
    }
  },
  methods: {
    ...mapActions({
      setFullDossier: (actions) => actions.dossier.setFullDossier,
      setDossierId: (actions) => actions.dossier.setDossierId,
      setDossier: (actions) => actions.dossier.setDossier
    }),
    sendAnswer() {
      this.loading = true;
      this.submitErr = "";
      let self = this;
      this.$myAuthAxios({
          url: `/dossier/patient-answer`,
          method: 'PUT',
          data: {
            questionnaireForm: self.jsform
          }
      })
      .then(res => {
        if (res.data) {
          self.message = self.$message.send_ok();
          let dossier = ((res.data || {} ).data || {} ).dossier || {};
          self.setDossierId(dossier._id)
          self.setDossier(dossier)
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
        self.loading = false;
      })
    }
  }
}
</script>

