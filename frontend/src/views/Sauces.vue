<template>
     <div id = "sauces">
     <h1>All sauces available
     </h1>
     <div>
       <ul class = "sauces-list">
         <ol v-for = "sauce in sauces" :key = "sauce._id">
           <a href="http://localhost:3000/api/sauces">{{sauce.name}}</a>
   <strong><i class="fa fa-thumbs-up" aria-hidden="true"></i> {{sauce.likes}}</strong>
    <strong><i class="fa fa-thumbs-down" aria-hidden="true"></i> {{sauce.dislikes}}</strong><br>
         </ol>
       </ul>
    </div>
     </div>
</template>

<script>
import axios from "axios";

const url = 'http://localhost:3000/api/sauces';
console.log(url);

export default{
  data () {
    return {
      sauces: []
    }
  },
  mounted () {
    axios
      .get(url)
      .then(response => {
        this.sauces = response.data;
    console.log(response.data);
  }, error => {
    console.log(error);
  })
  },
}
 
</script>

<style scoped>
#sauces {
  color: #9F270D;
}
.sauces-list{
  color: black;
  font-size: 25px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
strong {
  margin-left: 10%;
  color: red;
  font-weight: 50;
}
    
</style>