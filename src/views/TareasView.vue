<!-- datos de la api, los q esta register pueden acceder -->
<template>
  <h4>TAREAS</h4>   <!-- HOME, me voy aqui una vez estoy register -->
   <!-- vista principal con el tablón y todas las tareas. -->
  <!-- mostrar lisat completa de axios -->
  <select id="filtro" v-model="filt">
    <option value="todas">Todas las tareas</option>
    <option value="finalizadas">Solo finalizadas</option> <!-- (completed: true) -->
    <option value="NOfinalizadas">No finalizadas</option>
    <option value="usuario">Asignadas a usuario</option>
    <!-- tareas que ya están en el workspace de alguien -->
  </select>
  <div class="container">
  <!-- <div v-for="i in api.listaTareas" :key="i.id"> -->
    <div v-for="i in tareasFiltradas" :key="i.id" class="card">
      <h1>Titulo: {{i.todo}}</h1>
      <!-- <p>{{i.completed}}</p> -->
      <p>{{ i.completed ? "Finalizada" : "Pendiente" }}</p>
      <button v-if="!i?.completed" @click="agregar(i)">Agregar</button>
    </div>
  </div>
  
  <!-- Al cambiar el select, la lista debe actualizarse. -->
</template>

<script setup>
import { agregarTareaUsuario } from '@/servicios/guardarTask';
import { useAPIStore } from '@/stores/api';

import { onMounted, ref, computed } from 'vue';
// import { agregarTareaUsuario } from "@/servicios/guardarTask"
let api = useAPIStore()
onMounted( async() => {
  await api.getData()
  console.log(api.listaTareas)
  
})
let filt = ref("todas")

let tareasFiltradas = computed(() => {
  if (filt.value === "finalizadas") {
    return api.listaTareas.filter(t => t.completed)
  }
  if (filt.value === "NOfinalizadas") {
    return api.listaTareas.filter(t => !t.completed)
  }
  return api.listaTareas
})

let agregar = async (tarea) => {
let res = await agregarTareaUsuario(tarea)
  if (res.ok) {
    alert("Tarea agregada al workspace")
  }
}

</script>
<style lang="sass">
*
    margin: 0
    padding: 0
    box-sizing: border-box
    font-family: "SN Pro", sans-serif;
    
h4
  text-align: center
  font-size: 1.9rem
  padding-top: 1.3rem
  padding-bottom: 0.8rem
select
  display: flex
  justify-content: center
  align-items: center
  margin: 0 auto 2rem 
  padding: 0.8rem
  border-radius: 8.5px 

.container
  display: flex
  flex-wrap: wrap
  gap: 20px
  justify-content: center
  padding: 0 1rem
  padding-bottom: 1.1rem
  padding-left: 3.6rem
  padding-right: 3rem

.card
  display: flex
  flex-direction: column
  justify-content: space-between
  background: white
  border: 1.5px solid lightgray
  border-radius: 8px
  padding: 1.5rem
  flex: 1 1 calc(27% - 20px)
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
  h1
    font-size: 1.2rem
    margin-bottom: 1rem
    color: dimgray
    text-align: left

  p
    padding-bottom: 1rem
    color: gray

  button
    width: 5.4rem
    padding: 0.65rem 1rem
    border: none
    margin-left: 14rem
    border-radius: 6px
    background: #27ae60
    color: white
    cursor: pointer
    transition: opacity 0.2s
</style>