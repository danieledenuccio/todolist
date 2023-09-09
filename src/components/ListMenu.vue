<template>
          <v-list-item>
          <v-list-item-icon>
            <v-icon> {{ icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ title }}
            </v-list-item-content>
          </v-list-item>
</template>

<script>
    export default{
        name: 'ListMenu',
        props: {
          title: String,
          icon:  String,
        }
    }
</script>