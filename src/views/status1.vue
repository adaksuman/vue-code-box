<template>
<v-container grid-list-md fluid>
 <v-layout row wrap>
   <v-flex pa-2 md4  v-for="service in services" :key="service.name">
     <v-card class="black--text" height="200">        
       <v-layout row>
         <v-flex xs6>
           <v-card-title primary-title>
         <div>
           <h3 class="headline mb-0">{{service.name}}</h3>
         </div> 
           </v-card-title>           
         </v-flex>
         <v-flex xs6>
          <div v-if="service.status === 'running'">
          <v-btn color="blue" dark> {{service.status}}
              <v-icon dark right>check_circle</v-icon>
          </v-btn>
          </div>
          <div v-else-if="service.status === 'stopped'">
            <v-btn color="red" dark> {{service.status}}
              <v-icon dark right>cancel</v-icon>
          </v-btn>
          </div>
         </v-flex> 
       </v-layout>
       
       <v-layout row wrap>        
           <v-flex xs12>
             <div>API version : {{service.api_version}}</div>  
         </v-flex>
       </v-layout> 
       <v-divider light></v-divider>
       
       <v-card-actions class="pa-3">
          Updated at : {{ totalMoney  }}
         <v-spacer></v-spacer> 
           <v-btn flat><v-icon right>refresh</v-icon></v-btn>
       </v-card-actions>
     </v-card>
   </v-flex>
 </v-layout>
</v-container>
</template>


<script>
export default {
   data: () => ({
        udatedTime :null,  
        totalMoney : 0,     
        services :[]
    }),

 created() {
    this.getStatusUpdate();
    this.services = this.$store.getters.getServiceStatus
    this.totalMoney = this.$store.getters.getMoney
  },
methods: {
  getStatusUpdate() {
    this.$store.dispatch('getStatusUpdate')
  }
}
}
</script>

