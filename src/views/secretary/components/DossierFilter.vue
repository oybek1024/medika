<template>
    <div class= "text-tgreen bg-white min-h-tmminbody sm:min-h-tminbody w-full justify-center flex flex-col items-center mb-1 mt-5">

        <!-- start filter -->
        <div class="w-full lg:w-10/12 px-10 sm:px-5 text-sm sm:text-base">
            <h1 class="font-semibold text-base sm:text-xl mb-2">Liste des dossiers</h1>

            <!-- filter by dossier status -->
            <div class="flex flex-col justity-center items-start sm:flex-row sm:justity-start sm:items-center space-x-5 mt-3">
                <p>Filtre par l'état du dossier:</p>

                <div class="flex justify-start items-center space-x-1">
                    <input type="checkbox" id="dossier-completed" name="dossier-completed" v-model="complet">
                    <label for="dossier-completed">complet</label>
                </div>
                <div class="flex justify-start items-center space-x-1">
                    <input type="checkbox" id="dossier-incompleted" name="dossier-incompleted" v-model="inComplet">
                    <label for="dossier-incompleted">incomplet</label>
                </div>
                <div class="flex justify-start items-center space-x-1">
                    <input type="checkbox" id="being-requested" name="being-requested" v-model="sendRequested">
                    <label for="being-requested">Demande en cours</label>
                </div>
            </div>
            
            <!-- filter by date -->
            <div class="w-full
            flex flex-col justity-center items-start sm:flex-row sm:justity-start sm:items-center space-x-5 mt-3">
                <p class="py-1">et par la date de rendez-vous:</p>

                <div class="flex justify-start items-center space-x-1">
                    <span class="w-8">de </span>
                    <input @input="debounceMinDate" type="text" id="minDate" :class="inputClass" @keyup.enter="updateFilter()" placeholder="jj/mm/aaaa" name="minDate" v-model="minDate">
                </div>

                <div class="flex justify-start items-center space-x-1 mt-2 sm:mt-0">
                    <span class="w-8">à</span>
                    <input @input="debounceMaxDate" type="text" id="maxDate" :class="inputClass" @keyup.enter="updateFilter()" placeholder="jj/mm/aaaa" name="mmaxDate" v-model="maxDate">
                </div>
            </div>

            <!-- search box -->
            <div class="w-full
            flex flex-col justity-center items-start sm:flex-row sm:justity-start sm:items-center space-x-5 mt-3">
                <p class="py-1">Chercher par Nom/Prénom/No Dossier:</p>
                <div class="relative w-56">
                    <input @input="debounceSearch" :class="['w-full', inputClass]" id="search-by-fullname" v-model="searchText" placeholder="text pour recherche"/>
                    <i :class="[' feather icon-search flex items-center text-lg absolute right-2.5 inset-y-0']"></i>
                </div>
            </div>
            
        </div>
        <!-- end filter -->
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex-alt';
const debounce = (fn, wait) => {
    let t
    return function () {
      clearTimeout(t)
      t = setTimeout(() => fn.apply(this, arguments), wait)
    }
}

export default {
    name: 'DossierFilter',
    data() {
        return {
            inputClass: `
                col-span-8 
                sm:col-span-8 
                md:col-span-6 
                border border-gray-300 hover:border-blue-200
                px-3 py-2 sm:py-2 rounded-md 
                hover:shadow-md 
                text-sm xl:text-base`,
            complet: '',
            inComplet: '',
            sendRequested: '',
            minDate: '',
            maxDate: '',
            searchText: ''
        }
    },
    watch: {
        complet() {
            this.updateFilter();
        },
        inComplet() {
            this.updateFilter();
        },
        sendRequested() {
            this.updateFilter();
        }
    },
    mounted() {
        let params = this.filterParams || {};
        this.complet = params.complet || '',
        this.inComplet = params.inComplet || '',
        this.sendRequested = params.sendRequested || '',
        this.minDate = params.minDate || '',
        this.maxDate = params.maxDate || ''
        this.searchText = params.searchText || ''
    },
    computed: {
        ...mapState({
            filterParams: (state) => state.secretary.filterParams
        })
    },
    methods: {
        ...mapActions({
            setFilterParams: (actions) => actions.secretary.setFilterParams
        }),
        debounceSearch: debounce(function() {
            this.updateFilter();
        }, 800),
        debounceMaxDate: debounce(function() {
            this.updateFilter();
        }, 1000),
         debounceMinDate: debounce(function() {
            this.updateFilter();
        }, 1000),
        updateFilter() {
            this.minDate = this.minDate.split(':')[0];
            this.maxDate = this.maxDate.split(':')[0];
            this.setFilterParams({
                complet: this.complet,
                inComplet: this.inComplet,
                sendRequested: this.sendRequested,
                minDate: this.minDate,
                maxDate: this.maxDate,
                searchText: this.searchText
            })
        }
    }
}
</script>