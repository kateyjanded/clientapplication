<template>
    <div class="modelBackground m-5 w-75 justify-self-center  " >
        <header>Model Background</header>
        <form action="" class="modelBackgroundForm row px-5 py-3">
            <div class="input-groups m-2">
                <label for="" >Description:</label>
                <textarea class="form-control" placeholder="Description" v-model="model.description"/>
            </div>
            <div class="m-2">
                <label for="">Fluid Type:</label>
                <select class="w-50 val w-50" v-model="model.fluidType" aria-placeholder="Select Fluid Type"  >
                    <option  v-for="fluidtype in fluidType" v-bind:key="fluidtype">{{fluidtype}}</option>
                </select>
            </div>
            <div class="m-2">
                <label for="">Well Type:</label>
                <select class="val w-50" v-model="model.wellType" @change="OyaChange" >
                    <option  v-for="fluidtype in fluidType" v-bind:key="fluidtype">{{fluidtype}}</option>
                </select>
            </div>
            <div class="m-2">
                <label for="">Flow Type:</label>
                <select class="val w-50" v-model="model.flowType" >
                    <option v-for="flowtype in flowType" v-bind:key="flowtype">{{flowtype}}</option>
                </select>
            </div>
            <b-row class=" mt-3">
                <b-col>
                    <b-form-checkbox class="mx-2" v-model="model.temperatureModelling">
                        <p class="mx-2">Temperature Modelling</p> 
                    </b-form-checkbox >
                    <b-form-checkbox class="mx-2" v-model="model.sandControl" >
                        <p class="mx-2">Sand Control</p>
                    </b-form-checkbox>
                </b-col>
                <b-col>
                    <b-form-checkbox class="mx-2"  v-model="model.artificialLift">
                        <p class="mx-2">Artificial Lift</p>
                    </b-form-checkbox>
                    <b-form-checkbox class="mx-2" v-model="model.surfaceProfileModelling">
                        <p class="mx-2">Surface Profile Modelling</p>
                    </b-form-checkbox>
                </b-col>
            </b-row>
        </form>
        <div class="modal-footer">
            <button type="button" @click="UpdateModelBackground"  class="btn btn-primary">Save changes</button>
            <router-link :to="{ name: 'pvt'}">
                <button type="button"  class="btn btn-secondary"  data-bs-dismiss="modal">Next</button>
            </router-link>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
            fluidType:['Oil', 'Gas', 'Gas Condensate' ],
            flowType: ['Annular', 'Tubing'],
            model:null,
        }
    },
  computed: {
      ...mapState({
    activeModel: state => state.ActiveModel,
    models: state=> state.Models,
  }),
  },
  methods:{
    async UpdateModelBackground(){
        this.$store.dispatch('UpdateModelBackground', this.model)
    },
    OyaChange(){
        console.log("E don Work")
    }
  },
  created(){
    this.$store.commit('SetActiveModel', this.activeModel)
    this.model =
    {
        description: this.$store.state.ActiveModel.modelBackground.description, 
        fluidType: this.$store.state.ActiveModel.modelBackground.fluidType,
        flowType: this.$store.state.ActiveModel.modelBackground.flowType,
        wellType: this.$store.state.ActiveModel.modelBackground.wellType,
        temperatureModelling: this.$store.state.ActiveModel.modelBackground.temperatureModelling,
        artificialLift: this.$store.state.ActiveModel.modelBackground.artificialLift,
        sandControl: this.$store.state.ActiveModel.modelBackground.sandControl,
        surfaceProfileModelling: this.$store.state.ActiveModel.modelBackground.surfaceProfileModelling,
    }
    this.model.wellModelID = this.$store.state.ActiveModel.id
  }
}
</script>
<style>
    header{
    background: rgb(72, 72, 160);
    color: white;
    padding: 10px;
    font-weight: bold;
    }
    .modelBackground{
        border: grey solid 2px;
        border-radius: 10px;
        border-top-right-radius: 0px;
        border-top-left-radius: 0px;
        margin: 10px;
    }
    .modelBackgroundForm{
        margin-top: 30px;
    }
    .input-groups{
    }
</style>