<template>
  
     <v-container grid-list-md>
       <v-layout row wrap>
         <v-flex xs12>
            <v-card>
              <v-text-field
                name="name"
                type="number"
                label="label"
                v-model="inputMoney"              
                single-line
              ></v-text-field>
              <v-btn @click='updateMoney' color="success">Add money</v-btn>
              Total Money : {{totalMoney}}
            </v-card>
         </v-flex>
       </v-layout>
       
     </v-container>
 
</template>

<script>
  export default {
    data() {
      return {
        inputMoney:0       
      }
    },
    computed: {
      totalMoney() {
        return this.$store.getters.getMoney
      }
    },
    methods: {
      updateMoney() {
        this.$store.dispatch('updateMoney',parseInt(this.inputMoney))
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>