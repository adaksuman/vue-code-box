<template>

  <v-toolbar
    prominent
    tabs
  >
    <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      chips
      clearable
      prepend-icon="search"
      hide-details
      hide-selected
      item-text="name"
      item-value="symbol"
      :label="lebel"
      solo
      return-object
    >
      <template v-slot:no-data>
        <v-list-tile>
          <v-list-tile-title>
            Search for your favorite
            <strong>Sensors</strong>
          </v-list-tile-title>
        </v-list-tile>
      </template>
      <template v-slot:selection="{ item, selected }">
        <v-chip
          :selected="selected"
          color="blue-grey"
          class="white--text"
        >
          <v-icon left>mdi-coin</v-icon>
          <span v-text="item.name"></span>
        </v-chip>
      </template>
      <template v-slot:item="{ item }">
        <v-list-tile-avatar
          color="indigo"
          class="headline font-weight-light white--text"
        >
          {{ item.name.charAt(0) }}
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title v-text="item.name"></v-list-tile-title>
          <v-list-tile-sub-title v-text="'attributes:' + item.attributes"></v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>mdi-coin</v-icon>
        </v-list-tile-action>
      </template>
    </v-autocomplete>
    <template v-slot:extension>
      <v-tabs
        :hide-slider="!model"
        color="transparent"
        slider-color="blue-grey"
      >
        <v-tab :disabled="!model">View Details </v-tab>
        <v-tab :disabled="!model">Data in tabular</v-tab>
        <v-tab :disabled="!model">Show in Graph</v-tab>
      </v-tabs>
    </template>

    



  </v-toolbar>
</template>

<script>
import axios from 'axios'
  export default {
    data: () => ({
      isLoading: false,
      items: [],
      model: null,
      search: null,
      totalSensor: null,
      totalFeatures : null,
      lebel :null
    }),

    mounted()  {
        this.getCapabilities();
    },

    methods :{
     getCapabilities(){
            axios.get('https://in.tcupiot.com/api/sos/v2.0/capabilities',
        {headers:{'x-api-key': '4e506310aca4c9a1979e708d7c2ee07b4e3a4d8332af32250ec2fc1460d0e8bf'}})
         
          .then(res => {

              this.totalSensor = res.data.count.sensors;
              this.lebel = "Search from a total sensor" + this.totalSensor;

              for (const [key, value] of Object.entries(res.data.sensorOutput)) {
                     var item ={
                        name:"",
                        attributes:[]                 
                    }
                    item.name = key;
                    item.attributes = value;
                  //  console.log(key, value);
                     this.items.push(item);
              }           
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      }
    },

    watch: {      
      search (val) {
        // Items have already been loaded
        if (this.items.length > 0) return
        this.isLoading = true
         getCapabilities();
        
      }
    }
  }
</script>