import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAPIStore = defineStore('api', () => {
  let listaTareas = ref([]) //llamar en tareas
  
  let getData = async()=>{
    try{
        let resultado = await axios.get("https://dummyjson.com/todos")
        listaTareas.value = resultado.data.todos
        console.log("holaaaaaaaaaaaa",listaTareas)
    }catch(error){
        console.log(error)
    }
  }
  return {listaTareas, getData} //RETURN A ESTA ALTURA!!!!!!!!!!!!!!!!!!!
})


