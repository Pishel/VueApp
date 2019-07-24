import Vue from 'vue'
import Router from 'vue-router'
import tasks from './components/tasks.vue'


Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            name:'tasks',
            component:tasks
        },
        
    ]
})