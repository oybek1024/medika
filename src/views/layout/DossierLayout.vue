<template>
  <div class="min-h-screen">
    
    <main-header />

    <div class="h-t_m_menu sm:h-t_menu grid grid-cols-12 gap-x-2 items-center justify-center w-full text-tgreen">
      <p :class="[dossierId ? 'col-start-0 col-end-3': 'col-start-5 col-end-9', 'sm:col-start-6 sm:col-end-8 font-bold text-center text-xl sm:text-3xl']">{{ title }}</p>
      <p v-if="dossierId || (dossier && dossier._id)"
        @click="logout"
        class="col-start-6 col-end-12 sm:col-start-9 sm:col-end-12 text-right hover:font-bold cursor-pointer">
        Déconnection<i class="feather icon-log-out ml-1"></i>
      </p>
    </div>

    <div class="min-h-t_m_min_body sm:min-h-t_min_body flex w-full justify-center items-center">
      <transition name="fade" class="ease-in duration-500">
        <router-view />
      </transition>
    </div>

    <main-footer />

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex-alt';
export default {
  name: 'DossierLayout',
  components: {
    MainFooter: () => import('Views/layout/MainFooter.vue'),
    MainHeader: () => import('Views/layout/MainHeader.vue')
  },
  data() {
    return {
      title: process.env.VUE_APP_TITLE
    }
  },
  computed: {
    ...mapState({
      dossierId: (state) => state.dossier.dossierId,
      dossier: (state) => state.dossier.dossier
    }),
  },
  methods: {
    ...mapActions({
      setDossierId: (actions) => actions.dossier.setDossierId,
      setDossier: (actions) => actions.dossier.setDossier,
      initDossier: (actions) => actions.dossier.init
    }),
    logout() {
      this.$myAuthAxios({
        url: '/dossier/logout',
        method: 'POST'
      })
      .then((response) => {
          
      })
      .catch(err => {
          
      }).then(() => {
        this.initDossier();
        localStorage.setItem('jwt', '');
        self.$router.push({ name: 'dossier-login' });
      })
     
    }
  }
}

</script>

