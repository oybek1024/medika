<template>
    <div class="h-t_m_header sm:h-t_header border w-full text-center 
        shadow-xl flex justify-center items-center bg-no-repeat bg-cover bg-center" :style="cssProps">
    </div>
</template>
<script>

export default {
    name: 'MainHeader',
    data() {
        return {
            innerWidth: window.innerWidth
        }
    },
    mounted() {
        window.addEventListener('resize', () => {
            this.innerWidth = window.innerWidth
        })
    },
    computed: {
        cssProps() {
            return {
                backgroundImage: this.innerWidth > 500 ? 
                    `url(${require('@/assets/images/banner.png')})` :
                    `url(${require('@/assets/images/mobileBanner.png')})`
            }
        },
    }
}
</script>
