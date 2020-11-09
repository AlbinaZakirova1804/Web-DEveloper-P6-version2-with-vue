<template>
    <h1>This is a sauces page</h1>
    <div class = "row">
        <div class="col-md-4" v-for="sauce in sauces" :key="sauce.id" >
          <div class= "card">
            <div class="card-devider">
              {{sauce.name}}
            </div>
            <div class = "card-section">
              <p></p>
            </div>
          </div>
        </div>
    </div>
    
</template>

<script>
import axios from "axios"
export default {
name:'Sauces',
data() {
  return {
    sauces: []
  };
},
methods: {
  retriveSauces() {
axios.get('http://localhost:3000/api/sauces')
.then(response=>{this.sauces=response.data;
console.log(response.data);})
  }
}, 
mounted() {
  this.retriveSauces();
}

}
</script>

<style lang="scss">
.card-devider{
  color:red;
  font-size: 20px;
}
</style>