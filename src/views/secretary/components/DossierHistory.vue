<template>
  <div :class="[docContainer]">

    <h2 class="mb-5"><b>Historique actions</b></h2>

    <div class="w-full max-h-t_scroll_max_box overflow-scroll cursor-pointer">

      <!-- actions made by secretaire -->
      <div v-if="dossierHistorySecretaire && dossierHistorySecretaire.length" :class="[docClass, 'hidden sm:flex font-bold']">
        <div :class="titleClass">Secretaire</div>
        <div :class="titleClass">Action</div>
        <div :class="titleClass">Date</div>
      </div>
      <div v-for="(history, idx) in dossierHistorySecretaire" :key="idx">
        <div :class="[docClass, 'py-1 sm:py-1',  !(idx%2) ? 'bg-tgraybg' : '']">
          <div :class="[titleClass]">
            <b class="block sm:hidden mr-1">Secretaire/Patient:</b>
            {{ history.actor }}
          </div>
          <div :class="[titleClass]">
            <b class="block sm:hidden mr-1">Action:</b>
            {{ history.action }}
          </div>
          <div :class="[titleClass]">
            <b class="block sm:hidden mr-1">Date:</b>
            {{ rdv(history.createdAt) }}
          </div>
        </div>
      </div>

      <!-- actions made by patient -->
      <div v-if="dossierHistoryPatient && dossierHistoryPatient.length" :class="[docClass, 'hidden sm:flex font-bold mt-5']">
        <div :class="titleClass">Patient</div>
        <div :class="titleClass">Action</div>
        <div :class="titleClass">Date</div>
      </div>
      <div v-for="(history, idx) in dossierHistoryPatient" :key="idx">
        <div :class="[docClass, 'py-1 sm:py-1',  !(idx%2) ? 'bg-tgraybg' : '']">
          <div :class="[titleClass]">
            <b class="block sm:hidden mr-1">Secretaire/Patient:</b>
            {{ history.actor }}
          </div>
          <div :class="[titleClass]">
            <b class="block sm:hidden mr-1">Action:</b>
            {{ history.action }}
          </div>
          <div :class="[titleClass]">
            <b class="block sm:hidden mr-1">Date:</b>
            {{ rdv(history.createdAt) }}
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "DossierHistory",
  data() {
    return {
      docContainer: `
        w-full xl:w-10/12
        border shadow mt-5 py-5 px-5 
        text-tgreen 
        flex flex-col items-center justify-center`,

      docClass: ` 
        w-full
        px-2
        flex flex-col items-center justify-center 
        sm:flex-row sm:justify-center sm:items-center`,

      titleClass: `
        w-full 
        sm:w-4/12 
        lg:w-4/12 
        xl:w-3/12 
        mb-2 sm:mb-0
        text-left
        sm:text-center
        flex justify-start sm:justify-center`,

      dossierHistory: []
    }
  },
  created() {
    let self = this;
    let dossierId = this.$route.params.dossierId;
    self.$myAuthAxios({
        url: `/dossierhistory/${dossierId}`,
        method: "get"
      })
      .then(res => {
        let dossierHistory = ((res.data || {}).data || {}).history;
        let status = (res.data || {}).status;
        if (status === "success" && dossierHistory) {
          self.dossierHistory = dossierHistory;
        } else {
          self.dossierHistory = [];
        }
      })
      .catch((error) => {
        self.getDataError = error;
      });
  },
  computed: {
    dossierHistoryPatient() {
      return this.dossierHistory.filter(o => o.actorType === 'patient');
    },
    dossierHistorySecretaire() {
      return this.dossierHistory.filter(o => o.actorType === 'secretaire');
    }
  },
  methods: {
    rdv(date) {
      if (date) {
        var days = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
        let dateObj = new Date(date);
        return `
        ${dateObj.getHours()}h${dateObj.getMinutes()} ${days[dateObj.getDay()]} 
        le  ${dateObj.getDate()}/${(dateObj.getMonth() +1)}/${dateObj.getFullYear()}`
      }
      return '';
    }
  }
}
</script>
