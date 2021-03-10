<template>
    <div class= "text-tgreen bg-white min-h-tmminbody sm:min-h-tminbody w-full justify-center flex flex-col items-center mb-5"> 

        <!-- data loading -->
        <div class="flex flex-col items-center justify-center mt-5 mb-5">
            <i v-show="dataLoading" class="text-3xl animate-spin feather icon-loader"/>
            <p v-show="dataLoading">charger les données...</p>
        </div>

        <!-- total number of dossier / add new one-->
        <div class="w-full grid grid-cols-12 gap-x-2 items-center justify-center mb-0 sm:mb-2 mt-5 px-5">
            <p :class="[totalNumberClass]">numbre total: {{ totalDocs }}</p>
            <p :class="[smBtnClass, addDossierClass]" @click="toNew()">
                <i class="feather icon-file-plus mr-1"/>nouveau dossier
            </p>
        </div>

        <!-- data table -->
        <div class="w-full sm:w-10/12 lg:w-full xl:w-10/12 px-5 text-xs">
            <!-- data table head -->
            <div :class="headClass">
                <div v-for="(head, idx) in heads" :key="idx" :class="[head.class, 'pl-3']">
                {{ head.text }}
                </div>
            </div>

            <!-- data table content -->
            <div v-for="(row, rIdx) in listDossiers" :key="rIdx" :class="rowClass">

                <!-- 1 row -->
                <div v-for="(head, idx) in heads" :key="rIdx + '-' + idx" :class="[head.class, cellClass]">

                    <b class="block lg:hidden">{{ head.text }}:</b>

                    <p v-if="head.key == 'noDossier'" @click="toDetail(row)" class="py-5 cursor-pointer font-semibold underline">
                        {{ row[head.key] }}
                    </p>
                    <p v-else-if="head.key == 'name'">
                        {{ row['firstName'] + " " + row['lastName']}}
                    </p>
                    <p v-else-if="head.key == 'sendRequested'">
                        {{ row[head.key] ? "envoyé" : 'none' }}
                    </p>
                    <p v-else-if="head.key == 'isCompleted'" 
                        :class="[row[head.key] ? 'bg-green-200 text-blue-900' : 'bg-red-200 text-red-900', 'py-1 px-1']">
                        {{ row[head.key] ? 'complet' : 'incomplet' }}
                    </p>

                    <p v-else-if="head.key == 'action'">
                        <i @click="toEdit(row)" class="feather icon-edit text-xl mr-1 hover:border cursor-pointer"></i>
                        <span v-if="row.phone" :class="[smBtnClass, 'ml-3']" @click="sendSMS(row._id, row.noDossier)">
                            <i class="feather icon-send mr-1"></i>Relancer SMS
                        </span>
                    </p>
                    <p v-else>
                        {{ head.subKey ? (row[head.key] ? row[head.key][head.subKey] : "") : (head.key == 'dateRDV' ? $getRdvDossier(row[head.key]) : row[head.key]) }}
                    </p>

                    <i v-if="head.key == 'action'&& sending == row._id" class="text-base animate-spin feather icon-loader"></i> 

                </div>
            </div>
        </div>
        <!-- end table -->

        <!-- paging -->
        <simple-pagination 
            class="mt-3" 
            :currentpage="page" 
            :pages="totalPages" 
            @changePage="pageChange">
        </simple-pagination>

    </div>

</template>

<script>
import { mapState, mapActions } from 'vuex-alt';
  
export default {
    name: 'DossierTable',
    components: {
        SimplePagination: () => import('./SimplePagination.vue'),
    },
    data() {
        return {
            totalNumberClass: `
            col-start-1 col-end-6 
            sm:col-start-2 sm:col-end-5 
            lg:col-start-6 lg:col-end-8 
            text-start lg:text-center
            font-bold text-sm lg:text-base`,

            addDossierClass: `
            col-start-7 col-end-12 
            sm:col-start-8 sm:col-end-12 
            lg:col-start-10 lg:col-end-12 
            text-center text-xs sm:text-sm lg:text-sm`,
            
            smBtnClass:`
            py-1 px-2 border border-t_dark_green rounded-lg 
            cursor-pointer
            bg-tgraybg hover:bg-t_dark_green hover:text-white`,

            rowClass: `
            w-full border shadow
            p-5 lg:p-1 mt-5 lg:mt-0
            flex flex-col justify-start items-start lg:flex-row lg:justify-between lg:items-center`,

            headClass: `
            w-full border 
            px-5 py-3 lg:px-1
            hidden font-semibold bg-tgraybg 
            lg:flex lg:justify-between lg:items-center`,

            cellClass: `
            w-full 
            break-all space-x-2 sm:pl-1 py-1
            flex items-start justify-start sm:items-center`,

            heads: [
                { class: "lg:w-1/12", key: "noDossier", text: "N° Dossier" },
                { class: "lg:w-1/12", key: "isCompleted", text: "Etat du dossier" },
                { class: "lg:w-1/12", key: "sendRequested", text: "SMS Envoyé" },
                { class: "lg:w-1/12", key: "name", text: "Nom et Prénom" },
                { class: "lg:w-1/12", key: "birthdate", text: "Date de naissance" },
                { class: "lg:w-1/12", key: "phone", text: "Téléphone" },
                { class: "lg:w-2/12", key: "examenId", subKey: "name",  text: "Examen" },
                { class: "lg:w-1/12", key: "dateRDV", text: "Rendez-vous" },
                { class: "lg:w-2/12", key: "action", text: "Traitement de dossier" }
            ],

            offset: 0,
            limit: 10,

            page: parseInt(this.$route.query.page) || 1,
            totalPages: 1,
            totalDocs: 0,
            hasNextPage: false,
            hasPrevPage: false,
            listDossiers: [],

            sending: true,
            dataLoading: false
        }
    },
    created() {
        this.getData();
    },
    computed: {
        ...mapState({
            filterParams: (state) => state.secretary.filterParams
        }),
        state() {
            if (this.filterParams.complet && !this.filterParams.inComplet) {
                return 'complet';
            } else if (!this.filterParams.complet && this.filterParams.inComplet) {
                return 'inComplet';
            } else {
                return 'all';
            }
        },
    },
    watch: {
        "filterParams": function() {
            this.getData();
        }
    },
    methods: {
         ...mapActions({
            setFullDossier: (actions) => actions.dossier.setFullDossier,
            setPagingParam: (actions) => actions.secretary.setPagingParam
        }),
        async sendSMS(dossierId, noDossier) {
            let self = this;
            this.sending = dossierId;
            await self.$myAuthAxios({
                    url: `/sms/send`,
                    method: "post",
                    data: {
                        dossierId: dossierId,
                        link: `${window.location.origin}/${process.env.VUE_APP_DOSSIER_ROUTE}/login/${noDossier}`
                    }
                })
                .then(res => {
                    let sms = ((res.data || {}).data || {}).sms;
                    let status = (res.data || {}).status;
                    if ((status === "success") && sms) {
                        this.sending = false;
                    } else {
                        this.sending = false;
                    }
                })
                .catch((error) => {
                    this.sending = false;
                });
        },
        toDetail(dossier) {
            this.setFullDossier(dossier);
            this.$router.push({ name: 'secretary-dossier-detail', params: { dossierId: dossier._id } });
        },
        toEdit(dossier) {
            this.setFullDossier(dossier);
            this.$router.push({ name: 'secretary-dossier-edit', params: { dossierId: dossier._id } });
        },
        toNew() {
            this.$router.push({ name: 'secretary-dossier-new' });
        },
        async pageChange (page) {
            this.$router.replace({ name: 'secretary-dash', query: { page: page } });
            this.setPagingParam(page);
            this.page = page;
            let scrollPosition = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
            await this.getData();
            window.scrollTo(0, scrollPosition);
        },
         async getData() {
            let self = this;
            this.dataLoading = true;

            let query = `offset=${(self.page - 1) * self.limit}&limit=${self.limit}&options=full`;
            if (self.state) { 
                query += `&state=${self.state}`
            }
            if (self.filterParams.sendRequested) { 
                query += `&sendRequested=${self.filterParams.sendRequested}`
            }
            if (self.filterParams.minDate) { 
                query += `&minDate=${self.filterParams.minDate.split('/').reverse().join('/')}:00:00`
            }
            if (self.filterParams.maxDate) {
                query += `&maxDate=${self.filterParams.maxDate.split('/').reverse().join('/')}:23:59`
            }
            if(self.filterParams.searchText) {
                query += `&searchText=${self.filterParams.searchText}`
            }

            await self.$myAuthAxios({
                url: `/dossier?${query}`,
                method: "get"
                })
                .then(res => {
                    let dossierObj = ((res.data || {}).data || {}).dossiers;
                    let status = (res.data || {}).status;
                    if ((status === "success") && dossierObj) {
                        self.listDossiers = dossierObj.docs;
                        self.totalDocs = dossierObj.totalDocs;
                        self.totalPages = dossierObj.totalPages;
                        self.hasNextPage = dossierObj.hasNextPage;
                        self.hasPrevPage = dossierObj.hasPrevPage;
                        self.page = self.page > dossierObj.totalPages ? dossierObj.totalPages : self.page;
                    } else {
                        self.listDossiers = [];
                    }
                    this.dataLoading = false;
                })
                .catch((error) => {
                    self.listDossiers = [];
                    self.errMsg = error;
                    this.dataLoading = false;
                });
        }
    }
}
</script>
