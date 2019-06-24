// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import VueApexCharts from 'vue-apexcharts'
import './assets/css/style.css'



Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.component('apexchart', VueApexCharts)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App),
    components: { App },
    template: '<App/>'
})