<template>
  <h1>Workspace</h1>
  <!-- mis tareas, cerrar sesion -->
  <div v-if="!tarea">
    <p>No tienes tareas asignadas... 💭</p>
  </div>
  <div v-else class="card">
    <h2>{{ tarea[0] }}</h2>
    <p>{{ tarea[1] ? "Finalizada" : "Pendiente" }}</p>
</div>

  <button @click="cerrarSesion" class="btnn">Cerrar sesion</button>
</template>

<script setup>

  import { obtenerTareasUsuario } from '@/servicios/guardarTask';
  import { ref, onMounted } from 'vue'
  import { logOut } from "@/servicios/autenticacion"
  import { useRouter } from "vue-router"
  import { useToast } from 'vue-toastification';
  let router = useRouter()
  let tarea = ref(null)
  let toast = useToast()

  onMounted(async () => {
    let res = await obtenerTareasUsuario()

    if (res.ok && res.tareas.length > 0) {
      tarea.value = res.tareas[0]
    }
  })

  let cerrarSesion = async () => {
    await logOut()
    toast.info("Cerrando la sesion...")
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
  border-radius: 6px
  padding: 1rem
  margin: 0 auto 1rem auto
         
.btnn
  margin-left: auto
  margin-right: auto
  display: flex
  align-items: center
  justify-content: center
  margin-top: 1rem
  padding: 0.7rem
  width: 9rem
  background: #C72B2B
  color: white
  border: none
  border-radius: 6px
  font-size: 1rem
  cursor: pointer
</style>