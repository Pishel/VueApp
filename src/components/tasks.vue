<template>
  <div class="container">
     <div class="title">To do:</div> 
    
    
    <div class="holder">
      <ul class="done_tasks">
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li v-for="(data, index) in done_tasks" :key='data.task'>          
            {{ data.task }}
            <i class="fa fa-window-close" v-on:click="remove_done(index)"></i>
            <input type="checkbox" class="check" checked v-on:click="moveto_down(index)">
            
          </li>
        </transition-group>
      </ul>
      <ul>
        <transition-group name="list" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
          <li v-for="(data, index) in tasks" :key='data.task'>          
            {{ data.task }}            
            <i class="fa fa-window-close" v-on:click="remove(index)"></i>
            <input type="checkbox" class="check" v-on:click="moveto_up(index)">
          </li>
        </transition-group>
      </ul>
      <form>
          <div style="overflow:hidden">
            <span class="task">Task</span>
            <input type="text" placeholder="What do you need to do" v-model="task" name="task" class="task_input" v-validate="'required|min:5'"><br/>
          </div>          
            <button class="add_button" v-on:click="addtask">Save Item</button>
          <!-- <input type="submit" class="add_button" value="Save Item"/> -->
          <transition name="alert-in" enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
          <p class="alert" v-if="errors.has('task')">{{errors.first('task')}}</p>  
          </transition>          
    </form>      
    </div>
  </div>
</template>

<script>
export default {
  name: 'tasks',  
  data(){
    return {            
      tasks:[
        {"task":"Go to Work"}        
      ],
      done_tasks:[
        {"task":"Wake Up"},
        {"task":"Eat Breakfast"}
      ],
      task:'',
      showAlert:false
    }
  },
  methods:{
    addtask(){        
      this.$validator.validateAll().then((result) => {
        if (result){               
          this.tasks.push({task:this.task});
          this.task = '';      
        } else{
          console.log("Not valid");
        }
      })            
    },
    moveto_down(id){        
        this.tasks.push({task:this.done_tasks[id].task});
        this.done_tasks.splice(id,1);
    },
    moveto_up(id){
        this.done_tasks.push({task:this.tasks[id].task});
        this.tasks.splice(id,1);
    },
    remove(id){        
      this.tasks.splice(id,1);
    },
    remove_done(id){
      this.done_tasks.splice(id,1);
    }

  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src = "./tasks.css" scoped>  
</style>
