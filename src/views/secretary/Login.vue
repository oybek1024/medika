<template>
    <div class= "text-tgreen bg-white p-5 flex flex-col items-center justify-center w-full">

        <p class="font-bold text-center text-base sm:text-xl mb-3 sm:mb-10 xl:mb-5">Espace Secrétaire</p>

        <div class="w-full sm:w-6/12 xl:w-3/12 py-3 sm:py-5 px-5">
            <p class="mb-1">Identifier</p>
            <input placeholder="votre identifiant" 
                type="text"
                @keyup.enter="login"
                class="border p-2 w-full hover:p-3 hover:shadow-md hover:border-blue-200 border-gray-300 rounded-md" 
                v-model="username"/>
            
            <p class="mb-1 mt-5">Mot de passe</p>
            <div class="relative flex w-full flex-wrap items-stretch">
                <input placeholder="votre mot de pass" 
                    :type="showpass ? 'text' : 'password'"
                    @keyup.enter="login"
                    class="border p-2 w-full hover:p-3 hover:shadow-md hover:border-blue-200 border-gray-300 rounded-md col-start-1 col-end-10" 
                    v-model="password"/>
                <span @click="showpass=!showpass" class="cursor-pointer z-10 text-gray-400 text-xl w-8 absolute pt-2 pl-1 inset-y-0 right-0">
                    <i v-if="showpass" class="feather icon-eye-off"></i>
                    <i v-else class="feather icon-eye"></i>
                </span>
            </div>

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
</template>


<script>
import { mapActions } from 'vuex-alt';

export default {
    name: "SecretaryLogin",
    data() {
        return {
            showpass: false,
            errors: [],
            loading: false,
            errormessage: '',
            password: '',
            username: ''
        }
    },
    methods: {
        ...mapActions({
            setSecretaryId: (actions) => actions.secretary.setSecretaryId
        }),
        checkForm() {
            let self = this;
            this.errors = [];
            this.errormessage = '';
            if (!this.username) {
                this.errors.push(this.$error.is_empty('username'));
            } else if (this.username && this.username.length > 50) {
                this.errors.push(this.$error.max_length(50));
            }
            if (!this.password) {
                this.errors.push(this.$error.is_empty('password'));
            } else if (this.password && this.password.length > 50) {
                this.errors.push(this.$error.max_length(50));
            }
            return !this.errors.length;
        },
        login() {
            if (this.checkForm()) {
                var self = this;
                this.loading = true;
                this.$myAxios({
                    url: '/secretary/login',
                    method: 'POST',
                    data: {
                        username: self.username,
                        password: self.password
                    }
                })
                .then(response => {
                    let data = (response.data || {}).data || {};
                    if (data.token) {
                        let secretary = data.secretary || {};
                        self.setSecretaryId(data.secretary._id);
                        
                        localStorage.setItem('jwt', data.token);
                        if (localStorage.getItem('jwt') != null) {
                            self.$router.push({ name: 'secretary-dash' });
                        }
                    } else {
                        self.errormessage = data.message;
                    }
                })
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