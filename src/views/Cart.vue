<template>
   <v-container grid-list-md>
      <v-layout row wrap>
          <v-flex xs12>
              <v-data-table
                  :items="items"
                  class="elevation-1"                 
              >
                  <template slot="items" slot-scope="props">
                      <td>{{ props.item.id }}</td>
                      <td class="text-xs-right">{{ props.item.name }}</td>
                      <td class="text-xs-right">{{ props.item.desc }}</td>                    
                  </template>
              </v-data-table>
          </v-flex>
      </v-layout>     
   </v-container>
</template>

<script>
    export default {
data() {
    return {
         items:[{
                    name:"item1",
                    description:"item description",
                    url:"https://via.placeholder.com/200/92c952",
                    stock:5,
                    id:1
                },
                {
                    name:"item2",
                    description:"item description",
                    url:"https://via.placeholder.com/200/771796",
                    stock:5,
                    id:2
                },
                {
                    name:"item3",
                    description:"item description",
                    url:"https://via.placeholder.com/200/24f355",
                    stock:5,
                    id:3
                }]
            }
}
    }
  
</script>

<style lang="scss" scoped>

</style>
