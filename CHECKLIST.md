# CHECKLIST.md — Lista de Verificación del Proyecto Integrador
*Marcá con una [x] los puntos que hayas completado antes de grabar tu video.*

---

## ✅ Backend (FastAPI + SQLModel)

- [✅] **Entorno:** Uso de `.venv`, `requirements.txt` y FastAPI funcionando en modo dev (`uvicorn main:app --reload`).
- [✅] **Modelado:** Tablas creadas con SQLModel incluyendo relaciones `Relationship` (1:N y N:N).
- [✅] **Validación:** Uso de `Annotated`, `Query` y `Path` para reglas de negocio (ej. longitudes, rangos, `gt=0`).
- [✅] **CRUD Persistente:** Endpoints funcionales para Crear, Leer, Actualizar y Borrar en PostgreSQL.
- [✅] **Seguridad de Datos:** Implementación de `response_model` para no filtrar datos sensibles o innecesarios.
- [✅] **Estructura:** Código organizado por módulos (`routers/`, `schemas/`, `services/`, `models/`, `uow.py`).
- [✅] **Manejo de Errores:** Uso de `HTTPException` con códigos de estado correctos (404, 422, 201, 204).

---

## ✅ Frontend (React + TypeScript + Tailwind)

- [✅] **Setup:** Proyecto creado con Vite + TypeScript y estructura de carpetas limpia.
- [✅] **Componentes:** Uso de componentes funcionales con estado local tipado con interfaces TypeScript.
- [✅] **Estilos:** Interfaz construida con Tailwind CSS 4, responsive y con diseño consistente.
- [✅] **Navegación:** Configuración de `react-router-dom` con rutas definidas (`/categorias`, `/productos`, `/ingredientes`).
- [✅] **Estado Local:** Uso de `useState` para el manejo de formularios e interactividad de la UI.
- [✅] **Integración Real:** El frontend consume datos reales del backend (sin mock data).
- [✅] **Tipado:** Interfaces definidas en `types/index.ts` y usadas en todos los componentes y funciones de API.

---

## ✅ Funcionalidades CRUD

- [✅] **Categorías:** Crear, editar, eliminar. Soporte de categoría padre-hijo.
- [✅] **Ingredientes:** Crear, editar (nombre + descripción), eliminar.
- [✅] **Productos:** Crear, editar (todos los campos incluyendo ingredientes), eliminar.
- [X] **Eliminación en cascada:** Al eliminar una categoría, se eliminan sus productos y sus relaciones con ingredientes.

---

## ✅ Demo en Vivo

- [✅] Flujo de **Crear → Editar → Eliminar** mostrado en al menos un módulo.
- [✅] Se muestra que los datos relacionados aparecen en la UI (ej. categoría e ingredientes en la tarjeta del producto).
- [X] Se intenta cargar un dato inválido para demostrar que la validación funciona.
- [X] La consola del navegador o la terminal del backend está visible para validar las peticiones.

---

## ✅ Entrega

- [✅] Video subido a YouTube (oculto/unlisted) o Google Drive con permisos de lectura.
- [✅] Link del repositorio GitHub: `https://github.com/JeroTomas/Parcial-PROG4`
- [✅] `requirements.txt` incluido en el repositorio.
- [X] `README.md` configurado con instrucciones para levantar el proyecto.
- [✅] `CHECKLIST.md` completo en la raíz del repositorio.
