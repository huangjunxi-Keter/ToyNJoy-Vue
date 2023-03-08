<template>
    <div class="hardware_requirements">
        系统需求
        <div class="content">
            <div class="left">
                <label>最低配置</label>
                <ul>
                    <li>操作系统：<span>{{ hardwareRequirements.os }}</span></li>
                    <li>处理器：<span>{{ hardwareRequirements.cpu }}</span></li>
                    <li>显卡：<span>{{ hardwareRequirements.gpu }}</span></li>
                    <li>内存：<span>{{ hardwareRequirements.ram }}</span></li>
                    <li>DirectX：<span>{{ hardwareRequirements.directX }}</span></li>
                </ul>
            </div>
            <div class="right">
                <label>推荐配置</label>
                <ul>
                    <li>操作系统：<span>{{ hardwareRequirements.os1 }}</span></li>
                    <li>处理器：<span>{{ hardwareRequirements.cpu1 }}</span></li>
                    <li>显卡：<span>{{ hardwareRequirements.gpu1 }}</span></li>
                    <li>内存：<span>{{ hardwareRequirements.ram1 }}</span></li>
                    <li>DirectX：<span>{{ hardwareRequirements.directX1 }}</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Hardware_Requirements',
    props: ['hardwareRequirements']
}
</script>

<style scoped>
.hardware_requirements {
    margin: 1.5vw 0 1.5vw 0;
    font-size: 1vw;
    color: black;
    font-weight: 700;
    font-family: 'Microsoft YaHei';
    user-select:none;
    background-color: white;
    box-shadow: 0 0 0.2vw 0.05vw #aeaeae;
    padding: 20px;
}
.hardware_requirements > .content {
    margin-top: 0.3vw;
    padding-top: 0.3vw;
    border-top: solid 0.2vw black;
    color: #757575;
    display:flex;
}
.hardware_requirements > .content > div{
    flex:auto;
}
.hardware_requirements > .content label{
    color: black;
}
.hardware_requirements > .content ul{
    list-style:none;
    margin:0;
    position:relative;
    user-select:text;
}
.hardware_requirements > .content ul span{
    position:absolute;
    left:10vw;
}
</style>