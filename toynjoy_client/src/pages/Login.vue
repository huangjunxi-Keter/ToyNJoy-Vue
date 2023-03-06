<template>
    <div class="bodyer">
        <particles-bg type="circle" :bg="true" />
        <login-box />
    </div>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";
import LoginBox from '@/components/Login_Box.vue';

export default {
    name: 'Login',
    components: {
        'login-box': LoginBox,
        ParticlesBg
    }
}
</script>

<style scoped>
.bodyer {
    overflow-y: hidden;
    padding: 0;
    margin: 0;
    height: calc(100vh - 195px);
}
</style>