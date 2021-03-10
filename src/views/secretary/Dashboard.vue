<template>
  <div class= "w-full mt-5 mb-10 min-h-tmminbody sm:min-h-tminbody text-tgreen bg-white flex flex-col items-center justify-center">
    <dossier-filter />
    <dossier-table />
  </div>
</template>

<script>
export default {
  name: 'SecretaryDashboard',
  components: {
    DossierTable: () => import('./components/DossierTable.vue'),
    DossierFilter: () => import('./components/DossierFilter.vue')
  }
}
</script>
