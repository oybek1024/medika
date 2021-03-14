<template>
    <div class= "text-tgreen bg-white p-5 flex flex-col items-center justify-center">

        <div class="text-tgreen grid grid-cols-1 xl:grid-cols-2 w-full">

            <div class="flex flex-col justify-center text-center items-center xl:items-end">
                <div class="w-full xl:w-10/12 text-sm sm:text-base mb-1 sm:mb-10 xl:mg-0">
                    <h1 class="font-bold mb-1 sm:mb-2">Connectez-vous à votre Espace Patient</h1>
                    <p>Votre identifiant est votre numéro de dossier.</p>
                    <p>Votre mot de passe est votre date de naissance (jj/mm/aaaa). </p>
                </div>
            </div>

            <div class="flex justify-center items-center">
                <div class="w-full sm:w-6/12 xl:w-8/12 py-2 px-5">
                    <p class="mb-1">N° Dossier</p>
                    <input placeholder="votre numéro de dossier"
                        @keyup.enter="login"
                        class="border p-2 w-full hover:p-3 hover:shadow-md hover:border-blue-200 border-gray-300 rounded-md"
                        v-model="noDossier"/>
                    <p class="mb-1 mt-5">Date de naissance</p>
                    <input placeholder="jj/mm/aaaa"
                        @keyup.enter="login"
                        class="border p-2 w-full hover:p-3 hover:shadow-md hover:border-blue-200 border-gray-300 rounded-md"
                        v-model="birthdate"/>
                    <ul v-if="errors.length" class="p-2 text-tdanger">
                        <li v-for="(err, idx) in errors" :key="idx"><i class="feather icon-alert-triangle mr-1"/>{{ err }}</li>
                    </ul>
                    <p v-if="errormessage" class="p-2 text-tdanger"><i class="feather icon-alert-triangle mr-1"/>{{errormessage}}</p>
                    <button class="float-right bg-tdarkblue font-bold text-white px-5 py-2 mt-3 sm:mt-5 hover:shadow-xl
                        flex justify-around items-center" @click="login">
                        <p v-if="loading" class="text-xl animate-spin feather icon-loader mr-2"></p>
                        <p>Se connecter</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { mapActions } from 'vuex-alt';

export default {
    name: "Login",
    data() {
        return {
            errors: [],
            loading: false,
            errormessage: '',
            birthdate: '',
            noDossier: this.$route.params.noDossier || ''
        }
    },
    created() {
    },
    methods: {
        ...mapActions({
            setDossier: (actions) => actions.dossier.setDossier,
            setDossierId: (actions) => actions.dossier.setDossierId
        }),
        checkForm() {
            let self = this;
            this.errors = [];
            this.errormessage = '';
            if (!this.noDossier) {
                this.errors.push(this.$error.is_empty('dossier'));
            } else if (this.noDossier && this.noDossier.length > 50) {
                this.errors.push(this.$error.max_length(50));
            }
            if (!this.birthdate) {
                this.errors.push(self.$error.is_empty('date de naissance'));
            } else if (!this.$checkDate(this.birthdate)) {
                this.errors.push(self.$error.wrong_format('date de naissance'));
            }
            return !this.errors.length;
        },
        login() {
            if (this.checkForm()) {
                var self = this;
                this.loading = true;
                this.$myAxios({
                    url: '/dossier/login',
                    method: 'POST',
                    data: {
                        noDossier: this.noDossier,
                        birthdate: this.birthdate
                    }
                })
                .then((response) => {
                    let data = (response.data || {}).data || {};
                    if (data.token) {
                        // !! attention: only need to return base dossier information used to check
                        // registered. Not get the full dossier here
                      // eslint-disable-next-line no-unused-vars
                        let dossier = data.dossier || {};
                        self.setDossier(data.dossier);
                        self.setDossierId(data.dossier._id);

                        localStorage.setItem('jwt', data.token);
                        if (localStorage.getItem('jwt') != null) {
                            self.$router.push({ name: 'dossier-register' });
                        }
                    } else {
                        self.errormessage = data.message;
                    }
                })
                    // eslint-disable-next-line no-unused-vars
                .catch(err => {
                    self.errormessage = self.$error.auth_fail();
                }).then(() => {
                    self.loading = false;
                })
            }
        }
    }
}
</script>
