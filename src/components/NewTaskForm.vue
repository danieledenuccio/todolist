<template>
      <v-container class="newTaskForm">
            <h1>Create New Task</h1>
            <v-form v-if="isEdited()" @submit.prevent="createNewTask">
                <v-text-field 
                  v-model="newTask.description"
                  label="Task Description"
                  placeholder="Add new task description"
                  required
                  ></v-text-field>
                  <v-btn color="warning" type="submit" elevated>Create Task</v-btn>
                </v-form>
              <v-form v-else @submit.prevent="editTask">
                <v-text-field 
                  v-model="newTask.description"
                  v-bind:label="sharedData"
                  required
                  ></v-text-field>
                  <v-btn class="mr-4" color="warning" type="submit" elevated>Edit Task</v-btn>
                  <v-btn  @click="stopEdit()" color="warning" outlined>Cancel Edit</v-btn>
              </v-form>
      </v-container>
  </template>
  <script>
import { db } from '../firebase.js';
import { store } from '@/store';

const tasksCollection = db.collection('tasks');
  export default {
    data() {
      return {
        newTask: {
          creationTime: null,
          description: '',
          completed: false,
          stored: false,
          user: null,
        },
        sharedData: store.state.sharedData,
      };
    },
    computed: {

    },
    methods: {
      editTask(){
        console.log(this.newTask.description, " YEEEE")
        tasksCollection
          .doc(store.state.taskID)
          .get()
          .then(
          doc => {
            if(doc.exists){
              doc.ref.update({
                description: this.newTask.description,
              })
              .then(() => {
                        console.log('Completion status of task has been successfully update!')
                        this.newTask.description = ''
                        store.state.isEdited = !store.state.isEdited
                      }).catch(error => {{
                        console.log('Error updating completition status: ', error)
                    }})
                }else{
                  console.log('No such document!');
                }
              })
      },
      isEdited() {
          console.log("OK")
          this.sharedData = store.state.sharedData;
          return !store.state.isEdited;
      },
      stopEdit(){
        this.newTask.description=""
        store.state.isEdited = false
      },
      createNewTask() {
          if(this.newTask.description.trim()!== ''){
              tasksCollection
            .add({
                ...this.newTask,
                creationTime: Date.now(), 
                user: store.getters.StateUser, 
              })
            .then(() => {
              console.log("FATTAAAAAAAAAA")
              this.newTask.description = '';
              console.log(db.collection('tasks'))
            })
            .catch((error) => {
              console.log("NON FATTAAAAAAAAAA")
            console.error("Error creating new task:", error);
            // Gestisci l'errore qui, ad esempio mostrando un messaggio all'utente
          });
        }else{
          console.log("Nun se po fa")
            }
            this.newTask.description=''
          }
    },
  };
  </script>