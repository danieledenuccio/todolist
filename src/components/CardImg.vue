<template>
    <v-card
      class="mx-auto"
      max-width="400"
      max-height="700"
    >
      <v-img
        class="align-end text-white"
        height="300"
        :src="link"
        alt="Image"
        >
    </v-img>
    <v-card-title>{{ title }}</v-card-title>
  
      <v-card-subtitle class="pt-4">
        {{month}}/{{day}}/{{year}}
      </v-card-subtitle>
  
      <v-card-text>
        <div>{{ alt }}</div>
        <div>{{ number }}</div>
      </v-card-text>
  

    </v-card>
  </template>

<script>
    export default{
            name: 'CardImg',
            props: {
                link: String,
                day: String,
                month: String,
                year: String,
                number: Number,
                title: String,
                alt: String,

            },
            
    }
</script>