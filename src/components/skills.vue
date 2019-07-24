<template>
  <div class="container">
    <form @submit.prevent="addskill">
      <input type="text" placeholder="Enter a skill you have.." v-model="skill" name="skill" v-validate="'min:5'">
      
      <transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
        <p class="alert" v-if="errors.has('skill')">{{errors.first('skill')}}</p>  
      </transition>          
    </form>
    {{ skill }}
    <div class="holder">
      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li v-for="data in skills" :key='data.skill'>
            {{ data.skill }}
            <i class="fa fa-minus-circle" v-on:click="remove(data.index)"></i>
          </li>
        </transition-group>
      </ul>
      <p>These are the skills that you possess.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'skills',  
  data(){
    return {      
      skill:'',
      skills:[
        {"skill":"Vue.js"},
        {"skill":"Frontend Developer"}
      ],
      showAlert:false
    }
  },
  methods:{
    addskill(){
      this.$validator.validateAll().then((result) => {
        if (result){
          this.skills.push({skill:this.skill});
          this.skill = '';      
        } else{
          console.log("Not valid");
        }
      })            
    },
    remove(id){
      this.skills.splice(id,1);
    }
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src = "./skills.css" scoped>  
</style>
