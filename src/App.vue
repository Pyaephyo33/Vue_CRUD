<template>
  <div class="container my-3">
    <h4>To do list</h4>
    <div class="input-group mb-3">
      <input type="text" v-model="newTask" @input="taskInput" class="form-control" placeholder="Add new task" />
      <button class="btn btn-success" type="button" @click="addTask">Add</button>
    </div>
    <span :class="msgStatus">{{ taskMsg }}</span>

    <div v-for="(task,index) in tasks" :key="index" @click="editTask(task.id)" class="alert alert-success alert-dismissible fade show" role="alert">
      <span>{{ task.title }}</span>
      <button class="btn-close" aria-label="Close" @click="deleteTask(task.id)"></button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

  const tasks = ref([
    {id: 1, title: 'wake up'},
    {id: 2, title: 'wash face'},
    {id: 3, title: 'have breakfast'},
  ])
  const newTask = ref('')
  const taskMsg = ref('')
  const msgStatus = ref('')

  const taskInput = () => {
    if(task.value.length < 1){
      taskMsg.value = 'the task field is required'
      msgStatus.value = 'text-danger'
    } else if(task.value.length < 3){
      taskMsg.value = 'at least 3 character'
      msgStatus.value = 'text-warning'
    } else {
      taskMsg.value = 'Great'
      msgStatus.value = 'text-success'
    }
  }


const addTask = () => {
  const task = {id: Math.floor(Math.random() * 1000) , title: newTask.value}
  tasks.value.push(task)
  newTask.value = ''
}

// const editTask = (id) => {
//   console.log(id)
//   const editTask = tasks.value.map((task)=>)
// }

const deleteTask = (id) => {
  console.log(id)
  tasks.value = tasks.value.filter((task) => {
    return task.id != id
  })
}
</script>

<style scoped>
.required {
  color: red;
}
.atleast3 {
  color: orange;
}
.required {
  color: red;
}
</style>