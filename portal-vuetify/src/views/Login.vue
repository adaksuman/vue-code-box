  <template>
         <v-container fluid fill-height>
                       <v-layout align-center justify-center>
                           <v-flex xs12 sm8 md4>
                               <v-card class="elevation-12">
                                   <v-toolbar dark color="blue">
                                       <v-toolbar-title>Login form</v-toolbar-title>
                                    
                                   </v-toolbar>
                                   <v-card-text>
                                       <v-form ref="form" v-model="valid" lazy-validation>
                                           <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="email" required></v-text-field>
                                           <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="password" :rules="passwordRules" required></v-text-field>
                                       </v-form>
                                   </v-card-text>
                                   <v-card-actions>
                                       <v-spacer></v-spacer>
                                       <v-btn color="primary" :disabled="!valid" @click="submit">Login</v-btn>
                                   </v-card-actions>
                               </v-card>
                           </v-flex>
                       </v-layout>
                   </v-container>             
       </template>
       
       <script>
           export default {
               data: () => ({
                  valid: false,
        email: '',
        password: '',
        emailRules: [
           v => !!v || 'E-mail is required',
           v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
       ],    
        passwordRules: [
            v => !!v || 'Password is required',
            v =>
                v.length >= 6 ||
                'Password must be greater than 6 characters'
        ]
               }),

    methods: {
     submit() {
        if (this.$refs.form.validate()) {
            this.$store.dispatch('userLogin', {
                email: this.email,
                password: this.password
            });
        }
    }
}       
               
           }
       </script>
    