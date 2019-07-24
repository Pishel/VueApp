<template>
  <div class="container">
     <div class="title">To do:</div> 
    
    
    <div class="holder">
      <ul class="done_tasks">
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li v-for="(data, index) in done_skills" :key='data.skill'>          
            {{ data.skill }}
            <i class="fa fa-window-close" v-on:click="remove(index)"></i>
            <input type="checkbox" class="check" checked v-on:click="moveto_down(index)">
            
          </li>
        </transition-group>
      </ul>
      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li v-for="(data, index) in skills" :key='data.skill'>          
            {{ data.skill }}            
            <i class="fa fa-window-close" v-on:click="remove(index)"></i>
            <input type="checkbox" class="check" v-on:click="moveto_up(index)">
          </li>
        </transition-group>
      </ul>
      <form>
          <div style="overflow:hidden">
            <span class="task">Task</span>
            <input type="text" placeholder="What do you need to do" v-model="skill" name="skill" class="task_input"><br/>
          </div>          
            <button class="add_button" v-on:click="addskill">Save Item</button>
          
          <transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
          <!--p class="alert" v-if="errors.has('skill')">{{errors.first('skill')}}</p-->  
          </transition>          
    </form>      
    </div>
  </div>
</template>

<script>
export default {
  name: 'skills',  
  data(){
    return {            
      skills:[
        {"skill":"Go to Work"}        
      ],
      done_skills:[
        {"skill":"Wake Up"},
        {"skill":"Eat Breakfast"}
      ],
      skill:'',
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
    moveto_down(id){        
        this.skills.push({skill:this.done_skills[id].skill});
        this.done_skills.splice(id,1);
    },
    moveto_up(id){
        this.done_skills.push({skill:this.skills[id].skill});
        this.skills.splice(id,1);
    },
    remove(id){        
      this.skills.splice(id,1);
    }
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src = "./tasks.css" scoped>  
</style>
