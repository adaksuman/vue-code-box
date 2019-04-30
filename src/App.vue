
</<template>
  <v-app id="inspire">
    <v-navigation-drawer v-show="isAuthenticated"
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      width="230"
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="item.heading"
          >
            <v-flex xs4>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs4 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.text"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              :to="child.link"
              @click=""
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="" :key="item.text" :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content >
              <v-list-tile-title>
                {{ item.text }} 
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="blue darken-3"
      dark
      app
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon  v-show="isAuthenticated" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Vue Code Sandbox</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
            <div v-if="!isAuthenticated" class="hidden-sm-and-down">
                <v-btn flat to="/login">SIGN IN</v-btn>                
            </div>
            <v-btn v-else outline color="white" @click="logout">Logout</v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid >
        <v-layout justify-center >
          <v-fade-transition mode="out-in">
           <router-view ></router-view>
          </v-fade-transition>         
        </v-layout>
      </v-container>
    </v-content> 
    </v-app>  
</template>

<script>
export default {
   data: () => ({
      dialog: false,
      drawer: null,      
      items: [
        { icon: 'contacts', text: 'Sensors',link:'/sos' },
        { icon: 'history', text: 'Tasks',link:'/sos2' },
        { icon: 'content_copy', text: 'Status',link:'/status' },
         { icon: 'content_copy', text: 'shopping cart',link:'/shopping' },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Devices',
          model: true,
          children: [
            { icon: 'add', text: 'Create Device',link:'/about' }
          ]
        },
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'More',
          model: false,
          children: [
            { text: 'Import' },
            { text: 'Export' },
            { text: 'Print' },
            { text: 'Undo changes' },
            { text: 'Other contacts' }
          ]
        }
      ]
    }),
     computed: {
        isAuthenticated() {
          console.log(this.$store.getters.isAuthenticated);
           return this.$store.getters.isAuthenticated;
          // return localStorage.getItem("isAuthenticated")
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('userSignOut');
        }
    }
}
</script>



