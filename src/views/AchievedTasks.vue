<template>
  <div>

    <div class="achieved">
      <h1>These are the Achieved Tasks:</h1>
    <v-form class="d-flex">
    <v-text-field
      :counter="10"
      label="Insert a Tasks name or a Username:"
      v-model="searchQuery"
      @keyup="search"
    ></v-text-field>
      <v-select
      v-model="selectedItem"
      :items="items"
      label="Select the Username"
      @change = "handleSelectChange"
    ></v-select>
    </v-form>
  </div>
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
          <td></td>
          <td></td>
          <td class="username" v-bind:class="{ 'username': item.user }">
            {{ item.user }}</td>
          <td></td>
        </tr>
      </template>
    </v-data-table>
  </div>
  </template>
<script>
import { db } from '@/firebase'
const tasksCollection = db.collection('tasks');  
const callMyDb = (taskID, insideFunction) => {
    tasksCollection.doc(taskID).get()
    .then(insideFunction)
    .catch(error => {console.log('Error getting document: ', error)});
}
console.log(callMyDb)
const userCollection = db.collection('users');  

export default{
    data(){
      return{
        searchQuery: "",
        count: 0,
        items: [],
        selectedItem: null,
        tasks: [],
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
        { text: '', value: '', sortable: false },
        { text: '', value: '', sortable: false },
        { text: 'Username', value: 'user', sortable: false },
        { text: '', value: '', sortable: false },
      ],


      }
    },
    created() {
      userCollection.onSnapshot(snapshot => {
        this.items = [
          'Nessuno Selezionato'
        ]; // Cancella l'array esistente
        snapshot.forEach(doc => {
        // Itera sui documenti e aggiungi al tuo array
            console.log(doc.data().name)
            this.items.push(
               doc.data().name,
            );
      }); 
      console.log(this.items[1].name)
    })
    tasksCollection.orderBy('creationTime','asc').onSnapshot(snapshot => {
        this.tasks = []; // Cancella l'array esistente
        snapshot.forEach((doc) => {
        // Itera sui documenti e aggiungi al tuo array
        if(doc.data().stored){
            this.tasks.push({
                id: doc.id,
                ...doc.data(),
            });
        }
      }); 
    })
    },
    methods: {
      search() {
        console.log(this.searchQuery)
        tasksCollection.orderBy('creationTime','asc').onSnapshot(snapshot => {
        this.tasks = []; // Cancella l'array esistente
        snapshot.forEach((doc) => {
        // Itera sui documenti e aggiungi al tuo array
        if(doc.data().stored && (
          doc.data().user.toLowerCase().startsWith(this.searchQuery.toLowerCase()) ||
          doc.data().description.toLowerCase().startsWith(this.searchQuery.toLowerCase()))){
            this.tasks.push({
                id: doc.id,
                ...doc.data(),
            });
          }
         }); 
        })
        // return this.tasks = [{description: 'Eat', completed: true, stored:true,user: 'Daniele', creationTime: 1694255888313}];
      },
      handleSelectChange() {
        // Gestisci l'evento di cambio selezione qui
      console.log(this.count)
      console.log("Elemento selezionato:", this.selectedItem);
        this.count = 0;
        tasksCollection.orderBy('creationTime','asc').onSnapshot(snapshot => {
        this.tasks = []; // Cancella l'array esistente
        snapshot.forEach((doc) => {
        // Itera sui documenti e aggiungi al tuo array
        if(doc.data().stored && doc.data().user=== this.selectedItem){
            this.tasks.push({
                id: doc.id,
                ...doc.data(),
            });
          }
         }); 
       });
     },
    }
  }

</script>