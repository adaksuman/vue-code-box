import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import router from '@/router';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    money: 0,
    showLoader: false,
    sessionTimeout : 10,
    deadline : null,
    user: null,
    token: localStorage.getItem('isAuthenticated') || false,
    services : [{
      name :"sos",
      url  : "https://in.tcupiot.com/api/sos1/v2.0/v2/api-docs",
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
  }]
  },
  getters: {
    getServiceStatus: state => {
      return state.services;
    },
    getMoney: state => {
      return state.money;
  },

   isAuthenticated: state => {
     return state.token;
  },
  getSessionTimeout : state => state.sessionTimeout,
  getDeadLine : state => state.deadline

  },

  actions: {
    getStatusUpdate({commit}) {
      commit('updateServiceStatus');
    },
    updateMoney({commit}, payload) {
      commit('updateMoney', payload);
    },
      
    userLogin({commit},{email,password}){
      commit('userLogin',{email,password});
    },
    userSignOut({commit}){
      commit('userSignOut');
    }  
  },  

  mutations: {

    updateDeadline(state,deadline){
      state.deadline = deadline
    },

    async userLogin(state,{email,password}){

      var loginUrl = "https://in.tcupiot.com/"
      try {
      //  let response = await axios(loginUrl,{"username":email,"password":password});
      let user = {"name":"suman"};
        state.user = user;
        state.token = true;
        localStorage.setItem('isAuthenticated',state.token);
       /* set the session timer */

     
    var currentTime = new Date();
    var deadline = new Date(currentTime + state.sessionTimeout*60*1000);
    console.log("deadline in store ", deadline)
    state.deadline = deadline;
        router.push('/about');
      } catch (error) {
        state.user = null;
        state.token = false;
        localStorage.setItem('isAuthenticated',state.token);
        router.push('/login');
      }

    },

    userSignOut(state) {
      state.user = null;
      state.token = false;
      localStorage.removeItem('isAuthenticated');
      router.push('/');
  }, 


    updateMoney(state, payload) {
      state.money = state.money + payload;
  },
   async updateServiceStatus(state) {
      let key ="4e506310aca4c9a1979e708d7c2ee07b4e3a4d8332af32250ec2fc1460d0e8bf" ;

      let reqList = []
      let resList = []
      let services = state.services;
  
      for(let i = 0; i<services.length; i++) {
          let req = axios.get(services[i].url,{ headers: {'x-api-key':key}})  
          reqList.push(req)
          console.log(reqList)      }

      //resList = await Promise.all(reqList);
      resList = await Promise.all(reqList.map(p => p.catch(e => e)));
     
         this.udatedTime = Math.round(Date.now() / 10000)       
    
           for(let i = 0; i< resList.length; i++) {
            if (resList[i] && resList[i].status === 200) {
              services[i].status = "running" 
              services[i].api_version = resList[i].data.apiVersion || resList[i].data.info.version
            } else {
              services[i].status = "stopped"
            }
           
          }

     state.services = services;
    }
  }
});



