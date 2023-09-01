import { defineStore } from 'pinia'
import { computed, ref } from 'vue'


export const useTaskStore = defineStore('task', () => {

    // states
    const tasks = ref([])
    const newTask = ref('')
    const taskMsg = ref('')
    const taskToUpdateObj = ref({});
    const taskToUpdate = ref('')
    const msgStatus = ref('')

    // actions
    const taskInput = () => {
        if (newTask.value.length < 1) {
            taskMsg.value = 'the task field is required'
            msgStatus.value = 'text-danger'
        } else if (newTask.value.length < 3) {
            taskMsg.value = 'at least 3 character'
            msgStatus.value = 'text-warning'
        } else {
            taskMsg.value = 'Great'
            msgStatus.value = 'text-success'
        }
    }

    // handling api
    // read tasks
    const readTasks = () => {
        fetch('http://blog.test/api/tasks')
            .then(res => res.json())
            .then(data => {
                tasks.value = data.tasks
            })
            .catch(err => console.log(err))
    }
    readTasks()

    // create tasks
    const addTask = () => {
        const task = { "title": newTask.value }

        fetch('http://blog.test/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status !== 'passes') {
                    taskMsg.value = data.title[0]
                } else {
                    tasks.value.push(task)
                }
            })
            .catch(err => console.log(err))

        // const task = { id: Math.floor(Math.random() * 1000), title: newTask.value }
        newTask.value = ''
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
        newTask, 
        taskMsg, 
        taskToUpdate, 
        taskToUpdateObj, 
        msgStatus, 
        taskInput,
        readTasks,
        addTask,
        editTask,
        updateTask,
        deleteTask,  
    }
})