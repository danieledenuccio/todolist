<template>
  <div class="taskList">
    <h2>List of Tasks goes here</h2>
    <v-data-table :headers="headers" :items="tasks" class="elevation-1" item-value="description">
      <template v-slot:item="{ item }">
        <tr>
          <td class="description" v-bind:class="{ 'completed': item.completed }">
            {{ item.description }}
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
              <v-btn  @click='editTask(item.id, item.description)' color="primary" title="Edit">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </td>
        <td>
            <v-btn @click="deleteTask(item.id)" color="error" title="Delete">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn v-if="!item.completed" @click='updateTaskValore(item.id)' color="success" title="Completed">
                <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn v-else @click="toggleStoredStatus(item.id)" color="success" title="Mark as stored">
              <v-icon>mdi-check-all</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>


<script>
import { store } from '@/store';
import { db } from '../firebase.js'

const tasksCollection = db.collection('tasks');  
const callMyDb = (taskID, insideFunction) => {
    tasksCollection.doc(taskID).get()
    .then(insideFunction)
    .catch(error => {console.log('Error getting document: ', error)});
}
export default{
    data() {
        return {
      tasks: [], // Inizializza un array per contenere i dati delle attività
      headers: [
        { text: 'Description', value: 'description', sortable: false },
        //non riuscivo a trovare un modo in vuetify per mettere spazio così ho usato un po di "inventiva"
        { text: '', value: '', sortable: false },
        { text: '', value: '', sortable: false },
        { text: '', value: '', sortable: false },
        { text: '', value: '', sortable: false },
        { text: '', value: '', sortable: false },
        { text: '', value: '', sortable: false },
        { text: '', value: '', sortable: false },
        { text: 'Edit', value: 'edit', sortable: false },
        { text: 'Delete', value: 'delete', sortable: false },
        { text: 'Completed', value: 'completed', sortable: false },
      ],    
    } 
    },
    created() {
        tasksCollection.orderBy('creationTime','asc').onSnapshot(snapshot => {
        this.tasks = []; // Cancella l'array esistente
        snapshot.forEach((doc) => {
        // Itera sui documenti e aggiungi al tuo array
        if(!doc.data().stored){
            this.tasks.push({
                id: doc.id,
                ...doc.data(),
            });
        }
      }); 
    })
    },
    methods: {
        editTask(taskID, description){
            if(!store.state.isEdited){
                store.state.isEdited = true;
            }
            store.commit('setTaskID', taskID);
            store.commit('setSharedData', description);   
            console.log(store.state.sharedData)
        }        
        ,
        toggleStoredStatus(taskID) {
            callMyDb(taskID,(
                doc => {
                    doc.ref.update({
                        stored: !doc.data().stored,
                    })
                }))

        },
        deleteTask(taskID) {
            callMyDb(taskID,(
            doc => {
                if(doc.exists){
                    doc.ref.delete().then(() => {
                        store.state.isEdited = false;
                        console.log('Document deleted successfully!')})
                    .catch(error => {console.log('Deletion unsuccessful: ', error)})
             }else{
                console.log('No such document!')
            }
        }))
    },
    updateTaskValore(taskID) {
        if(window.confirm("Do you want to mark the task as completed?")){
            console.log("Yes")
            callMyDb(taskID,(
              doc => {
                if(doc.exists){
                    doc.ref.update({
                            completed: !doc.data().completed,
                    })
                    .then(() => {
                        console.log('Completion status of task has been successfully update!')
                    }).catch(error => {{
                        console.log('Error updating completition status: ', error)
                    }})
                }else{
                    console.log('No such document!');
                }
            }))
        }else{
            console.log("no")
        }
    },
  }
}
</script>