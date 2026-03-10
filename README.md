# Quiz Router (React + TypeScript)

Aplicación de trivia tipo “quiz” creada para practicar **rutas**, **estado global** con `useReducer + Context`, y **consumo de API** con `fetch`.

El flujo es: **Home → Settings → Quiz → Result**, con manejo de estados **loading/error** y persistencia del estado con **localStorage**.

---

## 🚀 Funcionalidades

- ✅ Rutas con React Router:
  - `/` Home
  - `/settings` Configuración (cantidad/dificultad)
  - `/quiz` Preguntas
  - `/result` Resultado final
  - `*` Página 404
- ✅ Carga de preguntas desde API (Open Trivia DB)
- ✅ Estado global con `Context + useReducer`
- ✅ Persistencia con `localStorage` (se guarda el progreso/estado)
- ✅ Manejo de estados:
  - `idle` (sin preguntas)
  - `loading` (cargando preguntas)
  - `ready` (lista de preguntas cargada)
  - `error` (error al cargar)
- ✅ Progreso: “Pregunta X de N”
- ✅ Selección de respuesta + botón “Siguiente”
- ✅ Resultado final con cantidad de aciertos
- ✅ Reiniciar / volver a empezar

---

## 🧰 Tecnologías usadas

- **React** + **TypeScript**
- **Vite**
- **React Router DOM**
- **Context API + useReducer**
- **localStorage**
- API: **Open Trivia DB**

---

## ⚙️ Instalación y ejecución

### 1) Clonar el repo

```bash
git clone https://github.com/osomoya94/challengesReto1.git
```
