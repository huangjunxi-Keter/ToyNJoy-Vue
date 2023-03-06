<template>
    <div class="bodyer">
        <particles-bg type="circle" :bg="true" />
        <register-box />
    </div>
</template>

<script>
import { ParticlesBg } from "particles-bg-vue";
import Register_Box from '@/components/Register_Box.vue';

export default {
    name: 'Register',
    components: {
        'register-box': Register_Box,
        ParticlesBg
    }
}
</script>

<style scoped>
.bodyer {
    overflow-y: hidden;
    margin: 0;
    height: calc(100vh - 195px);
}
</style>