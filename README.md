## TaskBoard (Vue 3 + Firebase + Vercel) Aplicación web ==> tablón de tareas
1) usuario se registra o inicia sesión
2) cuando el correo está verificado usuario puede entrar a la parte privada de la app. Una vez dentro, usuario puede ver una lista de tareas, filtrarlas y asignarse algunas a su área de trabajo.

## tecnologias usadas
- Vue 3
- Vue Router
- Pinia
- Firebase Authentication + Firestore
- Axios
- Vercel (deploy)
- SASS

## Funcionalidades
- Registro de usuarios con email y contraseña
- Comprobación de verificación de email
- Rutas protegidas
- Obtención de tareas desde una API externa
- Filtro de tareas
- Asignación de tareas al usuario
- Área de trabajo personal (workspace)

## Rutas de la aplicación
- "/register" ==> crear cuenta
- "/login" ==> iniciar sesión
- "/"" ==> tablón de tareas (protegida)
- "/workspace" ==> tareas asignadas al usuario (protegida)

## API de tareas

https://dummyjson.com/todos

Cada tarea muestra:
- texto de la tarea
- si está completada o no

## Firestore (estructura)
Se usa una colección "users"
Lista ==> tasks que guarda un objeto que ==> contiene completed(true/false), id(number), todo(string)

---------------------------------------------------------------------------------------------
# Proyecto-Final-DWEC

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
