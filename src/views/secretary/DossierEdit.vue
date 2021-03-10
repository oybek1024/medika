<template>
    <div class= "text-tgreen bg-white min-h-tmminbody sm:min-h-tminbody p-5 sm:p-10 w-full flex flex-col items-center justify-center">
        
        <h1 class="font-bold w-full sm:w-8/12 mb-2 sm:mb-3 text-center">
            Modifier information d'un dossier
        </h1>

        <div class="w-full sm:w-10/12 md:w-10/12 xl:w-6/12 sm:py-2 sm:px-5">

            <div class="grid grid-cols-12 gap-x-2 gap-y-3 items-center w-full">
                <div :class="labelClass">N° Dossier</div>
                <input :class="inputClass" placeholder="N° Dossier" @keyup.enter="updateDossier" v-model="noDossier"/>
                <div :class="vspacer"></div>

                <div :class="labelClass">Nom</div>
                <input :class="inputClass" placeholder="nom"  @keyup.enter="updateDossier" v-model="lastName"/>
                <div :class="vspacer"></div>

                <div :class="labelClass">Prénom</div>
                <input :class="inputClass" placeholder="prénom" @keyup.enter="updateDossier" v-model="firstName"/>
                <p :class="vspacer"></p>
                
                <div :class="labelClass">Date de naissance</div>
                <input :class="inputClass" placeholder="jj/mm/aaaa" @keyup.enter="addDossier" v-model="birthdate"/>
                <p :class="vspacer"></p>

                <div :class="labelClass">Email</div>
                <input :class="inputClass" placeholder="email" @keyup.enter="updateDossier" v-model="email"/>
                <p :class="vspacer"></p>

                <div :class="labelClass">Téléphone</div>
                <input :class="inputClass" placeholder="téléphone" @keyup.enter="updateDossier" v-model="phone"/>
                <p :class="vspacer"></p>

                <!-- RDV date -->
                <div :class="labelClass">Date de RDV</div>
                <input :class="inputClass" placeholder="jj/mm/aaaa" @keyup.enter="addDossier" v-model="dateRDV"/>
                <p :class="vspacer"></p>

                <!-- RDV time -->
                <div :class="labelClass"></div>
                <div :class="[selectTimeContainerClass]">
                    <div class="w-5/12 relative">
                        <select id="h-option-select" v-model="hour" :class="[selectTimeClass, 't_sm-selector']">
                            <option v-for="h in hourOptions" :value="h.val" :key="'hour_' + h.val">
                                {{ h.text }}
                            </option>
                        </select>
                        <i :class="['feather icon-chevron-down flex items-center text-lg absolute right-2.5 inset-y-0']"></i>
                    </div>
                    <div class="w-5/12 relative">
                        <select id="m-option-select" v-model="minute" :class="[selectTimeClass, 't_sm-selector']">
                            <option v-for="m in minuteOptions" :value="m.val" :key="'minute_' + m.val">
                                {{ m.text }}
                            </option>
                        </select>
                        <i :class="['feather icon-chevron-down flex items-center text-lg absolute right-2.5 inset-y-0']"></i>
                    </div>
                </div> 
                <p :class="vspacer"></p>

                <!-- examen select -->
                <div :class="labelClass">Examen</div>
                <div :class="[selectContainerClass, 'relative']">
                    <vue-autosuggest
                        :sectionConfigs="sectionConfigs"
                        id="autosuggest"
                        ref="autocomplete"
                        v-model="query"
                        :suggestions="filteredOptions"
                        :inputProps="inputProps"
                        :renderSuggestion="renderSuggestion"
                        :getSuggestionValue="getSuggestionValue"/>
                </div> 
                <p :class="vspacer"></p>

                <!-- medika centre select -->
                <div :class="labelClass">Centre Medika</div>
                <div :class="[selectContainerClass, 'relative']">
                    <select id="examen-option-select" v-model="examenCentreId" :class="[selectClass, 't_sm-selector']">
                        <option v-for="item in examenCentreOptions" :value="item._id" :key="item._id">
                            {{ item.name }}
                        </option>
                    </select>
                    <i :class="['feather icon-chevron-down flex items-center text-lg absolute right-2.5 inset-y-0']"></i>
                </div>
                <p :class="vspacer"></p>

            </div>

            <div class="flex justify-center w-full text-center">
                <ul v-if="inputCheckerrors.length" class="w-8/12 mx-auto p-2 text-tdanger">
                    <li v-for="(err, idx) in inputCheckerrors" :key="idx"><i class="feather icon-alert-triangle mr-1"/>{{ err }}</li>
                </ul>
                <p v-if="errormessage" class="p-2 text-tdanger">
                    <i class="feather icon-alert-triangle mr-1"/>{{errormessage}}
                </p>
            </div>
            
            <button class="mx-auto bg-tdarkblue font-bold text-white px-5 py-2 mt-3 sm:mt-5 hover:shadow-xl 
                flex justify-around items-center" @click="updateDossier">
                <p v-if="loading" class="text-xl animate-spin feather icon-loader mr-2"></p>
                <p>Mis à jour</p>
            </button>
            
            <p class="text-center mt-5 cursor-pointer underline" @click="toDetail">
                Afficher les détails de ce dossier
            </p>

            <p class="text-center mt-5 cursor-pointer underline" @click="backToDash">
                Revenir à l'espace Secretaire 
            </p>

        </div>

    </div>
</template>


<script>
import { mapActions, mapState } from 'vuex-alt';
import { validEmail } from 'Libs/helper'
import { VueAutosuggest } from 'vue-autosuggest';

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});


export default {
    name: "DossierEdit",
    data() {
        return {
            labelClass: `
                col-span-3 sm:col-span-2 md:col-span-3
                text-sm xl:text-base 
                text-right`,
   
                
            selectContainerClass: `
                col-span-8 
                sm:col-span-8 
                md:col-span-6
                `,

            selectClass: `
                w-full
                border border-gray-300 
                px-2 py-2 sm:py-3 rounded-md 
                hover:shadow-md 
                text-sm xl:text-base`,

            inputClass: `
                col-span-8 
                sm:col-span-8 
                md:col-span-6 
                border border-gray-300 hover:border-blue-200
                px-2 py-2 sm:py-3 rounded-md 
                hover:shadow-md 
                text-sm xl:text-base`,

            vspacer: 'col-span-1 sm:col-span-2 md:col-span-2',

            inputDateClass: `
                col-span-8 
                sm:col-span-8 
                md:col-span-6 
                border border-gray-300 hover:border-blue-200
                px-2 py-1 sm:py-2 rounded-md
                hover:shadow-md
                text-xs xl:text-base`,

            selectTimeContainerClass: `
                col-span-8 
                sm:col-span-8 
                md:col-span-6 
                text-sm xl:text-base
                flex justify-around`,

            selectTimeClass: `
                w-full
                border border-gray-300 
                px-5 py-1 sm:py-2 rounded-md
                hover:shadow-md`,

            noDossier: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            
            dateRDV: '',

            birthdate: '',

            locale: { lang: 'fr', weekDays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'] },

            examenCentreId: '',
            examenId: '',

            examenOptions: [],
            examenCentreOptions: [],

            hour: 7,
            minute: 0,
            hourOptions: [],
            minuteOptions: [],

            loading: '',
            errormessage: '', 
            inputCheckerrors: [],

            query: "",
            inputProps: {
                id: "search-input",
                placeholder: "type examen ?",
                class: `w-full
                    border border-gray-300 
                    px-2 py-2 sm:py-3 rounded-md 
                    hover:shadow-md 
                    text-sm xl:text-base`,
                name: "search-input"
            }
        }
    },
    components: {
        VueAutosuggest
    },
    mounted() {
        let date = new Date();
        this.currentDate = `${date.getFullYear()}/${(date.getMonth() + 1)}/${date.getDate()}:00:00`;

        this.hourOptions = [{ val: '', text: "heure" }];
        for (let i = 7; i < 23; i++) {
            this.hourOptions.push({ val: "" + (i < 10 ? ("0" + i) : i), text: `${i} h` });
        }
        this.minuteOptions = [{ val: '', text: "minute" }];
        for (let i = 0; i < 60; i += 5) {
            this.minuteOptions.push({ val: (i < 10 ? ("0" + i) : i), text: `${i} '` });
        }

        let self = this;

        let dossierId = this.$route.params.dossierId;
        if (!(this.fullDossier && (this.fullDossier._id == dossierId)) ) {
            self.$myAuthAxios({
                    url: `/dossier/${dossierId}`,
                    method: "get"
                })
                .then(res => {
                    let dossier = ((res.data || {}).data || {}).dossier;
                    let status = (res.data || {}).status;
                    if (status === "success" && dossier) {
                        self.setFullDossier(dossier);
                        self.setData();
                    }
                })
                .catch((error) => {
                    self.getDataError = error;
                });
        }

        self.$myAuthAxios({
                url: `/examen`,
                method: "get"
            })
            .then(res => {
                let examens = ((res.data || {}).data || {}).examens;
                let status = (res.data || {}).status;
                if (status === "success" && examens) {
                    self.examenOptions = examens;
                    if (this.fullDossier && this.fullDossier.examenId) {
                        let idx = examens.findIndex(e => e._id == this.fullDossier.examenId._id);
                        if (idx > -1) {
                            this.query = `${examens[idx].group} - ${examens[idx].code}`
                        }
                    }
                    self.setData();
                }
            })
            .catch((error) => {
                self.getDataError = error;
            });

        self.$myAuthAxios({
                url: `/examencentre`,
                method: "get"
            })
            .then(res => {
                let examencentres = ((res.data || {}).data || {}).examencentres;
                let status = (res.data || {}).status;
                if (status === "success" && examencentres) {
                    let arr  = [{ _id: '',  name: 'Selectionnez examen centre' }];
                    self.examenCentreOptions = arr.concat(examencentres);
                    this.setData();
                }
            })
            .catch((error) => {
                self.getDataError = error;
            });
    },
    computed: {
        ...mapState({
            fullDossier: (state) => state.dossier.fullDossier,
            pagingParam: (state) => state.secretary.pagingParam
        }),
         sectionConfigs() {
            let self = this;
            let configObj = {};
            if (this.filteredOptionsAll && this.filteredOptionsAll.length) {
                this.filteredOptionsAll.forEach(e => {
                    configObj[e.name] = {
                        label: e.name,
                        onSelected: selected => {
                            if (self.examenOptions && selected && selected.item) {
                                let selectExamen = self.examenOptions.filter(e => e.code == selected.item && e.group == selected.name)
                                self.examenId = selectExamen[0]._id;
                            }
                        }
                    }
                })
            }
            return configObj;
        },
        filteredOptionsAll() {
            let self = this;
            let out = [];
            let groupedObj = groupBy('group')(self.examenOptions);
            Object.keys(groupedObj).forEach(g => {
                if (groupedObj[g] && groupedObj[g].length) {
                    out.push(
                        {
                            name: g,
                            data: groupedObj[g].map(o => o.code)
                        }
                    );
                }
            });
            return out;
        },
        filteredOptions() {
            let self = this;
            const query = this.query;
            let out = [];
            let filteredExamenOptions = self.examenOptions.filter(
                e => {
                    let check = true;
                    let queryArr = query.split(' ');
                    queryArr.forEach(q => {
                        check = check &&  
                        (
                            e.code.toLowerCase().indexOf(q.toLowerCase()) > -1 || 
                            e.group.toLowerCase().indexOf(q.toLowerCase()) > -1
                        )
                    })
                    return check;
                }
            );
            let groupedObj = groupBy('group')(filteredExamenOptions);
            Object.keys(groupedObj).forEach(g => {
                if (groupedObj[g] && groupedObj[g].length) {
                    out.push(
                        {
                            name: g,
                            data: groupedObj[g].map(o => o.code)
                        }
                    );
                }
            });
            return out;
        }
    },
    methods: {
        ...mapActions({
            setFullDossier: (actions) => actions.dossier.setFullDossier
        }),
        renderSuggestion(suggestion) {
            return `${suggestion.name} - ${suggestion.item}`;
        },
        getSuggestionValue(suggestion) {
            return `${suggestion.name} - ${suggestion.item}`;
        },
        toDetail() {
            this.$router.push({ name: 'secretary-dossier-detail', params: { dossierId: this.fullDossier._id } });
        },
        backToDash() {
            this.$router.push({ name: 'secretary-dash', query: { page: this.pagingParam || 1 } });
        },
        setData() {
            this.noDossier = this.fullDossier.noDossier;
            this.firstName = this.fullDossier.firstName;
            this.lastName = this.fullDossier.lastName;
            this.birthdate = this.fullDossier.birthdate;
            this.email = this.fullDossier.email;
            this.phone = this.fullDossier.phone;
            if (this.fullDossier && this.fullDossier.dateRDV) {
                let dateRDVArr = this.fullDossier.dateRDV.split(':')[0].split('/').reverse();
                this.dateRDV = `${dateRDVArr[0]}/${dateRDVArr[1]}/${dateRDVArr[2]}`;
                this.hour = this.fullDossier.dateRDV.split(':')[1];
                this.minute = this.fullDossier.dateRDV.split(':')[2];
            }
            this.examenId = this.fullDossier.examenId._id;
            this.examenCentreId = this.fullDossier.examenCentreId._id;
        },
        checkForm() {
            let self = this;
            this.inputCheckerrors = [];
            this.submitError = '';
            if (!this.noDossier) {
                this.inputCheckerrors.push(this.$error.is_empty('N° Dossier'));
            } else if (this.noDossier && this.noDossier.length > 50) {
                this.inputCheckerrors.push(this.$error.max_length(50));
            }
            // if (!this.phone) {
            //     this.inputCheckerrors.push(this.$error.is_empty('Téléphone'));
            // } else 
            if (this.phone && this.phone.length > 50) {
                this.inputCheckerrors.push(this.$error.max_length(50));
            }
            if (!this.dateRDV) {
                this.inputCheckerrors.push(self.$error.is_empty('Date de rdv'));
            } else if (!this.$checkDateRDV(this.dateRDV)) {
                this.inputCheckerrors.push(self.$error.wrong_format('Date de rdv'));
            }
            if (!this.birthdate) {
                this.inputCheckerrors.push(self.$error.is_empty('Date de naissance'));
            } else if (!this.$checkDate(this.birthdate)) {
                this.inputCheckerrors.push(self.$error.wrong_format('Date de naissance'));
            }
            if (this.email && !validEmail(this.email)) {
                this.inputCheckerrors.push(self.$error.wrong_format('Email'));
            }
            if (!this.examenId) {
                this.inputCheckerrors.push(self.$error.is_empty('Examen'));
            }
            if (!this.examenCentreId) {
                this.inputCheckerrors.push(self.$error.is_empty('Examen centre'));
            }
            return !this.inputCheckerrors.length;
        },
        updateDossier() {
            if (this.checkForm()) {
                let dossierId = this.$route.params.dossierId;
                var self = this;
                this.loading = true;

                let dateRDVArr = self.dateRDV.split('/').reverse();
                let dateRDVToSave = `${dateRDVArr[0]}/${dateRDVArr[1]}/${dateRDVArr[2]}:${self.hour}:${self.minute}`;

                let data = {
                    noDossier: self.noDossier,
                    firstName: self.firstName,
                    lastName: self.lastName,
                    email: self.email,
                    phone: self.phone,
                    dateRDV: dateRDVToSave,
                    birthdate: self.birthdate,
                    examenId: self.examenId,
                    examenCentreId: self.examenCentreId
                }
                this.$myAuthAxios({
                    url: `/dossier/${dossierId}`,
                    method: 'PUT',
                    data: data
                })
                .then(res => {
                    if (res.data) {
                        let dossier = ((res.data || {} ).data || {} ).dossier || {}
                        const { examenId, examenCentreId, ...oldObj } = dossier;
                        let newobj = Object.assign({}, {
                            examenId: self.fullDossier.examenId, 
                            examenCentreId: self.fullDossier.examenCentreId, 
                            ...oldObj 
                        });
                        self.setFullDossier(newobj);
                        self.$router.push({ name: 'secretary-dash' });
                    }
                })
                .catch(err => {
                    if(err.response && err.response.data && err.response.data.message) {
                        self.errormessage = err.response.data.message;
                    } else {
                        self.errormessage = err.data.message;
                    }
                }).then(() => {
                    self.loading = false;
                })
            }
        }
    }
}
</script>

<style>
  .autosuggest__results {
    z-index: 10;
    width: 100%;
    max-height: 300px;
    overflow-y: scroll;
    position: absolute;
    border: 1px solid #e0e0e0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background: white;
    padding: 0px;
    margin: 0px;
    text-align: left;
    font-weight: 300;
    font-size: 12px;
    box-shadow: 7px 13px 16px 0px rgba(0, 0, 0, 0.2);
    padding-bottom: 30px;
    @media (max-width:768px) {
      font-size: 11px;
    }
  }
  .autosuggest__results ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }
  .autosuggest__results .autosuggest__results-item {
    cursor: pointer;
    padding: 5px 10px 5px 20px;
    @media (max-width:768px) {
      padding: 5px 5px 5px 15px;
    }
  }
  #autosuggest ul:nth-child(1) > .autosuggest__results_title {
    border-top: none;
  }
  #autosuggest .custom {
    border-radius: 36px;
  }
  .autosuggest__results .autosuggest__results-before {
    text-align: left;
    font-weight: 700;
    color: gray;
    font-size: 14px;
    padding: 15px 15px 5px 15px;
    border-bottom: 1px solid lightgray;
    @media (max-width:768px) {
      font-size: 12px;
      padding: 10px 10px 5px 10px;
    }
  }
  .autosuggest__results .autosuggest__results-item:active,
  .autosuggest__results .autosuggest__results-item:hover,
  .autosuggest__results .autosuggest__results-item:focus,
  .autosuggest__results
    .autosuggest__results-item.autosuggest__results-item--highlighted {
    background-color: #7cc2e2;
  }
</style>