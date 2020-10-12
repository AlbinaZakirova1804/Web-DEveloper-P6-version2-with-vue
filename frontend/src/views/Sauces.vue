<template>
    <h1>This is a sauces page</h1>
    
        <div class="card col m-3" v-for="sauce in sauces" :key="sauce.id" >
          <div class= "card">
            <div class="card-devider">
              {{sauce.name}}
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