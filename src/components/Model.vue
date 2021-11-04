<template>
<b-col class="content" > 
    <div class="grid-container">
          <div class="grid-item">
            <router-link :to="{ name: 'modelBackground'}" class="router" >
            <div class="components bg-body rounded">
              <div class="componentHeader">Model Background</div>
              <b-row class="componentContent" style="font-size: width/12;">
                <b-col>
                  <p>Name: {{activeModel.name}}</p>
                  <p>FluidType: {{activeModel.modelBackground.fluidType}}</p>
                  <p>WellType: {{activeModel.modelBackground.wellType}}</p>
                  <p>FlowType: {{activeModel.modelBackground.flowType}}</p>
                  <p>Artificial Lift: {{activeModel.modelBackground.artificialLift}}</p>
                  <p>ModelDate: {{activeModel.modelDate}}</p>
                </b-col>
                <b-col cols="7">
                  <p>Temperature Modelling: {{activeModel.modelBackground.temperatureModelling}}</p>
                  <p>Surface Profile Modelling: {{activeModel.modelBackground.surfaceProfileModelling}}</p>
                  <p>Sand Control: {{activeModel.modelBackground.sandControl}}</p>
                  <p>Description: {{activeModel.modelBackground.description}}</p>
                </b-col>
              </b-row>
            </div>
            </router-link>
          </div>
        <!-- </b-col> -->
          <div  class="grid-item">
            <router-link :to="{ name: 'pvt'}" class="router" >
            <div class="components bg-body rounded">
              <div class="componentHeader">PVT</div>
              <b-row class="componentContentOil componentContent">
                <b-col>
                  <p>Fluid Type: {{activeModel.pvt.fluidType }}</p>
                  <p >{{activeModel.pvt.fluidType == "Oil"? "Solution GOR": "CGR"}} : {{activeModel.pvt.gasRatio.value }}</p>
                  <p>Temperature : {{activeModel.pvt.temperature.value }}</p>
                  <p>WaterSalinity: {{activeModel.pvt.waterSalinity.value}}</p>
                  <p>{{activeModel.pvt.fluidType == "Oil"? "Bubble Point Pressure": "Dew Point Pressure"}}: {{activeModel.pvt.pressure.value }}</p> 
                  <p>CO2: {{activeModel.pvt.c02}}</p>
                </b-col>
                <b-col>
                  <p>N2: {{activeModel.pvt.n2}}</p>
                  <p>RSBO: {{activeModel.pvt.rsbo}}</p>
                  <p>UO: {{activeModel.pvt.uo}}</p>
                  <p>H2S: {{activeModel.pvt.h2S}}</p>
                </b-col>
              </b-row>
            </div>
            </router-link>
          </div>
          <div  class="grid-item">
            <router-link :to="{ name: 'ipr'}" class="router" >
            <div class="components bg-body col-md rounded">
              <div class="componentHeader">IPR</div>
              <div class="componentContent">
                <p>Description: {vm.Description}</p>
                <p>ModelDate: {vm.ModelDate}</p>
                <p>FluidType: {vm.FluidType}</p>
                <p>WellType: {vm.WellType}</p>
                <p>FlowType: {vm.FlowType}</p>
                <p>Artificial: {vm.ArtificialLift}</p>
              </div>
            </div>
            </router-link>
          </div>
          <div  class="grid-item">
            <div class="components bg-body col-md rounded">
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
          <div  class="grid-item">
            <div class="components bg-body col-md rounded">
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
          <div  class="grid-item">
            <div class="components bg-body col-md rounded">
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
      <router-view/>
    </div>
  </b-col>
</template>
<script>
import {mapState} from 'vuex'
  export default{
    data(){
      return {
       // isSelected: false
      }
    },
    computed:{
      ...mapState({
      models: state=> state.Models
    }),
      activeModel(){
        var val = this.$store.getters.GetActiveModel(this.$route.params.id)
        this.$store.commit('SetActiveModel', val)
        return val
      } 
    }
  }
</script>
<style scoped>
.grid-container {
  display: grid;
  height: 800px;
  grid-template-columns: auto auto auto;
  grid-gap: 15px;
  align-content: center;
  justify-content: center;
  padding: 10px;
}
.grid-container > div {
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  font-size: 20px;
  border-radius: 5px;
}
.grid-container > div:hover {
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 20px 20px rgba(0, 0, 255, 0.25);
  font-size: 20px;
  border-radius: 5px;
  margin: 10px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  width: 400px;
  height: 250px;
}
.grid-container p{ 
  font-size: 12px;
  color:royalblue;
  margin: 0px;
  font-weight: bold;
}
.bigside{
  width: 200px;
  height: 100vh;
}
.router{
  text-decoration-line: none;
}
.fade-enter{
  opacity:0;
}
.fade-enter-to{
  opacity: 1;
}
.fade-enter-active{
  transition: all 2s ease;
}
/* .components{
  border: solid lightgrey 1px;
  height: 250px;
  margin: 5px;
  max-width: 400px;
  min-width: 200px;
  justify-content: center;
  box-shadow: 5px, 10px, ;
}
.components:hover{
  margin: 0px;
  box-shadow: 5px 15px 5px rgb(230, 204, 211);
} */
.componentHeader{
  background: rgb(72, 72, 160);
  color: white;
  padding: 2px;
  text-align: left;
  width: 100%;
  margin: 0px;
  padding-left: 5px;
 }
/*.components p{
  margin: 2px;
  font-size: 12px;
  color:royalblue;
  font-weight: bold;
  font-size:1vw;
} */
/* .components:hover{
  max-width: 500px;
} */
.componentContentGas{
  margin-top: 5%;
}
.componentContent{
  margin-top: 5%;
  margin-left: 5%;
}
 @media only screen and (max-width: 1550px){
  .components{
    height: auto;
    overflow:hidden;
  }
  .grid-item {
    width: auto;
    min-height: 300px;
    height: auto;
  }
}
@media only screen and (max-width: 1000px){
  .grid-container{
    grid-template-columns: auto auto;
    height: auto;
  }
} 
@media only screen and (max-width: 600px){
  .grid-container{
    grid-template-columns: auto;
    height: auto;
  }
} 
</style>