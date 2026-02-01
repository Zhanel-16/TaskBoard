import { db, auth } from "@/firebase/config"

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  collection,
  getDocs
} from "firebase/firestore"


// ==============================
// COMPROBAR SI TAREA YA ASIGNADA
// ==============================
export const tareaYaAsignada = async (taskId) => {

  const usersRef = collection(db, "users")
  const snap = await getDocs(usersRef)

  let ocupada = false

  snap.forEach(docu => {

    const tareas = docu.data().tasks || []

    const existe = tareas.find(t => t.id === taskId)

    if (existe) {
      ocupada = true
    }
  })

  return ocupada
}



// ==============================
// AGREGAR TAREA AL USUARIO
// ==============================
export const agregarTareaUsuario = async (tarea) => {

  try {

    const user = auth.currentUser

    if (!user) {
      return { ok: false, error: "No autenticado" }
    }


    // ❌ No permitir finalizadas
    if (tarea.completed === true) {
      return {
        ok: false,
        error: "No se pueden añadir tareas finalizadas"
      }
    }


    // ❌ Comprobar si ya está asignada
    const ocupada = await tareaYaAsignada(tarea.id)

    if (ocupada) {
      return {
        ok: false,
        error: "Esta tarea ya está asignada a otro usuario"
      }
    }


    const uid = user.uid
    const userRef = doc(db, "users", uid)

    const snap = await getDoc(userRef)


    // Crear doc si no existe
    if (!snap.exists()) {

      await setDoc(userRef, {
        tasks: []
      })

    }


    let tareasActuales = []

    if (snap.exists()) {
      tareasActuales = snap.data().tasks || []
    }


    // ❌ No repetir en el mismo user
    const repetida = tareasActuales.find(
      t => t.id === tarea.id
    )

    if (repetida) {
      return {
        ok: false,
        error: "Ya tienes esta tarea"
      }
    }


    // ✅ Guardar
    await updateDoc(userRef, {
      tasks: arrayUnion({
        id: tarea.id,
        todo: tarea.todo,
        completed: tarea.completed
      })
    })


    return { ok: true }


  } catch (error) {

    console.log("❌ Firestore:", error)

    return {
      ok: false,
      error: error.message
    }
  }
}



// ==============================
// OBTENER TAREAS DEL USUARIO
// ==============================
export const obtenerTareasUsuario = async () => {

  try {

    const user = auth.currentUser

    if (!user) {
      return { ok: false, error: "No autenticado" }
    }


    const docRef = doc(db, "users", user.uid)

    const snap = await getDoc(docRef)


    if (snap.exists()) {

      return {
        ok: true,
        tareas: snap.data().tasks || []
      }

    }


    return {
      ok: true,
      tareas: []
    }


  } catch (error) {

    console.log("❌ Firestore:", error)

    return {
      ok: false,
      error: error.message
    }
  }
}


// import { db, auth } from "@/firebase/config"
// import {
//   doc,
//   setDoc,
//   getDoc,
//   updateDoc,
//   arrayUnion
// } from "firebase/firestore"

// export const agregarTareaUsuario = async (tarea) => {
//   try {
//     const user = auth.currentUser
//     if (!user) {
//       return { ok: false, error: "Usuario no autenticado" }
//     }
//     const uid = user.uid
//     const docRef = doc(db, "users", uid)

//     const snap = await getDoc(docRef)

//     if (!snap.exists()) {
//       await setDoc(docRef, {
//         tasks: []
//       })
//     }
//     if (tarea.completed === true) {
//       return { ok: false, error: "No se puede añadir tareas finalizadas"}
//     }

//     await updateDoc(docRef, {
//       tasks: arrayUnion({
//         id: tarea.id,
//         todo: tarea.todo,
//         completed: tarea.completed
//       })
//     })
//     return { ok: true }
//   } catch (error) {
//     console.log("❌ Firestore ⚠️⚠️:", error)
//     return { ok: false, error: error.message }
//   }
// }

// export const obtenerTareasUsuario = async () => {
//   try {
//     const user = auth.currentUser
//     if (!user) {
//       return { ok: false, error: "No autenticado" }
//     }
//     const docRef = doc(db, "users", user.uid)
//     const snap = await getDoc(docRef)

//     if (snap.exists()) {
//       return {
//         ok: true,
//         tareas: snap.data().tasks || []
//       }
//     }
//     return { ok: true, tareas: [] }
//   } catch (error) {
//     console.log("❌ Firestore:", error)
//     return { ok: false, error: error.message }
//   }
// }

