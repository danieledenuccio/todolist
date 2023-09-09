<template>

<v-container class="app-container mt-3">
    <v-row justify="center">
      <v-col cols="8">
        <v-card class="border">
          <NewTaskForm />
          <TasksList />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </template>

<script>
  import NewTaskForm from '@/components/NewTaskForm.vue';
  import TasksList from '@/components/TasksList.vue';
export default {
  name: 'TodoList',
  components: {
    NewTaskForm,
    TasksList,
  }
}
  
</script>