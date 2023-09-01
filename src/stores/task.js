import { defineStore } from 'pinia'
import { computed, ref } from 'vue'


export const useTaskStore = defineStore('task', () => {

    // states
    const tasks = ref([])
    const taskToUpdateObj = ref({});
    const taskToUpdate = ref('')

    // handling api
    // read tasks
    const readTasks = () => {
        fetch('http://127.0.0.1:8000/api/tasks')
            .then(res => res.json())
            .then(data => {
                tasks.value = data.tasks
            })
            .catch(err => console.log(err))
    }
    readTasks()

    // create tasks
    const addTask = (fromdata) => {
        
        fetch('http://127.0.0.1:8000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fromdata)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status !== 'passes') {
                    taskMsg.value = data.title[0]
                } else {
                    tasks.value.push(fromdata)
                }
            })
            .catch(err => console.log(err)) 
    }


    const editTask = (id) => {
        tasks.value.map((task) => {
            if (task.id == id) {
                taskToUpdateObj.value = task
                taskToUpdate.value = task.title
            }
        })
    }

    const updateTask = (id) => {
        // console.log(id)
        tasks.value = tasks.value.map((task) => {
            if (task.id === id) {
                return { ...task, id: id, title: taskToUpdate.value }
            }
            // taskToUpdate.value = ''
            return task
        })
        taskToUpdate.value = ''
    }

    const deleteTask = (id) => {
        console.log(id)
        tasks.value = tasks.value.filter((task) => {
            return task.id != id
        })
    }
    

    return { 
        tasks, 
        taskToUpdate, 
        taskToUpdateObj, 
        readTasks,
        addTask,
        editTask,
        updateTask,
        deleteTask,  
    }
})