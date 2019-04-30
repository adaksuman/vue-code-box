import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from './store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import( './views/About.vue'),
      meta: {
        authRequired: true
    }
    },
    {
      path: '/sos',
      name: 'sos',
      component: () => import('./views/SOS.vue'),
      meta: {
        authRequired: true
    }
    },
    {
      path: '/sos2',
      name: 'sos2',
      component: () => import('./views/SOS2.vue'),
      meta: {
        authRequired: true
    }
    },
    {
      path: '/status',
      name: 'status',
      component: () => import( './views/status1.vue'),
      meta: {
        authRequired: true
    }
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: () => import('./views/Shoppingcart.vue'),
      meta: {
        authRequired: true
    }
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('./views/Cart.vue'),
      meta: {
        authRequired: true
    }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')      
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('./views/test.vue'),
      meta:{
        authRequired : true
      }
    }

  ]  
})

router.beforeEach((to, from, next) => {

  var deadline = store.getters.getDeadLine;
  var sessionTimeOut = store.getters.getSessionTimeout;
  var currentTime = Date.parse(new Date());
  console.log("deadline",deadline);
  console.log("currentTime",new Date());
  console.log("sessionTimeOut",sessionTimeOut);

  var t = Date.parse(deadline) - currentTime;
  console.log('t',t)
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  console.log("seconds",minutes);

  if(minutes < sessionTimeOut ){
   //  store.commit('userSignOut');
   //  router.push('/login')
     next()
  } else {
    var currentTime = Date.parse(new Date());
    var deadline = new Date(currentTime + sessionTimeOut*60*1000);
    store.commit('updateDeadline',deadline);
  }

  if (store.getters.isAuthenticated && to.fullPath ==='/login' ) {
    router.go(-1);
    //router.push('/about')
   //  router.push(from.fullPath);
   next();
  }
  if (to.matched.some(record => record.meta.authRequired)) {
      
      if (!store.getters.isAuthenticated) {
          next({
              path: '/login'
          });
        }else {
          next();
      }
      
  } else {
      next();
  }
});

export default router;
