<!-- datos de la api, los q esta register pueden acceder -->
<template>
  <h1>TAREAS</h1>   <!-- HOME, me voy aqui una vez estoy register -->
   <!-- vista principal con el tablón y todas las tareas. -->
  <!-- mostrar lisat completa de axios -->
  <div v-for="i in api.listaTareas" :key="i.id">
    <h1>Titulo: {{i.todo}}</h1>
    <p>{{i.completed}}</p>
  </div>
  <select id="filtro" v-model="filt">
    <option value="todas">Todas las tareas</option>
    <option value="finalizadas">Solo finalizadas</option> <!-- (completed: true) -->
    <option value="NOfinalizadas">No finalizadas</option>
    <option value="usuario">Asignadas a usuario</option>
    <!-- tareas que ya están en el workspace de alguien -->
  </select>
  <!-- Al cambiar el select, la lista debe actualizarse. -->
  
</template>

<script setup>

import { useAPIStore } from '@/stores/api';
import { onMounted, ref, computed } from 'vue';
let api = useAPIStore()
onMounted( async() => {
  await api.getData()
  console.log(api.listaTareas)
  
})
let filt = ref("todas")

let filtrarTareas = computed(()=>{
  if(filt.value==="finalizadas"){
    return api.listaTareas.filter(t=>t.completed)
  }
  if (filt.value === 'NOfinalizadas') {
    return api.listaTareas.filter(t => !t.completed)
  }

})


	// if(e.key=="Enter"){
	// 	que me haga algo, llamar peticion o lo q sea     peticion()
	// 	.then(resultado=>{
	// 		let busqueda = resultado.filter(user=>user.name.toLowerCase().trim().includes(buscador.value.toLowerCase().trim()))
	// 		busqueda --> recorrer o hacer lo q sea
	// 	})
	// 	.catch(resultado=>{
		
	// 	})
	
	// }




</script>

<style>

</style>