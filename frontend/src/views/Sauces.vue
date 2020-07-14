<template>
     <div class = "sauces">
     <h1>all sauces page</h1>
     
     <ul id="example-1">
         <li v-for="sauce in sauces" :key="sauce.name">
            {{ sauce.name }}
         </li>
     </ul>
     </div>
</template>

<script>


</script>

<style scoped>
    
</style>