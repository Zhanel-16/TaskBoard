<template>
  <h4>TAREAS</h4>
  <router-link to="/workspace" class="work">Ir a mi Workspace</router-link>
  <select v-model="filt">
    <option value="todas">Todas las tareas</option>
    <option value="finalizadas">Solo finalizadas</option>
    <option value="NOfinalizadas">No finalizadas</option>
  </select>

  <div class="container">
    <div
      v-for="t in tareasFiltradas" :key="t.id" class="card">
      <h2>{{ t.todo }}</h2>
      <p>{{ t.completed ? "Finalizada" : "Pendiente" }}</p>

      
      <button v-if="t.completed === false && !asignadas.includes(t.id)" @click="agregar(t)">Agregar</button>
      <p v-if="asignadas.includes(t.id)">Asignada ❌</p>
    </div>
  </div>
</template>

<script setup>
import { tareaYaAsignada } from "@/servicios/guardarTask"
let asignadas = ref([])

import { onMounted, ref, computed } from "vue"
import { useAPIStore } from "@/stores/api"
import { agregarTareaUsuario } from "@/servicios/guardarTask"
import { useToast } from "vue-toastification"

let toast = useToast()
let api = useAPIStore()
let filt = ref("todas")

onMounted(async () => {

  await api.getData()

  asignadas.value = []

  for (let t of api.listaTareas) {

    const ocupada = await tareaYaAsignada(t.id)

    if (ocupada) {
      asignadas.value.push(t.id)
    }
  }

})

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
  if (tarea.completed) return

  let res = await agregarTareaUsuario(tarea)

  if (res.ok) {
    toast.success("Tarea agregada ✔️")
  } else {
    toast.error(res.error)
  }
}
</script>


<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box
  font-family: "SN Pro", sans-serif

h4
  text-align: center
  font-size: 1.9rem
  padding: 1.3rem 0 0.8rem
.work
  display: block
  text-align: center
  margin-bottom: 1.5rem
  color: white
  background: darkslateblue
  padding: 0.6rem 1rem
  width: fit-content
  margin-left: auto
  margin-right: auto
  border-radius: 6px
  text-decoration: none

select
  display: block
  margin: 0 auto 2rem
  padding: 0.8rem
  border-radius: 8px

.container
  display: flex
  flex-wrap: wrap
  gap: 20px
  justify-content: center
  padding: 0 2rem 2rem

.card
  background: white
  border: 1.5px solid lightgray
  border-radius: 8px
  padding: 1.5rem
  width: 280px
  box-shadow: 0 4px 6px rgba(0,0,0,0.1)

  h2
    font-size: 1.1rem
    margin-bottom: 0.6rem
    color: dimgray

  p
    margin-bottom: 1rem
    color: gray

  button
    padding: 0.6rem
    border: none
    border-radius: 6px
    background: #27ae60
    color: white
    cursor: pointer
</style>
