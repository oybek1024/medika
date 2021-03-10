<template>
    <div class= "text-tgreen bg-white min-h-tmminbody sm:min-h-tminbody p-5 sm:p-10 w-full flex flex-col items-center justify-center">
        
        <h1 class="font-bold w-full sm:w-8/12 mb-2 sm:mb-3 text-center">
            Merci de compléter votre dossier
        </h1>

        <div class="w-full sm:w-11/12 xl:w-6/12 sm:py-2 sm:px-5">

            <div class="grid grid-cols-12 gap-x-2 gap-y-3 items-center w-full">

                <!-- general info -->
                <div :class="labelClass">Nom</div>
                <input placeholder="votre nom" @keyup.enter="register" :class="inputClass"  v-model="lastName"/>
                <div :class="hspacer"></div>

                <div :class="labelClass">Prénom</div>
                <input placeholder="votre prénom" @keyup.enter="register" :class="inputClass" v-model="firstName"/>
                <p :class="hspacer"></p>
                
                <div :class="labelClass">Téléphone</div>
                <input placeholder="votre téléphone" @keyup.enter="register" :class="inputClass"  v-model="phone"/>
                <p :class="hspacer"></p>

                <div :class="labelClass">Email</div>
                <input placeholder="votre email" @keyup.enter="register" :class="inputClass"  v-model="email"/>
                <p :class="hspacer"></p>

                <!-- no securite social -->
                <div :class="labelClass">N° Sécurité Social</div>
                <input placeholder="votre N° Sécu. Social" @keyup.enter="register" :class="inputClass" v-model="noSecuriteSociale"/>
                <p :class="hspacer"></p>

                <!-- select upload file type -->
                <div :class="labelClass">Justificatif de droits</div>
                <div :class="[selectContainerClass, 'relative']">
                    <select id="securite-option-select" v-model="justificatiDroitSlugTitre" :class="[selectClass, 't_sm-selector']">
                        <option class="w-full" v-for="item in justificatifDroitOptions" :value="item.val" :key="item.text">
                            {{ item.text }}
                        </option>
                    </select>
                    <i :class="['feather icon-chevron-down flex items-center text-lg absolute right-2.5 inset-y-0']"></i>
                </div>
                <p :class="hspacer"></p>

                <!-- upload file securite social -->
                <div :class="labelClass"></div>
                <div class="col-span-7 sm:col-span-6 flex flex-col items-center justify-center">
                    <button v-if="justificatiDroitSlugTitre" :class="uploadBtnClass" @click.prevent="chooseFile(justificatiDroitSlugTitre)">
                        <p v-if="uploadLoading" class="text-xl animate-spin feather icon-loader mr-2"></p>
                        <i class="feather icon-upload mr-1"/>Selectioner un fichier
                    </button>
                    <p v-if="file">{{file.name}}</p>
                </div>
                <p :class="hspacer"></p>

                <!-- address -->
                <div :class="labelClass">Adresse</div>
                <input placeholder="N°, rue, avenue, boulevard.." @keyup.enter="register" :class="inputClass"  v-model="street"/>
                <p :class="hspacer"></p>

                <div :class="labelClass"></div>
                <input placeholder="votre code postal" @keyup.enter="register" :class="inputClass"  v-model="zipcode"/>
                <p :class="hspacer"></p>

                <div :class="labelClass"></div>
                <input placeholder="votre ville" @keyup.enter="register" :class="inputClass"  v-model="city"/>
                <p :class="hspacer"></p>
                <!-- finish address -->

            </div>

            <!-- captcha -->
            <div class="grid grid-cols-12 gap-x-2 gap-y-3 mt-3 sm:mt-5 items-center w-full">
                <div :class="labelClass">Code de vérification</div>
                <div :class="[inputCaptchaContainerClass, 'flex flex-col justify-start items-start md:flex-row md:justify-start md:items-center ']">
                    <input placeholder="code" :class="[inputCaptchaClass, 'mb-1 py-1 w-full md:w-4/12 mr-0 sm:mr-2']"  v-model="captcha"/>
                    <div class="flex items-center">
                        <div class="text-sm w-18" v-html="svgCaptcha"></div>
                        <i @click="getCaptcha()" class="w-2/12 ml-2 cursor-pointer hspacer feather icon-refresh-cw"/>
                    </div>
                </div>
                <p :class="hspacer"></p>
            </div>

            <!--  error & message  -->
            <div class="flex flex-col items-center justify-center w-full">
                <ul v-if="errors.length" class="w-8/12 mx-auto text-center p-2 text-tdanger">
                    <li v-for="(err, idx) in errors" :key="idx"><i class="feather icon-alert-triangle mr-1"/>{{ err }}</li>
                </ul>
                <p v-if="errormessage" class="p-2 text-tdanger"><i class="feather icon-alert-triangle mr-1"/>{{errormessage}}</p>
                <p v-if="message" class="p-2 text-success"><i class="feather icon-check mr-1"/>{{message}}</p>
            </div>
            
            <!-- button update -->
            <div class="grid grid-cols-12 gap-x-2 gap-y-3 mt-3 sm:mt-5 items-center w-full">
                <div :class="labelClass"></div>
                <button :class="[inputClass, 'bg-tdarkblue font-bold text-white px-1 py-2 hover:shadow-xl flex justify-center items-center']" @click="register">
                    <p v-if="loading" class="text-xl animate-spin feather icon-loader mr-2"></p>
                    <p>Mise à jour</p>
                </button>
                <p :class="hspacer"></p>
            </div>

        </div>

    
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
import { mapActions, mapState } from 'vuex-alt';
import { validEmail } from 'Libs/helper'

export default {
    name: "Register",
    data() {
        return {
            hspacer: 'col-span-1 sm:col-span-3',

            labelClass: 'col-span-4 sm:col-span-3 md:col-span-3 text-right',

            uploadBtnClass: `
                border rounded-3xl hover:shadow-xl
                py-2 px-3 sm:px-5 mb-2 sm:mb-0
                bg-t_dark_green text-xs sm:text-sm text-white 
                flex justify-start items-center`,
            
            selectContainerClass: `
                col-span-7 
                sm:col-span-6`,

            selectClass: `
                w-full
                border border-gray-300 
                px-2 py-2 sm:py-3 rounded-md 
                hover:shadow-md 
                text-sm xl:text-base`,

            inputClass: `
                col-span-7 
                sm:col-span-6 
                border border-gray-300 hover:shadow-md hover:border-blue-200 
                px-2 py-1 sm:py-2 pr-5 
                rounded-md`,

            inputCaptchaContainerClass: `
                col-span-7 
                sm:col-span-6`,

            inputCaptchaClass: `
                border border-gray-300 hover:shadow-md hover:border-blue-200 
                px-2 py-1 sm:py-2
                rounded-md`,

            errors: [],
            loading: false,
            message: '',
            errormessage: '',
            phone: '',
            email: '',
            noSecuriteSociale: '',
            firstName: '',
            lastName: '',
            street: '',
            city: '',
            zipcode: '',
            title: process.env.VUE_APP_TITLE,

            justificatifDroitOptions: [
                {
                    text: "Sélection document", 
                    val: ""
                },
                {
                    text: "Feuille d’accident de travail",
                    val: "feuille_accident_de_travail"
                },
                {
                    text: "Attestation CMU",
                    val: "attestation_cmu"
                },
                {
                    text: "Carte AME",
                    val: "carte_ame"
                },
                {
                    text: "ACS (Aide Complémentaire Santé)",
                    val: "aide_de_complementaire_sante"
                },
                {
                    text: "Je n'ai aucun fichier à envoyer", 
                    val: ""
                },
            ],
            file: '',
            uploadLoading: false,
            justificatiDroitSlugTitre: "",
            svgCaptcha: null,
            captcha: ''
        }
    },
    mounted() {
        this.getCaptcha();
    },
    computed: {
        ...mapState({
            dossier: (state) => state.dossier.dossier
        })
    },
    methods: {
       ...mapActions({
            setDossier: (actions) => actions.dossier.setDossier
        }),
        chooseFile(slugTitre) {
            this.justificatiDroitSlugTitre = slugTitre;
            this.$refs.fileInput.click();
        },
        getTitle (slugTitle) {
            return this.justificatifDroitOptions.filter(e => e.val == slugTitle).text
        },
        initMsg() {
            this.errors = [];
            this.uploadLoading = false;
            this.loading = false;
            this.message = '';
            this.errormessage = '';
        },
        getCaptcha() {
            let self = this;
            this.$myAuthAxios({
                url: `dossier/me/getCaptcha`,
                method: 'GET'
            })
            .then(res => {
                self.svgCaptcha = res.data.data;
            })
        },
        onChange() {
            let self = this;
            this.initMsg();
            this.uploadLoading = true;
            this.file = this.$refs.fileInput.files[0];
            if (!this.file) return;
            let formData = new FormData()
            formData.append('doc', this.file)
            this.$myAuthAxios({
                url: `/dossier/me/uploadJustificatifDroit?justificatiDroitSlugTitre=${this.justificatiDroitSlugTitre}`,
                method: 'PUT',
                data: formData
            })
            .then(res => {
                if(res.data) {
                    this.message = this.$message.send_ok();
                }
            })
            .catch(err => {
                this.errormessage = this.$error.upload_fail();
            }).then(() => {
                self.uploadLoading = '';
            })
        },
        checkForm() {
            let self = this;
            this.initMsg();
            this.errors = [];
            if (!this.firstName) {
                this.errors.push(this.$error.is_empty('Prénom'));
            } else if (this.firstName && this.firstName.length > 50) {
                this.errors.push(this.$error.max_length(50));
            }
            if (!this.lastName) {
                this.errors.push(this.$error.is_empty('Nom'));
            } else if (this.lastName && this.lastName.length > 50) {
                this.errors.push(this.$error.max_length(50));
            }
            if (!this.phone) {
                this.inputCheckerrors.push(this.$error.is_empty('Téléphone'));
            } else if (this.phone && this.phone.length > 50) {
                this.inputCheckerrors.push(this.$error.max_length(50));
            }
            if (!this.email) {
                this.errors.push(self.$error.is_empty('Email'));
            } else if (!validEmail(this.email)) {
                this.errors.push(self.$error.wrong_format('Email'));
            }
            if (!this.noSecuriteSociale) {
                this.errors.push(this.$error.is_empty('Numéro Sécurité Sociale'));
            }
            if (!this.street) {
                this.errors.push(this.$error.is_empty('Rue'));
            }
            if (!this.city) {
                this.errors.push(this.$error.is_empty('Ville'));
            } 
            if (!this.zipcode) {
                this.errors.push(this.$error.is_empty('Code postal'));
            } 
            if (this.justificatiDroitSlugTitre && !this.file) {
                this.errors.push(this.$error.is_empty('fichier'));
            } 
            return !this.errors.length;
        },
        register() {
            if (this.checkForm()) {
                
                var self = this;
                this.loading = true;

                let today = new Date();
                // yyyy/mm/dd:hh:mm
                let yyyy = today.getFullYear();
                let mm = today.getMonth() + 1;
                let dd = today.getDate();
                let hh = today.getHours();
                let mn = today.getMinutes();
                if (mm < 10) mm = "0" + mm;
                if (dd < 10) dd = "0" + mm;
                if (hh < 10) hh = "0" + hh;
                if (mn < 10) mn = "0" + mn;
                let currentDate = `${yyyy}/${mm}/${dd}:${hh}:${mn}`;

                let data = {
                    currentDate: currentDate,
                    firstName: self.firstName,
                    lastName: self.lastName,
                    phone: self.phone,
                    email: self.email,
                    captcha: self.captcha,
                    "couvertureSante.noSecuriteSociale": self.noSecuriteSociale,
                    address: {
                        street: self.street,
                        city: self.city,
                        zipcode: self.zipcode,
                        country: 'France'
                    }
                }
                if (self.justificatiDroitSlugTitre && self.getTitle(self.justificatiDroitSlugTitre)) {
                    Object.assign(data, { 
                        "couvertureSante.justificatiDroitTitre": self.getTitle(self.justificatiDroitSlugTitre),
                        "couvertureSante.justificatiDroitSlugTitre": self.justificatiDroitSlugTitre 
                    });
                }

                this.$myAuthAxios({
                    url: `/dossier/patient-register`,
                    method: 'PUT',
                    data: data
                })
                .then(res => {
                    if (res.data) {
                        self.message = self.$message.update_ok();
                        let dossier = ((res.data || {} ).data || {} ).dossier || {}
                        self.setDossier(dossier._id)
                        self.setDossier(dossier)
                        self.$router.push({ name: 'dossier-dash' });
                    }
                })
                .catch(err => {
                    if (err.data && err.data.message) {
                        this.errormessage = err.data.message;
                    } else {
                        self.errormessage = self.$error.update_fail();
                    }
                }).then(() => {
                    self.loading = false;
                })
            }
        }
    }
}
</script>

<style scoped>
    
</style>