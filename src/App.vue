<template>
  <div class="container my-3">
    <h4>To do list</h4>
    <hr>
    <div v-if="taskToUpdate.length > 0">
      <div class="input-group mb-3">
        <input type="text" v-model="taskToUpdate" class="form-control" placeholder="Add new task" />
        <button class="btn btn-success" type="button" @click="taskStore.updateTask(taskToUpdateObj.id)">Update</button>
      </div>
    </div>

    <div v-else>
      <FormKit type="form">
        <FormKit type="text" id="name" placeholder="Enter Your Task" />
        <button class="btn btn-success" type="button" @click="taskStore.addTask">Add</button>
      </FormKit>
      <span :class="msgStatus">{{ taskMsg }}</span>
    </div>

    <div v-for="(task, index) in tasks" :key="index" class="alert alert-success alert-dismissible fade show" role="alert">
      <span role="button" @click="taskStore.editTask(task.id)">{{ task.title }}</span>
      <button class="btn-close" aria-label="Close" @click="taskStore.deleteTask(task.id)"></button>
    </div>


  </div>
</template>
<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/task'

const taskStore = useTaskStore()
const { tasks,
  newTask,
  taskMsg,
  taskToUpdate,
  taskToUpdateObj,
  msgStatus } = storeToRefs(taskStore)




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