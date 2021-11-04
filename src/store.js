import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        Models:[],
        ActiveModel: null
    },
    getters:{
        GetActiveModel:state=>(id) => {
            return state.Models.find(x=> x.id == id)
        }
    },
    mutations:{
        GetModels(state, payload){
            state.Models = payload
        },
        SetActiveModel(state, payload){
            if (state.ActiveModel != null) {
                state.ActiveModel.isActive = false
            }
            state.ActiveModel = payload
            state.ActiveModel.isActive = true;
            console.log('Data Was Set', state.ActiveModel)
        },
        DeleteModel(state, id){
            state.Models = state.Models.filter(x=>x.id != id)
        },
        CreateModel(state, model){
            state.Models.push(model)
        },
        UpdateModelBackground(state, payload){
            state.ActiveModel = {...state.ActiveModel, modelBackground:{...state.modelBackground = payload}}
        },
        UpdatePVT(state, payload){
            state.ActiveModel = {...state.ActiveModel, pvt:{...state.pvt = payload}}
        },
        UpdateIPR(state, payload){
            state.ActiveModel = {...state.ActiveModel, ipr:{...state.ipr = payload}}
        }
    },
    actions:{
        async GetData({commit}) {
            await axios.get(
              'https://localhost:44372/api/wellmodel'
            ).then(response=>{
                commit('GetModels', response.data)
            })
        },
        async DeleteModel({commit}, model){
          await axios.delete(`https://localhost:44372/api/wellmodel/${model.id}`)
          .then(response=> {
            console.log("Delete", response)
            if (response.status== 200) {
                commit('DeleteModel', model.id)
            }
          })
        },
        async UpdateModelBackground({commit}, modelBackground){
            await axios.put(`https://localhost:44372/api/ModelBackground`, modelBackground)
            .then(response=>{
                console.log("Update Model Background", response)
                if (response.status == 200) {
                    commit('UpdateModelBackground', modelBackground)
                }
            })
        },
        async UpdatePVT({commit}, pvt){
            await axios.put(`https://localhost:44372/api/pvt`, pvt)
            .then(response=>{
                console.log("PVT", response)
                if (response.status == 200) {
                    commit('UpdatePVT', pvt)
                }
            })
        },
        async UpdateIPR({commit}, ipr){
            await axios.put(`https://localhost:44372/api/ipr`, ipr)
            .then(response=>{
                console.log("IPR", response)
                if (response.status == 200) {
                    commit('UpdateIPR', ipr)
                }
            })
        },
        
    async CreateModel({commit}, payload){
        await axios.post('https://localhost:44372/api/wellmodel', payload)
        .then(response=> {
          console.log("Created", response)
          if (response.status == 200) {
            commit('CreateModel', response.data)
          }
        })
      }
    }
})