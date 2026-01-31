<template>
  <h1>Workspace</h1>
  <!-- mis tareas, cerrar sesion -->
  <div v-if="tareas.length === 0">
    <p>No tienes tareas asignadas... 💭</p>
  </div>
  <div v-for="t in tareas" :key="t.id" class="card">
    <h2>{{ t.todo }}</h2>
    <p>{{ t.completed ? "Finalizada" : "Pendiente" }}</p>
  </div>

  <button @click="cerrarSesion" class="btnn">Cerrar sesion</button>
</template>

<script setup>
  import { obtenerTareasUsuario } from '@/servicios/guardarTask';
  import { ref, onMounted } from 'vue'
  import { logOut } from "@/servicios/autenticacion"
  import { useRouter } from "vue-router"

  let tareas = ref([])
  let router = useRouter()

  onMounted(async () => {
    let res = await obtenerTareasUsuario()
    if (res.ok) {
      // regla: solo tareas NO finalizadas
      tareas.value = res.tareas.filter(t => !t.completed)
    }
  })
  let cerrarSesion = async () => {
  await logOut()
  router.push("/login")
}
  
  
</script>
  
<style lang="sass">
*
    margin: 0
    padding: 0
    box-sizing: border-box

h1
  text-align: center
  margin-bottom: 1.5rem

.card
  background: white
  border: 1px solid lightgray
  border-radius: 8px
  padding: 1rem
  margin: 0 auto 1rem auto
  max-width: 500px
.btnn
  display: block
  margin: 2rem auto
  padding: 0.6rem 1.2rem
  background: dimgray
  color: white
  border: none
  border-radius: 5px
  cursor: pointer
</style>