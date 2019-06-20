import Vue from 'vue'
import Router from 'vue-router'
import Area from '@/components/Area'
import Overview from '@/components/Overview'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'Overview',
        component: Overview
    },
    {
        path: '/area/:areaId',
        name: 'Area',
        component: Area
    }
    ]
})