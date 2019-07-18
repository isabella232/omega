// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import ElementUI from 'element-ui'
import router from './router'
import createStore from './store'
import VueApexCharts from 'vue-apexcharts'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.css'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(ElementUI)

Vue.component('apexchart', VueApexCharts)

// Load all components
const reqComponents = require.context('./components/', true, /\.(js|vue)$/i);
reqComponents.keys().map(key => {
    const name = key.match(/\w+/)[0];
    return Vue.component(name, reqComponents(key).default)
});

// Load filter
const reqFilters = require.context('./filters/', true, /\.(js)$/i);
reqFilters.keys().map(key => {
    const name = key.match(/\w+/)[0];    
    return Vue.filter(name, reqFilters(key).default)
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store: createStore(router),
    render: h => h(App),
    components: { App },
    template: '<App/>'
})