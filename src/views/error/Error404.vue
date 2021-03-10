<template>
    <div class= "w-full min-h-tmminbody sm:min-h-tminbody text-tgreen bg-white flex flex-col items-center justify-center">
        <h1 class="text-3xl mb-5" >Page non trouver !</h1>
        <p @click="toLogin" class="text-xl underline cursor-pointer">Aller à la page d'accueil</p>
    </div>
</template>

<script>
export default {
    name: 'Error404',
    methods: {
        toLogin() {
            this.$router.push({ name: 'dossier-login' });
        }
    }
}
</script>