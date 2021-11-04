<template>
    <div class="PVT m-5 justify-self-center" >
        <header>PVT</header>
        <div class="grid-container">
            <div class="item1">
                <label for="">Fluid Type:</label>
                <b-form-select class="m-3 w-50 border-primary p-1 rounded" v-model="model.fluidType" :options="fluidType"></b-form-select>
            </div>
            <div class="fluidProperties mb-2 item2">
                <form action="" class="PVTForm mx-2 rounded border ">
                    <header class="fluidHeader">Fluid Properties</header>
                    <div>
                        <div class=" m-1 d-flex">
                            <label  for="" class="name" >{{gasRatioName}} :</label>
                            <input type="text" class="w-25 inputs" name="" v-model="model.gasRatio.value" id="">
                            <select>
                                <option :value="model.gasRatio.unit" v-for="solutionGorUnit in solutionGorUnits" v-bind:key="solutionGorUnit">{{solutionGorUnit}}</option>
                            </select>
                        </div>
                        <div class="d-flex m-1">
                            <label for="" class="name">Temperature:</label>
                            <input class="inputs w-25" type="text" name="" v-model="model.temperature.value" id="">
                            <select>
                                <option :value="model.temperature.unit" v-for="pressureUnit in temperatureUnits" v-bind:key="pressureUnit">{{pressureUnit}}</option>
                            </select>
                        </div>
                        <div class="d-flex m-1">
                            <label for="" class="name">{{pressureName}}:</label>
                            <input class="inputs w-25" type="text" name="" v-model="model.pressure.value" id="">
                            <select >
                                <option :value="model.pressure.unit" v-for="pressureUnit in pressureUnits" v-bind:key="pressureUnit">{{pressureUnit}}</option>
                            </select>
                        </div>
                        <div class="d-flex m-1">
                            <label for="" class="name">Water Salinity:</label>
                            <input class="inputs w-25" type="text" name="" v-model="model.waterSalinity.value" id="">
                            <select>
                                <option :value="model.waterSalinity.unit" v-for="waterSalinityUnit in waterSalinityUnits" v-bind:key="waterSalinityUnit">{{waterSalinityUnit}}</option>
                            </select>
                        </div>
                        <div class="d-flex m-1">
                            <label for="" class="name">Oil Gravity:</label>
                            <input class="inputs w-25" type="text" name="" v-model="model.oilGravity" id="">
                        </div>
                        <div class="d-flex m-1">
                            <label for="" class="name">Gas Gravity:</label>
                            <input class="inputs w-25" type="text" name="" v-model="model.gasGravity" id="">
                        </div>
                    </div>
                </form>
            </div>
            <div class="impurities mb-2 item3">
                <form action="" class="PVTForm mx-2 rounded border">
                    <header class="fluidHeader">Impurities</header>
                    <div>
                        <div class="d-flex m-1">
                            <label for="" class="name">CO2:</label>
                            <input class="inputs w-25" type="text" name="" v-model="model.c02" id="">
                             <p>mol%</p> 
                        </div>
                        <div class="d-flex m-1">
                            <label for="" class="name">H2S:</label>
                            <input class="inputs w-25" type="text" name="" v-model="model.h2S" id="">
                             <p>mol%</p>
                        </div>
                        <div class="d-flex m-1">
                            <label for="" class="name">N2:</label>
                            <input class="inputs w-25" type="text" name="" v-model="model.n2" id="">
                             <p>mol%</p>
                        </div>
                    </div>
                </form>
            </div>
            <div class="impurities mb-2 item4">
                <form action="" class="PVTForm mx-2 rounded border">
                    <header class="fluidHeader">Correlations</header>
                    <div  v-if="model.fluidType == 'Oil'">
                        <div class="d-flex m-1">
                            <label for="" class="name">RSBO:</label>
                            <select v-model="model.rsbo" class="w-50">
                                <option v-for="OilCorrelation in OilCorrelations" v-bind:key="OilCorrelation">{{OilCorrelation}}</option>
                            </select>
                        </div>
                        <div class="d-flex m-1">
                            <label for="" class="name">Oil Viscosity:</label>
                            <select v-model="model.uo" class="w-50">
                                <option v-for="viscosityCorrelation in viscosityCorrelations" v-bind:key="viscosityCorrelation">{{viscosityCorrelation}}</option>
                            </select>
                        </div>
                    </div>
                    <div v-else>
                        <div class="d-flex m-1">
                            <label for="" class="name">Gas Viscosity:</label>
                            <select  class="w-50">
                                <option :value="model.waterSalinity.unit" v-for="gasCorrelation in GasCorrelations" v-bind:key="gasCorrelation">{{gasCorrelation}}</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" @click="UpdatePVT(model)"  class="btn btn-primary">Save changes</button>
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
            pressureUnits:['psia', 'psig' ],
            temperatureUnits: ['C', 'F'],
            solutionGorUnits:['scf/stb', 'Mscf/stb', 'MMscf/stb'],
            OilCorrelations:['Glaso', 'Standing', 'Lasater'],
            GasCorrelations:["Lee et al", "Carr et al"],
            viscosityCorrelations:['Beal et al', 'Beggs et al'],
            waterSalinityUnits:['ppm'],
            model:  { uO : "Standing" }
        }
    },
  computed: {
      ...mapState({
    activeModel: state => state.ActiveModel,
    models: state=> state.Models,
  }),
    gasRatioName(){
        if (this.model.fluidType == "Oil") {
            return "Solution GOR"
        }
        else{
            return "CGR"
        }
    },
    pressureName(){
        if (this.model.fluidType == "Oil") {
            return "Bubble Point Pressure"
        }
        else{
            return "Dew Point Pressure"
        }
        
    }
  },
  methods:{
    async UpdatePVT(payload) {
        payload.pressure.name = payload.fluidType== "Oil"? "Bubble Point Pressure": "Dew Point Pressure"
        payload.gasRatio.name = payload.fluidType == "Oil"? "Solution GOR": "CGR"
        this.$store.dispatch('UpdatePVT', payload)
    }
  },
  created(){
    this.$store.commit('SetActiveModel', this.activeModel)
    this.model =
    {
        fluidType: this.$store.state.ActiveModel.pvt.fluidType,
        gasRatio: {
            name : this.$store.state.ActiveModel.pvt.reservoirType == "Oil"? "Solution GOR": "CGR",
            value: this.$store.state.ActiveModel.pvt.gasRatio.value,
            unit: this.$store.state.ActiveModel.pvt.gasRatio.unit
        },
        temperature: {
            name : "Temperature",
            value: this.$store.state.ActiveModel.pvt.temperature.value,
            unit: this.$store.state.ActiveModel.pvt.temperature.unit
        },
        waterSalinity: {
            name : "Water Salinity",
            value: this.$store.state.ActiveModel.pvt.waterSalinity.value,
            unit: this.$store.state.ActiveModel.pvt.waterSalinity.unit
        },
        pressure: {
            name : this.$store.state.ActiveModel.pvt.reservoirType == "Oil"? "Bubble Point Pressure": "Dew Point Pressure",
            value: this.$store.state.ActiveModel.pvt.pressure.value,
            unit: this.$store.state.ActiveModel.pvt.pressure.unit
        },
        c02: this.$store.state.ActiveModel.pvt.c02,
        h2S:this.$store.state.ActiveModel.pvt.h2S,
        n2: this.$store.state.ActiveModel.pvt.n2,
        rsbo: this.$store.state.ActiveModel.pvt.rsbo,
        uo: this.$store.state.ActiveModel.pvt.uo,
        gasViscosity: this.$store.state.ActiveModel.pvt.gasViscosity,
        blackOilModel: this.$store.state.ActiveModel.pvt.blackOilModel,
        oilGravity:this.$store.state.ActiveModel.pvt.oilGravity,
        gasGravity:this.$store.state.ActiveModel.pvt.gasGravity,
    }
    this.model.wellModelID = this.$store.state.ActiveModel.id
  }
}
</script>
<style scoped>
    header{
        background: rgb(72, 72, 160);
        color: white;
        padding: 10px;
        font-weight: bold;
    }
    .fluidHeader{
        background: rgb(72, 72, 160);
        color: white;
        padding: 3px;
        font-weight: normal;
    }
    .PVT{
        border: grey solid 2px;
        border-radius: 10px;
        border-top-right-radius: 0px;
        border-top-left-radius: 0px;
        margin: 10px;
    }
    label{
        font-size: 13px;
        vertical-align: middle;
    }
    .val{
        margin-left: 10px;
    }
    .inputs{ 
        margin: 5px;
        font-size: 12px;
        padding: 0px;
        height: 20px;
    }
    select{
        width: auto;
        border-radius: 5px;
        font-size: 12px;
        margin: 2px;
        padding: 0px;
    }
    .PVTForm p{
        font-size: 12px;
    }
    /* .name{
        grid-area: rows;
    } */
    .input-groups{
        
    }
    .item1 {
        grid-area: myArea;
    }
    .item4{
        grid-area: 3/1  / span 2 / span 2;
    }
    .grid-container {
    display: grid;
    grid-template-areas: 'myArea myArea';
    grid-gap: 10px;
    padding: 10px;
    }
    .grid-container > div {
        background-color: rgba(255, 255, 255, 0.8);
    }
    @media only screen and (max-width: 1000px){
        .grid-container{
            grid-template-areas: 'myArea';
            height: auto;
        }
        .item4{
            grid-area: 3/1  / span 2;
        }
    }
</style>