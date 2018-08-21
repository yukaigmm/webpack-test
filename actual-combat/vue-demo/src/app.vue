<template>
    <div class="test">hello {{content}}</div>
</template>


<script>
    export default {
        data:()=>{
            return {
                content: "Vue"
            }
        },
        mounted() {
        },
    }
</script>


<style scoped>
    .test{
        color: #f45;
    }
</style>

