<template>
    <div class="bodyer">
        <!-- 此div仅用于展示 粒子背景特效，必须在外层限制特效范围，否则高度会溢出（出现垂直滚动条） -->
        <div>
            <!-- 
                color: String类型。默认’#dedede’。粒子颜色。
                particleOpacity: Number类型。默认0.7。粒子透明度。
                particlesNumber: Number类型。默认80。粒子数量。
                shapeType: String类型。默认’circle’。可用的粒子外观类型有：“circle”,“edge”,“triangle”, “polygon”,“star”。
                particleSize: Number类型。默认80。单个粒子大小。
                linesColor: String类型。默认’#dedede’。线条颜色。
                linesWidth: Number类型。默认1。线条宽度。
                lineLinked: 布尔类型。默认true。连接线是否可用。
                lineOpacity: Number类型。默认0.4。线条透明度。
                linesDistance: Number类型。默认150。线条距离。
                moveSpeed: Number类型。默认3。粒子运动速度。
                hoverEffect: 布尔类型。默认true。是否有hover特效。
                hoverMode: String类型。默认true。可用的hover模式有: “grab”, “repulse”, + “bubble”。
                clickEffect: 布尔类型。默认true。是否有click特效。
                clickMode: String类型。默认true。可用的click模式有: “push”, “remove”, “repulse”, “bubble”。
             -->
            <vue-particles shapeType="triangle" color="#000000" linesColor="#000000" :particlesNumber="120"
                :moveSpeed="3">
            </vue-particles>
        </div>
        <register-box />
    </div>
</template>

<script>
import Register_Box from '@/components/Register_Box.vue';

export default {
    name: 'Register',
    components: {
        'register-box': Register_Box
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