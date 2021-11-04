<template>    
    <div class="IPR m-5 justify-self-center  " >
        <header>IPR</header>
        <div class="fluidProperties mb-2 mt-2 item2 grid-container">
            <div >
                <form action="" class="IPRForm mx-2 my-2 w-50 border">
                    <header class="fluidHeader">Lift Table Import</header>
                    <FileReader @load="UploadFile($event)"></FileReader>
                    <div>
                        <label for="">Reservoir Pressure: </label>
                        <input class="inputs w-50" type="text" v-model="model.reservoirPressure.value" name="" id="">
                        <select v-model="model.reservoirPressure.unit">
                            <option v-for="pressureUnit in pressureUnits" v-bind:key="pressureUnit">{{pressureUnit}}</option>
                        </select>
                    </div>
                    <div>
                        <label for="">Reservoir Temperature: </label>
                        <input type="text" class="inputs w-50" v-model="model.reservoirTemperature.value" name="" id="">
                         <select v-model="model.reservoirTemperature.unit">
                            <option v-for="reservoirTemperature in temperatureUnits" v-bind:key="reservoirTemperature">{{reservoirTemperature}}</option>
                        </select>
                    </div><div>
                        <label for="">{{model.gasFraction.name}}: </label>
                        <input class="inputs w-50" type="text" v-model="model.gasFraction.value" name="" id="">
                         <select v-model="model.gasFraction.unit">
                            <option v-for="gasFraction in solutionGorUnits" v-bind:key="gasFraction">{{gasFraction}}</option>
                        </select>
                    </div>
                    <div>
                        <label for="">{{model.waterFraction.name}}: </label>
                        <input type="text" class="inputs w-50" v-model="model.waterFraction.value" name="" id="">
                         <select v-model="model.waterFraction.unit">
                            <option v-for="waterFraction in solutionGorUnits" v-bind:key="waterFraction">{{waterFraction}}</option>
                        </select>
                    </div>
                    <div>
                        <label for="">Productivity Index: </label>
                        <input type="text" class="inputs w-50" v-model="model.productivityIndex.value" name="" id="">
                    </div>
                    <div>
                        <textarea name="" class="form-control h-75 w-50" id="" v-model="model.liftTableContent" cols="30" rows="10"></textarea>
                    </div>
                </form>
            </div>
            <div>

            </div>
            
            <div class="modal-footer">
                <button type="button" @click="UpdateIPR(model)"  class="btn btn-primary">Save changes</button>
                <router-link :to="{ name: 'pvt'}">
                    <button type="button"  class="btn btn-secondary"  data-bs-dismiss="modal">Next</button>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import FileReader from "./FileReader.vue";
import {ParseIPRTable} from "../ParseIPRTable.js"
export default {
    components: {
    FileReader
  },
    data(){
        return {
            model:null,
            pressureUnits:['psia', 'psig' ],
            temperatureUnits: ['C', 'F'],
            solutionGorUnits:['scf/stb', 'Mscf/stb', 'MMscf/stb'],
        }
    },
    computed:{
        ...mapState({
            activeModel: state=> state.ActiveModel
        }),
        gasFractionName:{
            
        },
        waterFractionName:{

        }
    },
    methods:{
        async UpdateIPR(payload) {
            this.$store.dispatch('UpdateIPR', payload)
        },
        UploadFile(payload){
            this.model.liftTableContent = payload
            var result = ParseIPRTable(this.model.liftTableContent)
            this.model.reservoirPressure.value = result.ReservoirPressure
            this.model.reservoirTemperature.value = result.ReservoirTemperature
            this.model.gasFraction.value =result.TotalGOR!= 0? result.TotalGOR:result.CondensateGasRatio
            this.model.waterFraction.value = result.WaterCut != 0? result.WaterCut:result.WaterGasRatio
        }
    },
    created(){
        this.$store.commit('SetActiveModel', this.activeModel)
        this.model =
        {
            waterFraction: {
                name : this.$store.state.ActiveModel.ipr.waterFraction == ""? this.$store.state.ActiveModel.ipr.waterFraction.name: "Water Cut",
                value: this.$store.state.ActiveModel.ipr.waterFraction.value,
                unit: this.$store.state.ActiveModel.ipr.waterFraction.unit
            },
            reservoirTemperature: {
                name : "Reservoir Temperature",
                value: this.$store.state.ActiveModel.ipr.reservoirTemperature.value,
                unit: this.$store.state.ActiveModel.ipr.reservoirTemperature.unit
            },
            reservoirPressure: {
                name : "Reservoir Pressure",
                value: this.$store.state.ActiveModel.ipr.reservoirPressure.value,
                unit: this.$store.state.ActiveModel.ipr.reservoirPressure.unit
            },
            productivityIndex: {
                name : "Productivity Index",
                value: this.$store.state.ActiveModel.ipr.productivityIndex.value,
                unit: this.$store.state.ActiveModel.ipr.productivityIndex.unit
            },
            gasFraction: {
                name :  this.$store.state.ActiveModel.ipr.gasFraction == ""?  this.$store.state.ActiveModel.ipr.gasFraction.name: "GOR",
                value: this.$store.state.ActiveModel.ipr.gasFraction.value,
                unit: this.$store.state.ActiveModel.ipr.gasFraction.unit
            },
            liftTablePath: this.$store.state.ActiveModel.ipr.liftTablePath, 
            liftTableContent: this.$store.state.ActiveModel.ipr.liftTableContent,
        }
        this.model.wellModelID = this.$store.state.ActiveModel.id
    }
}
</script>
<style scoped>
    .inputs{ 
        margin: 5px;
        font-size: 12px;
        padding: 0px;
        height: 20px;
    }
    .IPR{
        border: grey solid 2px;
        border-radius: 10px;
        border-top-right-radius: 0px;
        border-top-left-radius: 0px;
        margin: 10px;
    }
    .IPRForm{
        font-size: 12px;
        padding: 4px;
    }
    .fluidHeader{
        background: rgb(72, 72, 160);
        color: white;
        padding: 3px;
        font-weight: normal;
        margin-bottom: 10px;
    }
    select{
        width: auto;
        border-radius: 0px;
        padding-top: 0px;
        font-size: 12px;
    }
    .grid-container {
    display: grid;
    grid-template-areas: auto auto;
    grid-gap: 10px;
    padding: 10px;
    }
    .grid-container > div {
        background-color: rgba(255, 255, 255, 0.8);
    }
</style>