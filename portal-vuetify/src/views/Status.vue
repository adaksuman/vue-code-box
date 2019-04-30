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
            <v-btn color="blue" dark> {{service.status}}
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
          Updated at : {{udatedTime}}
         <v-spacer></v-spacer> 
           <v-btn flat><v-icon right>refresh</v-icon></v-btn>
       </v-card-actions>
     </v-card>
   </v-flex>
 </v-layout>
</v-container>
</template>


<script>
import axios from 'axios'
export default {
   data: () => ({
        udatedTime :null,
        services : [{
            name :"sos",
            url  : "https://in.tcupiot.com/api/sos/v2.0/v2/api-docs",
            api_version:null,
            status : null
        },
        { 
            name :"dm",
            url  : "https://in.tcupiot.com/api/db/v2.0/api-docs",
            api_version:null,
            status : null
        },
         { 
            name :"assetService",
            url  : "https://in.tcupiot.com/AssetService/api-docs",
            api_version:null,
            status : null
        },

        { 
            name :"pre-register",
            url  : " https://in.tcupiot.com/prs/v2/api-docs",
            api_version:null,
            status : null
        }

       

        ]
    }),

 created() {

    this.updateStatus();
  // this.getSoSStatus();
   // this.timer = setInterval(this.fetchEventsList, 300000)

},
methods: {

   async fetchStatusList() {

      let key ="4e506310aca4c9a1979e708d7c2ee07b4e3a4d8332af32250ec2fc1460d0e8bf" ;

      let reqList = []
      let resList = []
  
      for(let i = 0; i<this.services.length; i++) {
          let req = axios.get(this.services[i].url,{ headers: {'x-api-key':key}})  
          reqList.push(req)
          console.log(reqList)      }

      resList = await Promise.all(reqList);
    //  return axios.all(reqList).then(axios.spread(function(...resList) {
    //    Promise.all(reqList).then(function)
    this.udatedTime = Math.round(Date.now() / 10000)
          return resList
    // }))
    },
    
async updateStatus () {
      let serviceStatuses = await this.fetchStatusList()
      for(let i = 0; i< serviceStatuses.length; i++) {
    if (serviceStatuses[i] && serviceStatuses[i].status === 200) {
        this.services[i].status = "running"
        this.services[i].api_version = serviceStatuses[i].data.apiVersion || serviceStatuses[i].data.info.version

    } else {
         this.services[i].status = "stopped"
    }
      }
}
}
}
</script>
