<template>
    <b-row class="EditView">
        <b-col cols="10">
            <router-view/>
        </b-col>
        <b-col cols="2" class="sides-navs-bars">
          <div class="grid-container">
          <router-link :to="{ name: 'modelBackground'}" class="col router" >
            <div class="components shadow bg-body rounded">
              <div class="componentHeader">Model Background</div>
              <b-col class="componentContent">
                <p>Name: {{activeModel.name}}</p>
                <p>FluidType: {{activeModel.modelBackground.fluidType}}</p>
                <p>WellType: {{activeModel.modelBackground.wellType}}</p>
                <p>FlowType: {{activeModel.modelBackground.flowType}}</p>
                <p>Artificial Lift: {{activeModel.modelBackground.artificialLift}}</p>
                <p>ModelDate: {{activeModel.modelDate}}</p>
             </b-col>
             </div>
          </router-link>
        <!-- </b-col> -->
        <div  class="grid-item">
          <router-link :to="{ name: 'pvt'}" class="col router">
            <div class="components shadow bg-body rounded col">
              <div class="componentHeader ">PVT</div>
              <b-row>
                <b-col cols="7" class="componentContent" >
                  <p >{{activeModel.pvt.fluidType == "Oil"? "Solution GOR": "CGR"}} : {{activeModel.pvt.gasRatio.value }}</p>
                  <p>Temperature : {{activeModel.pvt.temperature.value }}</p>
                  <p>WaterSalinity: {{activeModel.pvt.waterSalinity.value}}</p>                  
                  <p>{{activeModel.pvt.fluidType == "Oil"? "Bubble Point Pressure": "Dew Point Pressure"}}: {{activeModel.pvt.pressure.value }}</p> 
                  <p>UO: {{activeModel.pvt.uo}}</p>
                  <p>RSBO: {{activeModel.pvt.rsbo}}</p>
                </b-col>
                <b-col>
                  <p>N2: {{activeModel.pvt.n2}}</p>
                  <p>H2S: {{activeModel.pvt.h2S}}</p>
                  <p>CO2: {{activeModel.pvt.c02}}</p>
                </b-col>
              </b-row>
            </div>
          </router-link>
          </div>
          <div class="grid-item">
            <router-link :to="{ name: 'ipr'}" class="col router">
              <div class="components shadow bg-body col-md rounded">
                <div class="componentHeader">IPR</div>
                <div class="componentContent">
                  <p>Temperature : {{activeModel.ipr.reservoirTemperature.value }}</p>
                  <p>Pressure: {{activeModel.ipr.reservoirPressure.value }}</p>
                  <p>{{activeModel.ipr.gasFraction.name= activeModel.ipr.gasFraction.name == "" }}: {{activeModel.ipr.gasFraction.value }}</p>
                  <p>WellType: {vm.WellType}</p>
                  <p>FlowType: {vm.FlowType}</p>
                  <p>Artificial: {vm.ArtificialLift}</p>
                </div>
              </div>
            </router-link>
          </div>
          <div  class="grid-item">
            <div class="components shadow bg-body col-md rounded">
              <div class="componentHeader">Downhole Equipment</div>
              <div class="componentContent">
                <p>Description: {vm.Description}</p>
                <p>ModelDate: {vm.ModelDate}</p>
                <p>FluidType: {vm.FluidType}</p>
                <p>WellType: {vm.WellType}</p>
                <p>FlowType: {vm.FlowType}</p>
                <p>Artificial: {vm.ArtificialLift}</p>
              </div>
            </div>
          </div>
          <div class="grid-item">
            <div class="components shadow bg-body col-md rounded">
              <div class="componentHeader">Geothermal Gradient</div>
              <div class="componentContent">
                <p>Description: {vm.Description}</p>
                <p>ModelDate: {vm.ModelDate}</p>
                <p>FluidType: {vm.FluidType}</p>
                <p>WellType: {vm.WellType}</p>
                <p>FlowType: {vm.FlowType}</p>
                <p>Artificial: {vm.ArtificialLift}</p>
              </div>
            </div>
          </div>
          <div class="grid-item">
            <div class="components shadow bg-body col-md rounded">
              <div class="componentHeader">VLP</div>
              <div class="componentContent">
                <p>Description: {vm.Description}</p>
                <p>ModelDate: {vm.ModelDate}</p>
                <p>FluidType: {vm.FluidType}</p>
                <p>WellType: {vm.WellType}</p>
                <p>FlowType: {vm.FlowType}</p>
                <p>Artificial: {vm.ArtificialLift}</p>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
</template>
<script>
import {mapState} from 'vuex'
export default {
    computed: mapState({
    activeModel: state => state.ActiveModel,
    models: state=> state.Models
  }),
  created(){
      this.$store.commit('SetActiveModel', this.activeModel)
  }
}
</script>
<style scoped>
.active{
  border:rgb(72, 72, 160);
}
.componentHeader{
  background: rgb(72, 72, 160);
  color: white;
  padding: 2px;
  text-align: left;
  padding-left: 5px;
 }
.grid-container {
  display: grid;
  grid-template-columns: auto;
  grid-gap: 10px;
}
.grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  font-size: 30px;
  padding: 0px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  height: auto;
  padding: 10px;
}
.grid-container p{ 
  font-size: 12px;
  color:royalblue;
  margin: 0px;
  font-weight: bold;
}
.components{
  font-size: 12px;
}
.componentContent{
  margin: 3px;
}
.components p{
  font-size: 10px;
}
.router{
  text-decoration-line: none;
}
</style>