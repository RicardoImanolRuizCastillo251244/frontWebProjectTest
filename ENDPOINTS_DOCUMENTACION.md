# 🔗 ENDPOINTS API - CourtMatch Backend

## 📚 Documentación Completa de Endpoints

Prefijo global: `/api`

---

## 🟢 STATUS - Verificación de Servidor

### 1. Verificar Estado del Servidor
**Ruta:** `GET /api/status`  
**Autenticación:** No requerida  
**Descripción:** Verifica que el servidor y la base de datos estén funcionando correctamente

**Request:**
```json
// Sin body - Solo GET
```

**Response (200 OK):**
```json
{
  "status": "Conexión exitosa",
  "database": "MySQL Conectada (Sequelize)",
  "timestamp": "2026-03-27T10:30:45.123Z",
  "mensaje": "¡Todo listo para las retas!",
  "estadisticas": {
    "deportes": 15,
    "jugadores": 145,
    "partidos": 32
  }
}
```

**Response (500 Error):**
```json
{
  "status": "Error",
  "database": "Desconectada",
  "detalle": "Error de conexión a MySQL",
  "timestamp": "2026-03-27T10:30:45.123Z"
}
```

---

## 🔐 AUTH - Autenticación

### 2. Login - Obtener Token JWT
**Ruta:** `POST /api/auth/login`  
**Autenticación:** No requerida  
**Descripción:** Autentica al usuario y devuelve un token JWT

**Request Body:**
```json
{
  "nombreUsuario": "juan_perez",
  "contrasena": "MiContraseña123"
}
```

**Response (200 OK):**
```json
{
  "mensaje": "¡Bienvenido a CourtMatch!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXN1YXJpbyI6Imp1YW5fcGVyZXoiLCJpYXQiOjE2Nzg2MjM0NDUsImV4cCI6MTY3ODYzMDY0NX0.sL5xL9d1yZkL9mZkL9d1yZkL9mZkL9d1yZkL9...",
  "idUser": 1
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Usuario y contraseña son obligatorios"
}
```

**Response (401 Unauthorized):**
```json
{
  "error": "Usuario o contraseña incorrectos"
}
```

---

## 👥 JUGADORES - Gestión de Jugadores

### 3. Registrar Nuevo Jugador
**Ruta:** `POST /api/jugadores/registro`  
**Autenticación:** No requerida  
**Descripción:** Crea un nuevo usuario jugador en el sistema

**Request Body:**
```json
{
  "nombreUsuario": "juan_perez",
  "correo": "juan@example.com",
  "contrasena": "MiContraseña123",
  "idUbicacion": 5,
  "idDeporteFavorito": 2
}
```

**Response (201 Created):**
```json
{
  "mensaje": "Jugador creado con éxito",
  "jugador": {
    "idUser": 42,
    "nombreUsuario": "juan_perez",
    "correo": "juan@example.com"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "error": "El usuario o el correo ya están registrados."
}
```

```json
{
  "error": "idUbicacion es obligatorio"
}
```

**Response via Socket.IO:**
```json
{
  "evento": "nuevoJugador",
  "mensaje": "¡Bienvenido a CourtMatch, juan_perez!",
  "usuario": "juan_perez"
}
```

---

### 4. Obtener Todos los Jugadores
**Ruta:** `GET /api/jugadores/`  
**Autenticación:** No requerida  
**Descripción:** Lista todos los jugadores registrados con sus information

**Request:**
```json
// Sin body - Solo GET
```

**Response (200 OK):**
```json
[
  {
    "idUser": 1,
    "nombreUsuario": "carlos_lopez",
    "correo": "carlos@example.com",
    "idDeporteFavorito": 2,
    "idUbicacion": 3,
    "partidosJugados": 15,
    "partidosGanados": 9,
    "Deporte": {
      "nombreDeporte": "Fútbol"
    },
    "Lugar": {
      "nombre": "Cancha Central"
    }
  },
  {
    "idUser": 2,
    "nombreUsuario": "juan_perez",
    "correo": "juan@example.com",
    "idDeporteFavorito": 3,
    "idUbicacion": 5,
    "partidosJugados": 8,
    "partidosGanados": 5,
    "Deporte": {
      "nombreDeporte": "Tenis"
    },
    "Lugar": {
      "nombre": "Cancha Deportiva Norte"
    }
  }
]
```

**Response (500 Error):**
```json
{
  "error": "Hubo un error al obtener los jugadores"
}
```

---

### 5. Obtener Partidos de un Jugador
**Ruta:** `GET /api/jugadores/:id/partidos`  
**Autenticación:** No requerida  
**Descripción:** Obtiene todos los partidos en los que participa un jugador específico

**Request:**
```json
// Path parameter: id = 1
// Sin body - Solo GET
```

**Response (200 OK):**
```json
{
  "jugador": "juan_perez",
  "misPartidos": [
    {
      "idMatch": 15,
      "idDeporte": 2,
      "fecha": "2026-03-28",
      "hora": "18:00",
      "lugar": "Cancha Sur",
      "maxJugadores": 10
    },
    {
      "idMatch": 18,
      "idDeporte": 3,
      "fecha": "2026-03-29",
      "hora": "15:30",
      "lugar": "Cancha Tenis Central",
      "maxJugadores": 4
    }
  ]
}
```

**Response (404 Not Found):**
```json
{
  "error": "Jugador no encontrado"
}
```

**Response (500 Error):**
```json
{
  "error": "Error al obtener los partidos del jugador"
}
```

---

## 🎾 DEPORTES - Gestión de Deportes

### 6. Obtener Todos los Deportes
**Ruta:** `GET /api/deportes/`  
**Autenticación:** No requerida  
**Descripción:** Lista todos los deportes disponibles en CourtMatch

**Request:**
```json
// Sin body - Solo GET
```

**Response (200 OK):**
```json
[
  {
    "idDeporte": 1,
    "nombreDeporte": "Fútbol",
    "descripcion": "Fútbol de 5 o 11 jugadores",
    "createdAt": "2026-03-20T08:00:00.000Z"
  },
  {
    "idDeporte": 2,
    "nombreDeporte": "Tenis",
    "descripcion": "Tenis individual o dobles",
    "createdAt": "2026-03-20T08:00:00.000Z"
  },
  {
    "idDeporte": 3,
    "nombreDeporte": "Básquetbol",
    "descripcion": "Básquet de cancha completa",
    "createdAt": "2026-03-20T08:00:00.000Z"
  },
  {
    "idDeporte": 4,
    "nombreDeporte": "Voleibol",
    "descripcion": "Voleibol de playa o cancha",
    "createdAt": "2026-03-20T08:00:00.000Z"
  }
]
```

**Response (500 Error):**
```json
{
  "error": "Error al obtener los deportes"
}
```

---

### 7. Crear Deporte (NO PERMITIDO)
**Ruta:** `POST /api/deportes/`  
**Autenticación:** No requerida  
**Descripción:** Los deportes no se pueden crear porque son una colección predefinida

**Request Body:**
```json
{
  "nombreDeporte": "Pádel"
}
```

**Response (405 Method Not Allowed):**
```json
{
  "error": "No se permite crear deportes. Estos datos son una colección predefinida."
}
```

---

## 📍 LUGARES - Gestión de Lugares

### 8. Obtener Todos los Lugares
**Ruta:** `GET /api/lugares/listar`  
**Autenticación:** No requerida  
**Descripción:** Lista todos los lugares (canchas) disponibles

**Request:**
```json
// Sin body - Solo GET
```

**Response (200 OK):**
```json
[
  {
    "idLugar": 1,
    "nombre": "Cancha Central",
    "ubicacion": "Av. Libertador 1234, CDMX",
    "coordenadas": "19.4326° N, 99.1332° W",
    "servicios": "Estacionamiento, Vestuarios, Cafetería"
  },
  {
    "idLugar": 2,
    "nombre": "Cancha Deportiva Norte",
    "ubicacion": "Blvd. Paseo de la Reforma 505, CDMX",
    "coordenadas": "19.4450° N, 99.1250° W",
    "servicios": "Iluminación nocturna, Agua potable"
  },
  {
    "idLugar": 3,
    "nombre": "Cancha Sur",
    "ubicacion": "Av. Xola 5000, CDMX",
    "coordenadas": "19.3500° N, 99.1500° W",
    "servicios": "Estacionamiento, Tienda"
  }
]
```

**Response (500 Error):**
```json
{
  "error": "Hubo un error al obtener los lugares"
}
```

---

### 9. Obtener Lugar por ID
**Ruta:** `GET /api/lugares/:idLugar`  
**Autenticación:** No requerida  
**Descripción:** Obtiene los detalles de un lugar específico

**Request:**
```json
// Path parameter: idLugar = 1
// Sin body - Solo GET
```

**Response (200 OK):**
```json
{
  "idLugar": 1,
  "nombre": "Cancha Central",
  "ubicacion": "Av. Libertador 1234, CDMX",
  "coordenadas": "19.4326° N, 99.1332° W",
  "servicios": "Estacionamiento, Vestuarios, Cafetería",
  "capacidad": 100,
  "horarioApertura": "06:00",
  "horarioCierre": "23:00"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Lugar no encontrado"
}
```

**Response (500 Error):**
```json
{
  "error": "Error al obtener el lugar"
}
```

---

## ⚽ PARTIDOS - Gestión de Partidos

### 10. Crear Nuevo Partido
**Ruta:** `POST /api/partidos/programar`  
**Autenticación:** ✅ **REQUERIDA** (JWT Token)  
**Descripción:** Programa un nuevo partido/reta

**Headers Requeridos:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body:**
```json
{
  "idDeporte": 2,
  "fecha": "2026-03-28",
  "hora": "18:00",
  "lugar": "Cancha Sur",
  "maxJugadores": 10
}
```

**Response (201 Created):**
```json
{
  "mensaje": "¡Partido programado con éxito!",
  "partido": {
    "idMatch": 72,
    "idDeporte": 2,
    "fecha": "2026-03-28",
    "hora": "18:00",
    "lugar": "Cancha Sur",
    "maxJugadores": 10
  }
}
```

**Response (400 Bad Request):**
```json
{
  "error": "El deporte seleccionado no existe en la base de datos."
}
```

**Response (403 Unauthorized):**
```json
{
  "error": "Acceso denegado. No se proporcionó un token."
}
```

**Response via Socket.IO:**
```json
{
  "evento": "nuevaReta",
  "mensaje": "¡Nueva reta programada!",
  "detalles": {
    "lugar": "Cancha Sur",
    "fecha": "2026-03-28",
    "hora": "18:00"
  }
}
```

---

### 11. Obtener Todos los Partidos
**Ruta:** `GET /api/partidos/`  
**Autenticación:** ✅ **REQUERIDA** (JWT Token)  
**Descripción:** Lista todos los partidos disponibles

**Headers Requeridos:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request:**
```json
// Sin body - Solo GET
```

**Response (200 OK):**
```json
[
  {
    "idMatch": 70,
    "idDeporte": 1,
    "fecha": "2026-03-27",
    "hora": "16:00",
    "lugar": "Cancha Central",
    "maxJugadores": 11
  },
  {
    "idMatch": 71,
    "idDeporte": 2,
    "fecha": "2026-03-28",
    "hora": "18:00",
    "lugar": "Cancha Tenis",
    "maxJugadores": 4
  },
  {
    "idMatch": 72,
    "idDeporte": 3,
    "fecha": "2026-03-29",
    "hora": "15:30",
    "lugar": "Cancha Sur",
    "maxJugadores": 10
  }
]
```

**Response (401 Unauthorized):**
```json
{
  "error": "Token inválido o expirado."
}
```

**Response (500 Error):**
```json
{
  "error": "Error al obtener los partidos",
  "detalle": "Descripción del error"
}
```

---

## 📝 PARTICIPACIONES - Gestión de Participaciones

### 12. Unirse a un Partido
**Ruta:** `POST /api/participaciones/inscribir`  
**Autenticación:** No requerida  
**Descripción:** Inscribe a un jugador en un partido específico

**Request Body:**
```json
{
  "idUser": 5,
  "idMatch": 72,
  "nombreEquipo": "Equipo A"
}
```

**Response (201 Created):**
```json
{
  "mensaje": "¡Te has unido al partido con éxito!",
  "detalle": {
    "idParticipacion": 156,
    "idUser": 5,
    "idMatch": 72,
    "nombreEquipo": "Equipo A"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Ya estás inscrito en este partido."
}
```

```json
{
  "error": "Faltan datos: idUser e idMatch son obligatorios"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Jugador o Partido no encontrado"
}
```

**Response via Socket.IO:**
```json
{
  "evento": "jugadorUnido",
  "mensaje": "¡carlos_lopez se ha unido a la reta!",
  "lugar": "Cancha Sur",
  "idMatch": 72
}
```

---

## 📊 RESUMEN DE ENDPOINTS

| # | Método | Ruta | Autenticación | Descripción |
|---|--------|------|---------------|-------------|
| 1 | GET | `/api/status` | ❌ | Verificar servidor |
| 2 | POST | `/api/auth/login` | ❌ | Login y obtener token |
| 3 | POST | `/api/jugadores/registro` | ❌ | Registrar jugador |
| 4 | GET | `/api/jugadores/` | ❌ | Listar jugadores |
| 5 | GET | `/api/jugadores/:id/partidos` | ❌ | Partidos de un jugador |
| 6 | GET | `/api/deportes/` | ❌ | Listar deportes |
| 7 | POST | `/api/deportes/` | ❌ | Crear deporte (NO PERMITIDO) |
| 8 | GET | `/api/lugares/listar` | ❌ | Listar lugares |
| 9 | GET | `/api/lugares/:idLugar` | ❌ | Obtener lugar por ID |
| 10 | POST | `/api/partidos/programar` | ✅ | Crear partido |
| 11 | GET | `/api/partidos/` | ✅ | Listar partidos |
| 12 | POST | `/api/participaciones/inscribir` | ❌ | Inscribirse a partido |

---

## 🔑 Tipos de Validación

### Headers Requeridos para Autenticación:
```json
{
  "Authorization": "Bearer {TOKEN_JWT}",
  "Content-Type": "application/json"
}
```

### Error Responses por Código:

#### 400 Bad Request
```json
{
  "error": "Descripción del error de validación"
}
```

#### 401 Unauthorized
```json
{
  "error": "Token inválido o expirado."
}
```

#### 403 Forbidden
```json
{
  "error": "Acceso denegado. No se proporcionó un token."
}
```

#### 404 Not Found
```json
{
  "error": "Recurso no encontrado"
}
```

#### 405 Method Not Allowed
```json
{
  "error": "No se permite esta operación"
}
```

#### 500 Internal Server Error
```json
{
  "ok": false,
  "message": "Error interno del servidor"
}
```

---

## 🔌 Socket.IO EVENTOS

### Eventos Emitidos por el Servidor:

**`nuevoJugador`**
```json
{
  "mensaje": "¡Bienvenido a CourtMatch, {nombreUsuario}!",
  "usuario": "juan_perez"
}
```

**`nuevaReta`**
```json
{
  "mensaje": "¡Nueva reta programada!",
  "detalles": {
    "lugar": "Cancha Sur",
    "fecha": "2026-03-28",
    "hora": "18:00"
  }
}
```

**`jugadorUnido`**
```json
{
  "mensaje": "¡{nombreUsuario} se ha unido a la reta!",
  "lugar": "Cancha Sur",
  "idMatch": 72
}
```

---

## 📋 FLUJO DE USO TÍPICO

1. **GET** `/api/status` → Verificar que server está up
2. **POST** `/api/auth/login` → Obtener JWT token
3. **GET** `/api/deportes/` → Ver deportes disponibles
4. **GET** `/api/lugares/listar` → Ver canchas
5. **POST** `/api/jugadores/registro` → Registrar nuevo usuario
6. **GET** `/api/jugadores/` → Ver otros jugadores
7. **POST** `/api/partidos/programar` → Crear partido (con auth)
8. **GET** `/api/partidos/` → Ver partidos disponibles (con auth)
9. **POST** `/api/participaciones/inscribir` → Unirse a partido
10. **GET** `/api/jugadores/:id/partidos` → Ver mis partidos

---

## 🚀 Ejemplo Completo - Cliente JavaScript

```javascript
// 1. Login
const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombreUsuario: 'juan_perez',
    contrasena: 'MiContraseña123'
  })
});
const { token } = await loginResponse.json();

// 2. Crear partido (requiere autenticación)
const createMatchResponse = await fetch('http://localhost:3000/api/partidos/programar', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    idDeporte: 2,
    fecha: '2026-03-28',
    hora: '18:00',
    lugar: 'Cancha Sur',
    maxJugadores: 10
  })
});
const { partido } = await createMatchResponse.json();

// 3. Inscribirse a partido
const joinResponse = await fetch('http://localhost:3000/api/participaciones/inscribir', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    idUser: 5,
    idMatch: partido.idMatch,
    nombreEquipo: 'Equipo A'
  })
});
const resultado = await joinResponse.json();
console.log(resultado);
```

