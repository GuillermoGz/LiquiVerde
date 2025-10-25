# 🛒 LiquiVerde – Optimizador de Compras Sustentables

Aplicación web que permite al usuario optimizar su compra considerando **presupuesto** y **criterios de sostenibilidad**, utilizando algoritmos inteligentes para mejorar las decisiones de compra.

---

## 🚀 Ejecución local

### ✅ Prerrequisitos
- Node.js 18+
- MongoDB local
- Git

### 📌 Instalación

1. Clonar el repositorio  
   git clone https://github.com/GuillermoGz/LiquiVerde.git
   cd LiquiVerde

2. Instalar dependencias  
   Backend:  
   cd server  
   npm install  
   Frontend:  
   cd ../client  
   npm install

3. Ejecutar servidor backend y frontend eb la carpeta raiz(LiquiVerde)
   npm run dev

✅ Una vez levantado:  
Frontend → http://localhost:5173  
Backend → http://localhost:4000/api

---
## 🔑 Variables de entorno (.env)

Crear archivo `.env` dentro de `/server` con:

MONGO_URI=mongodb://localhost:27017/liquiverde

⚠️ Nunca subir este archivo al repositorio público

---

## 🧠 Algoritmos implementados

### 🔹 Optimización del carrito (Knapsack Problem)

Se aplica un algoritmo que maximiza el **puntaje de sustentabilidad** de los productos sin superar el presupuesto.

📌 Score calculado con ponderación de:  
- 🌱 Ambiental  
- 🤝 Social  
- 💚 Económico  

Función objetivo:  
Maximizar ∑ scoreᵢ  
Sujeto a: ∑ priceᵢ ≤ budget

---

### 🔹 Recomendación de productos

Para cada producto del carrito:
- Se buscan alternativas con **mejor score**
- Igual o menor precio
- Misma categoría

El sistema muestra sugerencias con la mejora posible para cada caso.

---

## 📂 Dataset incluido

El repositorio contiene datos de prueba en:

/server/src/data/products.json

Estos se pueden ampliar con nuevos productos.

---

## 🛠️ Tecnologías utilizadas

| Área | Tecnologías |
|------|-------------|
| Frontend | React, Vite, TailwindCSS, Axios |
| Backend | Node.js, Express, MongoDB, Mongoose |

---

## 🤖 Uso de IA

Este trabajo recibió apoyo de la IA **ChatGPT (Modelo GPT-5)** en:

- Documentación (este README)
- Explicación del algoritmo de optimización
- Guía para estructura de backend y frontend
- Soporte en debugging

📝 Todo el código fue programado manualmente por el desarrollador.

---

