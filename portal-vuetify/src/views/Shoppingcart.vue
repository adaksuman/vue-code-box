<template> 



     <v-container grid-list-md text-xs-center>
      <v-layout row wrap>
      <v-toolbar>
          <v-toolbar-title>
        <span >Shopping card Example</span>
      </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>     
             <v-badge right>
                <template v-slot:badge>
                    <span>{{carts.length}}</span>
                </template>
                <v-btn icon :to="'/cart'">
                <v-icon
                    large
                    color="grey lighten-1"
                >
                    shopping_cart
                </v-icon>
                </v-btn>
                </v-badge>
                    </v-toolbar-items>
                </v-toolbar>
      </v-layout>

         <v-layout row wrap>  
             <v-flex xs4 v-for="item in items" :key="item.id">
              <v-card >
                <v-card-media
                    contain
                    height="200px"
                    :src="item.url"  
                >                    
                </v-card-media>
                <v-divider light ></v-divider>
                 <v-card-title primary-title>
                     <div>
                         <h3 class="headline mb-0">{{item.name}}</h3>
                         <div>{{item.description}}</div>
                         <div>No of Items : {{item.stock}}</div>
                         <div id="timer" class="timer">
                            <!--  Timer Component  -->
                            <Timer 
                                    starttime="April 30, 2019 18:25:25" 
                                    endtime="April 30, 2019 18:30:25" 
                                    trans='{  
                                    "day":"Day",
                                    "hours":"Hours",
                                    "minutes":"Minuts",
                                    "seconds":"Seconds",
                                    "expired":"Event has been expired.",
                                    "running":"Till the end of event.",
                                    "upcoming":"Till start of event.",
                                    "status": {
                                        "expired":"Expired",
                                        "running":"Running",
                                        "upcoming":"Future"
                                    }}'
                                    ></Timer>
                            <!--  End! Timer Component  -->
                            </div>
                     </div>
                 </v-card-title>
                 <v-card-actions>
                    <v-spacer></v-spacer>
                     <v-btn outline color="indigo" @click='addToCart(item)'>Add to cart</v-btn>
                 </v-card-actions>
             </v-card>
             </v-flex>           
            
         </v-layout>         
     </v-container>
</template>


<script>
import Timer from "@/components/Timer"
    export default {
        components:{
            Timer
        },
        data() {
            return {
                carts :[],
                campaign:{
                  campaign_id:"camp01",  
                  name:"deal100",  
                  start_time:"",
                  end_time:"",
                  exit_criteria: 10,
                  isDealCompleted:false,                  
                  users:[1,2]
                },
                items:[{
                    name:"item1",
                    description:"item description",
                    url:"https://via.placeholder.com/200/92c952",
                    stock:5,
                    retail_price: 100,
                    wholesale_price: 60,
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
        },

        methods: {
            addToCart(item) {
                this.carts.push(item);
                
            }
        },
        
    }
</script>

<style scoped>



</style>