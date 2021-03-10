<template>
  <div class="w-full xl:w-10/12 text-tgreen grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2 text-sm">
<!-- getRdvDossie: {{getRdvDossier("sdfsdfds")}} -->
  
    <div class="border shadow w-full flex flex-col p-5">
      <div class="font-bold w-full flex justify-start items-center mb-3">
        <img width="40" :src="medicalIcon" class="mr-5"/>
        <span>Votre Compte</span>
      </div>
      <div class="py-1">
        <b class="mr-3">Nom:</b><span>{{fullDossier.lastName}}</span>
      </div>
      <div class="py-1">
        <b class="mr-3">Prénom</b>
        <span>{{fullDossier.firstName}}</span>
      </div>
      <div class="py-1">
        <b class="mr-3">Date de naissance:</b>
        <span>{{fullDossier.birthdate}}</span>
      </div>
      <div class="py-1">
        <b class="mr-3">Email:</b>
        <span>{{fullDossier.email}}</span>
      </div>
      <div class="py-1">
        <b class="mr-3">Téléphone:</b>
        <span>{{fullDossier.phone}}</span>
      </div>
      <div class="py-1">
        <b class="mr-3">Numéro de Sécurité Sociale:</b>
        <span>{{ (fullDossier.couvertureSante || {}).noSecuriteSociale }}</span>
      </div>
    </div>

    <div class="border shadow w-full flex flex-col p-5">
      <div class="font-bold w-full flex justify-center items-center mb-3">
        Votre rendez-vous
      </div>
      
      <div class="font-bold w-full flex justify-start items-center mb-3">
        <img width="36" :src="calendarIcon" class="mr-3"/>
        <b class="mr-3">Rendez-vous:</b><span>{{rdv()}}</span>
      </div>

      <div class="w-full flex justify-start items-center mb-2">
        <img width="36" :src="hospitalIcon" class="mr-3"/>
        <b class="mr-5">Centre Medika:</b><span>{{ mediaCenter.name }}</span>
      </div>

      <div class="w-full flex flex-col justify-start items-start mb-3 pl-5 pr-5 ml-5">
        <p><b class="mr-3">Téléphone:</b>{{ mediaCenter.phone }}</p>
        <p><b class="mr-3">Email:</b>{{ mediaCenter.email }}</p>
        <p><b class="mr-3">Accueil:</b>{{ mediaCenter.accueil }}</p>
      </div>

      <a :href="'https://www.google.com/maps/place/' + mediaCenter.address" target="_blank">
        <div class="w-full flex justify-start items-center mb-3 ">
          <img width="36" :src="mapIcon" class="mr-3"/>
          <b class="mr-3">Adresse:</b><span class="underline">{{ mediaCenter.address }}</span>
        </div>
      </a>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex-alt'
export default {
  name: "GeneralInfo",
  data() {
    return {
      medicalIcon: require('@/assets/images/medical.svg'),
      hospitalIcon: require('@/assets/images/hospital.svg'),
      calendarIcon: require('@/assets/images/calendar.png'),
      mapIcon: require('@/assets/images/map.png'),
    }
  },
  computed: {
    ...mapState({
      fullDossier: (state) => state.dossier.fullDossier
    }),
    mediaCenter() {
      let examenCentreId = (this.fullDossier || {}).examenCentreId || {};
      let address = (examenCentreId.address || {});
      return {
        name: examenCentreId.name,
        phone: examenCentreId.phone,
        email: examenCentreId.email,
        accueil: examenCentreId.accueil,
        address: `${address.street}, ${address.city}, ${address.zipcode}, ${address.country}`
      }
    },
  },
  methods: {
    rdv() {
      return this.fullDossier.dateRDV ? this.$getRdvDossier(this.fullDossier.dateRDV) : "";
    }
  }
}
</script>

