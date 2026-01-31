import {db, auth} from "@/firebase/config"                        //ESTE ARCHIVO TMB LO PUEDO UTILIZAR EN EX
import {      //importar funciones de f
    doc,      //doc hace referencia al documento(registro)
    setDoc,   //AÑADIR a bd ==> establecer valores dentro de un doc 
    getDoc,   //recoge   OBTENER de bd
    updateDoc, //actualizar
    arrayUnion
} from "firebase/firestore"
import { usuario } from "./autenticacion"
export let guardarPerfilUsuario = async (usuarioId, datosPerfil) => {
  try {
    let docRef = doc(db, "usuarios", usuarioId)

    await setDoc(docRef, {
      ...datosPerfil,
      tasks: [] // guardar tareas de usuario
    })

    return { ok: true }
  } catch (error) {
    return { ok: false, error: error.message }
  }
}

export let obtenerPerfilUsuario = async (usuarioId) => {
  try {
    let docRef = doc(db, "usuarios", usuarioId)
    let docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return {
        ok: true,
        perfil: {
          id: docSnap.id,
          ...docSnap.data()
        }
      }
    }

    return { ok: false }
  } catch (error) {
    return { ok: false, error: error.message }
  }
}
export let agregarTareaUsuario = async (tarea) => {
  try {
    let uid = auth.currentUser.uid
    let docRef = doc(db, "usuarios", uid)

    // comprobar si el documento del usuario existe
    let snap = await getDoc(docRef)

    if (!snap.exists()) { //si no existe ==> crear 
      await setDoc(docRef, {
        email: auth.currentUser.email,
        tasks: []
      })
    }

    await updateDoc(docRef, {
      tasks: arrayUnion({
        id: tarea.id,
        todo: tarea.todo,
        completed: tarea.completed
      })
    })

    return { ok: true }
  } catch (error) {
    return { ok: false, error: error.message }
  }
}

export let obtenerTareasUsuario = async () => {
  try {
    let uid = auth.currentUser.uid
    let docRef = doc(db, "usuarios", uid)
    let snap = await getDoc(docRef)

    if (snap.exists()) {
      return {
        ok: true,
        tareas: snap.data().tasks || []
      }
    }

    return { ok: true, tareas: [] }
  } catch (error) {
    return { ok: false, error: error.message }
  }
}




