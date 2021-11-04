import Vue from 'vue'
import VueRouter from 'vue-router'
import Model from './components/Model.vue'
import HelloWorld from './components/HelloWorld.vue'
import ModelBackground from './components/ModelBackground.vue'
import Edit from './components/EditView.vue'
import PVT from './components/PVT.vue'
import IPR from './components/IPR.vue'
Vue.use(VueRouter)
export default new VueRouter({
    linkExactActiveClass: "active",
    routes: [
        {
            path: "/:id",
            name: "model",
            component: Model,
        },
        {
            path: "/home",
            name: "home",
            component: HelloWorld
        },
        {
            path:"/model/:id/edit",
            name: "edit",
            component:Edit,
            children:[
                {
                    path:"/model/:id/edit/modelBackground",
                    name:"modelBackground",
                    component: ModelBackground
                },
                {
                    path:"/model/:id/edit/pvt",
                    name:"pvt",
                    component: PVT
                },
                {
                    path:"/model/:id/edit/ipr",
                    name:"ipr",
                    component: IPR
                },
            ]
        },
    ]
})