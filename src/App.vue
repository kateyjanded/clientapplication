<template>
  <div>
    <b-row style="margin-bottom:10px">
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top p-0">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src="./images/brand logo.png" alt="">
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active btn btn-light text-secondary rounded-pill fw-bold p-1" data-bs-toggle="modal" data-bs-target="#exampleModal" aria-current="page" href="#">Create Model</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </b-row>
    <b-row  style="margin-top:65px" class="mx-1">
      <b-col cols="2" class="sideBar p-0 m-0">
        <div class="sideHeader text-white text-center">System Analysis Models</div>
        <div class="dropdown  models"  id="item" v-for="model in models" v-bind:key="model.id">
          <router-link class="routerLink" v-on:click="SetActiveModel(model)" :to="{name: 'model', params:{id: model.id}}">
          <p class=" m-0 p-1 " id="dropdownMenu2" v-on:click="SetActiveModel(model)">
            {{model.name}} {{model.modelDate}}
          </p>
          </router-link>
          <transition name="fade">
          <ul class="dropdown-content"  >
            <li><a class="dropdown-item" @click="DeleteModel(model)" href="#">Delete Model</a></li>
          </ul>
          </transition>
        </div>
      </b-col>
      <b-col>
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </b-col>
    </b-row>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal">
        <div class="modal-content">
          <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Create Well Model</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form action="" class="modalForm">
              <label for="">Name</label>
              <input type="text" class="form-control" placeholder="Model Name" v-model="name" name="" id="">
              <label for="">Model Date:</label>
              <input type="date" class="form-control" placeholder="Model Date" v-model="modelDate" name="" id="">
              <label for="">Drainge Point Name</label>
              <input type="text" class="form-control" placeholder="Drainage Point Name" v-model="drainagePointName" name="" id="">
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" @click="CreateModel" class="btn btn-primary">Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
//import Model from './components/Model.vue'
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: 'App',
  components: {
   // Model
  },
  data () {
    return{
      name: "",
      drainagePointName: "",
      modelDate: new Date("2021-07-08T10:12:10.980Z")
    }
  },
  methods:{
    ...mapActions([
      'DeleteModel'
    ]),
    ...mapMutations([
      'SetActiveModel'
    ]),
    async CreateModel(){
      let payload = {name: this.name, drainagePointName: this.drainagePointName, modelDate: this.modelDate}
      this.$store.dispatch('CreateModel', payload)
    }
  },
  created() { 
    this.$store.dispatch('GetData')
  },
  computed: mapState({
    activeModel: state => state.ActiveModel,
    models: state=> state.Models
  })
}
</script>

<style >

.fade-enter{
  opacity:0;
}
.fade-enter-to{
  opacity: 1;
}
.fade-enter-active{
  transition: all 2s ease;
}
img{
  height: 50px;
  width: 60px;
}
.sideBar{
  background: rgb(72, 72, 160);
  display: block;
  min-height: 100vh;
}
.sideHeader{
  background: rgb(72, 72, 160);
  font-weight: bold;
  padding-bottom: 5px;
}
.navbar{
  background: rgb(72, 72, 160);
}
ul{
  display: block;
  list-style: none;
}
ul li{
  color: blue;
}
/* .components{
  border: solid lightgrey 1px;
  height: 30vh;
  margin: 5px;
  justify-content: center;
} */
/* .componentsfolder{
  margin-top: 10%;
  margin-bottom: 12%;
} */
.routerLink{
  text-decoration: none;
}
/* .componentHeader{
  background: rgb(72, 72, 160);
  color: white;
  padding: 2px;
  text-align: left;
  width: 100%;
  padding-left: 5px;
}
.components p{
  margin: 2px;
  font-size: 12px;
  color:royalblue;
  font-weight: bold;
}
.componentContentGas{
  margin-top: 5%;
}
.componentContent{
  margin-top: 5%;
  margin-left: 5%;
} */
.models p{
  color:white;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
}
#item{
  display: block;
  flex-wrap: wrap;
}
/* #dropdownMenu2{
  flex-wrap: wrap;
} */
.models{
  color: rgb(72, 72, 160);
  display:block;
}
.models p:hover{
  background: rgb(114, 114, 212);
  color: white;
  font-weight: bold;
}
.models .active p{
  background: white;
  color: rgb(72, 72, 160);
  font-weight: bold;
  border-top-right-radius: 75px;
  border-bottom-right-radius: 75px;
  border: solid transparent 1px ;
}
.models .active p:hover{
  background: rgb(114, 114, 212);
}
.dropbtn {
  background-color: #c8fce9;
  padding: 16px;
  font-size: 16px;
  border: none;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #ddd;}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {display: block;}

/* Change the background color of the dropdown button when the dropdown content is shown */
.modalForm{
  display: block;
}
</style>
