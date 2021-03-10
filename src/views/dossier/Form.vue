<template>
  <div class="p-5 min-h-tminbody">
    Display form
    <br>
    
  </div>
</template>

<script>
import { mapState } from 'vuex-alt';
export default {
  name: 'Form',
  data() {
    return {
      myDossier: []
    }
  },
  created() {
    this.myDossier = this.dossier;
  },
  computed: {
    ...mapState({
      dossier: (state) => state.dossier.dossier
    }),
  }
}
</script>
