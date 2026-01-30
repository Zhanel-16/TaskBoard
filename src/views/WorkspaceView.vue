<template>
  <h1>work</h1>
  <!-- mis tareas, cerrar sesion -->
  <button>Cerrar sesion</button>
</template>

<script setup>
  import { ref } from 'vue'

  let listaTareas = ref([])
    let getData = async()=>{ //en mi ctore , la llamo en tareas
    try{
        let resultado = await axios.get("https://dummyjson.com/todos")
        listaTareas.value = resultado.data.products
        console.log(listaTareas)
    }catch(error){
        console.log(error)
    }
    }
</script>

<style>

</style>