<template>
    <div class="test">hello {{content}}</div>
</template>

<script>
import axios from "axios";
    export default {
        data:()=>{
            return {
                content: "Vue"
            }
        },
        mounted() {
            axios.get("api/test").then((res) =>{
                alert(res.data)
                console.log(res)
            })
        },
    }
</script>


<style scoped>
    .test{
        color: #f45;
    }
</style>

