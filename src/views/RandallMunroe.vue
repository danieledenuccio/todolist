<template>
  <v-card
    class="mx-auto my-12"
    max-width="400"
    max-height="700"
  >    <CardImg 
            :link="items.linkImg" 
            :title="items.title"
            :alt="items.alt"
            :day="items.day"
            :month="items.month"
            :year="items.year"
            :number="items.number"
            />
        <v-card-actions class="px-4">
            <v-icon 
            @click="go(-1)"
            x-large>mdi mdi-arrow-left-circle-outline</v-icon>
            <v-icon 
            @click="go(1)"
            x-large>mdi mdi-arrow-right-circle-outline</v-icon>
        </v-card-actions>
    </v-card>

</template>
<style>
    
</style>
<script>
    import CardImg from '../components/CardImg.vue'
    import axios from 'axios';

   export default{
    components: {
        CardImg,
       },
       data() {
        return{
            items: {
                day: '',
                month: '',
                year: '',
                number: null,
                title: '',
                linkImg: '',
                alt: ''
                },
            num: 100,
            
        }
       },
     created() {
       this.fetchData(this.num)
    },
      methods: {
         async fetchData(page) {
            // Esegui una richiesta GET utilizzando Axios
            await axios.get(`https://xkcd.com/${page}/info.0.json`)
            .then(res => {
                this.items.day = res.data.day;
                this.items.month = res.data.month;
                this.items.year = res.data.year;
                this.items.number = res.data.num;
                this.items.title = res.data.safe_title;
                this.items.linkImg = res.data.img;
                this.items.alt = res.data.alt;
            })
            },
            go(data){
                this.num += data;
                console.log(this.num)
                this.fetchData(this.num)

            } 
      },

    }
</script>