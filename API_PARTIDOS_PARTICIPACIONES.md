# API — Partidos y Participaciones

Base URL: `/api`  
Todos los endpoints requieren `Authorization: Bearer <token>` salvo que se indique lo contrario.

---

## Índice

### Partidos
1. [GET /partidos](#1-get-partidos)
2. [GET /partidos/:idMatch](#2-get-partidosidmatch)
3. [GET /partidos/:idMatch/creador](#3-get-partidosidmatchcreador)
4. [GET /partidos/:idMatch/participantes](#4-get-partidosidmatchparticipantes)
5. [POST /partidos/programar](#5-post-partidosprogramar)
6. [POST /partidos/:idMatch/unirse](#6-post-partidosidmatchunirse)
7. [DELETE /partidos/:idMatch](#7-delete-partidosidmatch)
8. [PATCH /partidos/:idMatch/estado](#8-patch-partidosidmatchestado)
9. [GET /partidos/usuario/:idUser/creados](#9-get-partidosusuarioidusercreados)
10. [GET /partidos/usuario/:idUser/participando](#10-get-partidosusuarioiduserparticipando)
11. [GET /partidos/usuario/:idUser/historial](#11-get-partidosusuarioiduserhistorial)

### Participaciones
12. [POST /participaciones/inscribir](#12-post-participacionesinscribir)
13. [GET /participaciones/:idMatch](#13-get-participacionesidmatch)
14. [DELETE /participaciones/:idParticipacion](#14-delete-participacionesidparticipacion)

---

## PARTIDOS

---

### 1. GET /partidos

**Contexto:** Devuelve todos los partidos en estado `programado` o `en_curso`, ordenados por fecha/hora ascendente. Paginado. Cada partido incluye el nombre calculado (`<Deporte> - <Lugar>`), el conteo de participantes actuales y los datos de deporte y lugar.

**Request**

```
GET /api/partidos?page=1&limit=10
Authorization: Bearer <token>
```

| Query param | Tipo | Requerido | Descripción |
|---|---|---|---|
| `page` | number | No (default 1) | Página actual |
| `limit` | number | No (default 10) | Resultados por página |

**Response `200`**

```json
{
  "ok": true,
  "statusCode": 200,
  "message": "Partidos obtenidos exitosamente",
  "data": [
    {
      "idMatch": 1,
      "idDeporte": 2,
      "fecha": "2026-04-10",
      "hora": "18:00:00",
      "idLugar": 3,
      "maxJugadores": 10,
      "idCreador": 5,
      "estado": "programado",
      "motivoCancelacion": null,
      "participantesActuales": 4,
      "Deporte": { "idDeporte": 2, "nombreDeporte": "Fútbol" },
      "Lugar":   { "idLugar": 3,  "nombre": "Cancha Central" }
    }
  ],
  "pagination": {
    "total": 25,
    "pages": 3,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

**Errores posibles**

| Código | Causa |
|---|---|
| `401` | Token inválido o ausente |

---

### 2. GET /partidos/:idMatch

**Contexto:** Devuelve el detalle completo de un partido específico. Incluye el campo calculado `nombre` (`"<Deporte> - <Lugar>"`), `participantesActuales` y `cuposDisponibles`.

**Request**

```
GET /api/partidos/1
Authorization: Bearer <token>
```

| Param | Tipo | Descripción |
|---|---|---|
| `idMatch` | number | ID del partido |

**Response `200`**

```json
{
  "ok": true,
  "statusCode": 200,
  "message": "Partido obtenido exitosamente",
  "data": {
    "idMatch": 1,
    "nombre": "Fútbol - Cancha Central",
    "idDeporte": 2,
    "fecha": "2026-04-10",
    "hora": "18:00:00",
    "idLugar": 3,
    "maxJugadores": 10,
    "idCreador": 5,
    "estado": "programado",
    "motivoCancelacion": null,
    "participantesActuales": 4,
    "cuposDisponibles": 6,
    "Deporte": { "idDeporte": 2, "nombreDeporte": "Fútbol" },
    "Lugar":   { "idLugar": 3,  "nombre": "Cancha Central" }
  }
}
```

**Errores posibles**

| Código | Causa |
|---|---|
| `401` | Token inválido o ausente |
| `404` | Partido no encontrado |

---

### 3. GET /partidos/:idMatch/creador

**Contexto:** Devuelve la información del jugador que creó el partido.

**Request**

```
GET /api/partidos/1/creador
Authorization: Bearer <token>
```

| Param | Tipo | Descripción |
|---|---|---|
| `idMatch` | number | ID del partido |

**Response `200`**

```json
{
  "ok": true,
  "statusCode": 200,
  "message": "Creador obtenido exitosamente",
  "data": {
    "idUser": 5,
    "nombreUsuario": "juan_perez",
    "correo": "juan@mail.com",
    "idUbicacion": 2
  }
}
```

**Errores posibles**

| Código | Causa |
|---|---|
| `401` | Token inválido o ausente |
| `404` | Partido o creador no encontrado |

---

### 4. GET /partidos/:idMatch/participantes

**Contexto:** Lista todos los jugadores inscritos en un partido. Cada registro indica si el jugador es el creador (`esCreador`).

**Request**

```
GET /api/partidos/1/participantes
Authorization: Bearer <token>
```

| Param | Tipo | Descripción |
|---|---|---|
| `idMatch` | number | ID del partido |

**Response `200`**

```json
{
  "ok": true,
  "statusCode": 200,
  "message": "Participantes obtenidos exitosamente",
  "data": [
    {
      "idParticipacion": 10,
      "nombreEquipo": "A",
      "usuario": {
        "idUser": 5,
        "nombreUsuario": "juan_perez",
        "correo": "juan@mail.com",
        "idUbicacion": 2
      },
      "esCreador": true
    },
    {
      "idParticipacion": 11,
      "nombreEquipo": "B",
      "usuario": {
        "idUser": 7,
        "nombreUsuario": "carlos_r",
        "correo": "carlos@mail.com",
        "idUbicacion": 1
      },
      "esCreador": false
    }
  ]
}
```

**Errores posibles**

| Código | Causa |
|---|---|
| `401` | Token inválido o ausente |
| `404` | Partido no encontrado |

---

### 5. POST /partidos/programar

**Contexto:** Crea un nuevo partido. El creador queda automáticamente inscrito en el equipo elegido (`equipoCreador`). Emite el evento Socket.IO `nuevaReta` a todos los clientes. Límite: 20 partidos por hora por usuario.

**Request**

```
POST /api/partidos/programar
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "idDeporte": 2,
  "fecha": "2026-04-10",
  "hora": "18:00",
  "idLugar": 3,
  "maxJugadores": 10,
  "equipoCreador": "A"
}
```

| Campo | Tipo | Requerido | Reglas |
|---|---|---|---|
| `idDeporte` | number | Sí | Debe existir en la tabla deportes |
| `fecha` | string | Sí | Formato `YYYY-MM-DD`, no puede ser fecha pasada |
| `hora` | string | Sí | Formato `HH:mm` |
| `idLugar` | number | Sí | Debe existir en la tabla lugares |
| `maxJugadores` | number | Sí | Entre 2 y 100 |
| `equipoCreador` | string | Sí | `"A"` o `"B"` |

**Response `201`**

```json
{
  "ok": true,
  "statusCode": 201,
  "message": "¡Partido programado exitosamente!",
  "data": {
    "idMatch": 1,
    "idDeporte": 2,
    "fecha": "2026-04-10",
    "hora": "18:00:00",
    "idLugar": 3,
    "maxJugadores": 10,
    "idCreador": 5,
    "estado": "programado",
    "motivoCancelacion": null,
    "creador": {
      "idUser": 5,
      "nombreUsuario": "juan_perez",
      "correo": "juan@mail.com"
    }
  }
}
```

**Errores posibles**

| Código | Causa |
|---|---|
| `400` | Validación fallida (fecha pasada, rango maxJugadores, equipo inválido) |
| `401` | Token inválido o ausente |
| `404` | Deporte o lugar no encontrado |
| `429` | Límite de 20 partidos/hora superado |

---

### 6. POST /partidos/:idMatch/unirse

**Contexto:** Inscribe al usuario autenticado en un partido existente. Valida que el partido esté en estado `programado`, que no esté lleno y que el usuario no esté ya inscrito. Emite el evento Socket.IO `nuevoParticipante`. Límite: 30 solicitudes por hora por usuario.

**Request**

```
POST /api/partidos/1/unirse
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "equipo": "B"
}
```

| Campo | Tipo | Requerido | Reglas |
|---|---|---|---|
| `equipo` | string | Sí | `"A"` o `"B"` |

| Param | Tipo | Descripción |
|---|---|---|
| `idMatch` | number | ID del partido |

**Response `201`**

```json
{
  "ok": true,
  "statusCode": 201,
  "message": "¡Te has unido al partido exitosamente!",
  "data": {
    "participacion": {
      "idParticipacion": 12,
      "idUser": 7,
      "idMatch": 1,
      "nombreEquipo": "B"
    },
    "jugador": {
      "nombreUsuario": "carlos_r",
      "correo": "carlos@mail.com"
    },
    "partido": {
      "lugar": null,
      "fecha": "2026-04-10",
      "hora": "18:00:00",
      "maxJugadores": 10,
      "participantesActuales": 2,
      "cuposDisponibles": 8
    }
  }
}
```

**Errores posibles**

| Código | Causa |
|---|---|
| `400` | Partido no está en estado `programado` |
| `401` | Token inválido o ausente |
| `404` | Partido o jugador no encontrado |
| `409` | Ya estás inscrito / Partido lleno |
| `429` | Límite de 30 inscripciones/hora superado |

---

### 7. DELETE /partidos/:idMatch

**Contexto:** Cancela un partido completo. Solo puede hacerlo el creador. Solo funciona si el partido está en estado `programado`. Emite el evento Socket.IO `partidoCancelado`.

**Request**

```
DELETE /api/partidos/1
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "motivoCancelacion": "No hay cancha disponible"
}
```

| Campo | Tipo | Requerido | Reglas |
|---|---|---|---|
| `motivoCancelacion` | string | Sí | Razón de la cancelación |

| Param | Tipo | Descripción |
|---|---|---|
| `idMatch` | number | ID del partido |

**Response `200`**

```json
{
  "ok": true,
  "statusCode": 200,
  "message": "Partido cancelado exitosamente",
  "data": {
    "idMatch": 1,
    "estado": "cancelado",
    "motivoCancelacion": "No hay cancha disponible"
  }
}
```

**Errores posibles**

| Código | Causa |
|---|---|
| `400` | El partido no está en estado `programado` / el usuario no es el creador |
| `401` | Token inválido o ausente |
| `404` | Partido no encontrado |

---

### 8. PATCH /partidos/:idMatch/estado

**Contexto:** Cambia el estado de un partido. Solo el creador o un administrador puede hacerlo. Si el nuevo estado es `cancelado`, el campo `motivoCancelacion` es obligatorio.

**Estados válidos:** `programado` → `en_curso` → `finalizado` → `cancelado`

**Request**

```
PATCH /api/partidos/1/estado
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "estado": "en_curso",
  "motivoCancelacion": null
}
```

| Campo | Tipo | Requerido | Reglas |
|---|---|---|---|
| `estado` | string | Sí | `"programado"`, `"en_curso"`, `"finalizado"` o `"cancelado"` |
| `motivoCancelacion` | string | Solo si estado = `"cancelado"` | Razón del cambio |

| Param | Tipo | Descripción |
|---|---|---|
| `idMatch` | number | ID del partido |

**Response `200`**

```json
{
  "ok": true,
  "statusCode": 200,
  "message": "Estado del partido actualizado",
  "data": {
    "idMatch": 1,
    "estado": "en_curso",
    "motivoCancelacion": null
  }
}
```

**Errores posibles**

| Código | Causa |
|---|---|
| `400` | Estado inválido / usuario no es creador ni admin / falta `motivoCancelacion` al cancelar |
| `401` | Token inválido o ausente |
| `404` | Partido no encontrado |

---

### 9. GET /partidos/usuario/:idUser/creados

**Contexto:** Lista todos los partidos que un usuario específico ha creado, ordenados por fecha descendente. Paginado.

**Request**

```
GET /api/partidos/usuario/5/creados?page=1&limit=10
Authorization: Bearer <token>
```

| Param | Tipo | Descripción |
|---|---|---|
| `idUser` | number | ID del usuario |

| Query param | Tipo | Requerido | Descripción |
|---|---|---|---|
| `page` | number | No (default 1) | Página actual |
| `limit` | number | No (default 10) | Resultados por página |

**Response `200`**

```json
{
  "ok": true,
  "statusCode": 200,
  "message": "Partidos creados obtenidos",
  "data": [
    {
      "idMatch": 1,
      "fecha": "2026-04-10",
      "hora": "18:00:00",
      "estado": "programado",
      "maxJugadores": 10,
      "Deporte": { "idDeporte": 2, "nombreDeporte": "Fútbol" },
      "Lugar":   { "idLugar": 3,  "nombre": "Cancha Central" }
    }
  ],
  "pagination": {
    "total": 5,
    "pages": 1,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

**Errores posibles**

| Código | Causa |
|---|---|
| `401` | Token inválido o ausente |

---

### 10. GET /partidos/usuario/:idUser/participando

**Contexto:** Lista los partidos en los que un usuario participa como jugador (excluyendo los que él creó). Paginado.

**Request**

```
GET /api/partidos/usuario/7/participando?page=1&limit=10
Authorization: Bearer <token>
```

| Param | Tipo | Descripción |
|---|---|---|
| `idUser` | number | ID del usuario |

| Query param | Tipo | Requerido | Descripción |
|---|---|---|---|
| `page` | number | No (default 1) | Página actual |
| `limit` | number | No (default 10) | Resultados por página |

**Response `200`**

```json
{
  "ok": true,
  "statusCode": 200,
  "message": "Partidos participando obtenidos",
  "data": [
    {
      "idMatch": 3,
      "fecha": "2026-04-12",
      "hora": "20:00:00",
      "estado": "programado",
      "maxJugadores": 8,
      "Deporte": { "idDeporte": 1, "nombreDeporte": "Básquetbol" },
      "Lugar":   { "idLugar": 2,  "nombre": "Polideportivo Norte" }
    }
  ],
  "pagination": {
    "total": 3,
    "pages": 1,
    "currentPage": 1,
    "pageSize": 10
  }
}
```

**Errores posibles**

| Código | Causa |
|---|---|
| `401` | Token inválido o ausente |

---

### 11. GET /partidos/usuario/:idUser/historial

**Contexto:** Combina los partidos creados y los partidos en los que participó el usuario en una sola lista ordenada por fecha descendente. Cada registro incluye el campo `tipo` (`"creado"` o `"participante"`) para distinguir el rol del usuario.

**Request**

```
GET /api/partidos/usuario/5/historial?page=1&limit=20
Authorization: Bearer <token>
```

| Param | Tipo | Descripción |
|---|---|---|
| `idUser` | number | ID del usuario |

| Query param | Tipo | Requerido | Descripción |
|---|---|---|---|
| `page` | number | No (default 1) | Página actual |
| `limit` | number | No (default 20) | Resultados por página |

**Response `200`**

```json
{
  "ok": true,
  "statusCode": 200,
  "message": "Historial de partidos obtenido",
  "data": [
    {
      "idMatch": 1,
      "fecha": "2026-04-10",
      "hora": "18:00:00",
      "idDeporte": 2,
      "nombreDeporte": "Fútbol",
      "lugarNombre": "Cancha Central",
      "maxJugadores": 10,
      "estado": "programado",
      "tipo": "creado"
    },
    {
      "idMatch": 3,
      "fecha": "2026-04-12",
      "hora": "20:00:00",
      "idDeporte": 1,
      "nombreDeporte": "Básquetbol",
      "lugarNombre": "Polideportivo Norte",
      "maxJugadores": 8,
      "estado": "finalizado",
      "tipo": "participante"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalRecords": 2
  }
}
```

**Errores posibles**

| Código | Causa |
|---|---|
| `401` | Token inválido o ausente |

---

## PARTICIPACIONES

---

### 12. POST /participaciones/inscribir

**Contexto:** Inscribe a un jugador en un partido. A diferencia de `POST /partidos/:idMatch/unirse`, aquí el `idUser` se pasa en el body explícitamente (no se toma del token). Aplica las mismas validaciones: estado `programado`, sin duplicados, con cupos disponibles. Emite el evento Socket.IO `jugadorUnido`. Límite: 30 inscripciones por hora por IP.

**Request**

```
POST /api/participaciones/inscribir
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "idUser": 7,
  "idMatch": 1,
  "nombreEquipo": "B"
}
```

| Campo | Tipo | Requerido | Reglas |
|---|---|---|---|
| `idUser` | number | Sí | Debe existir en la tabla jugadores |
| `idMatch` | number | Sí | Debe existir en la tabla partidos |
| `nombreEquipo` | string | No | `"A"` o `"B"` (puede ser `null`) |

**Response `201`**

```json
{
  "ok": true,
  "statusCode": 201,
  "message": "¡Te has unido al partido exitosamente!",
  "data": {
    "participacion": {
      "idParticipacion": 12,
      "idUser": 7,
      "idMatch": 1,
      "nombreEquipo": "B"
    },
    "jugador": {
      "nombreUsuario": "carlos_r",
      "correo": "carlos@mail.com"
    },
    "partido": {
      "lugar": null,
      "fecha": "2026-04-10",
      "hora": "18:00:00",
      "maxJugadores": 10,
      "participantesActuales": 2,
      "cuposDisponibles": 8
    }
  }
}
```

**Errores posibles**

| Código | Causa |
|---|---|
| `400` | Partido no está en estado `programado` / datos inválidos |
| `401` | Token inválido o ausente |
| `404` | Jugador o partido no encontrado |
| `409` | Ya inscrito / Partido lleno |
| `429` | Límite de 30 inscripciones/hora superado |

---

### 13. GET /participaciones/:idMatch

**Contexto:** Devuelve el resumen de cupos y la lista de participaciones de un partido. Útil para mostrar la barra de progreso de cupos, el estado del partido y el detalle de cada jugador inscrito.

**Request**

```
GET /api/participaciones/1
Authorization: Bearer <token>
```

| Param | Tipo | Descripción |
|---|---|---|
| `idMatch` | number | ID del partido |

**Response `200`**

```json
{
  "ok": true,
  "statusCode": 200,
  "message": "Participaciones obtenidas exitosamente",
  "data": {
    "idMatch": 1,
    "estado": "programado",
    "maxJugadores": 10,
    "participantesActuales": 2,
    "cuposDisponibles": 8,
    "participaciones": [
      {
        "idParticipacion": 10,
        "idUser": 5,
        "idMatch": 1,
        "nombreEquipo": "A",
        "Jugador": {
          "idUser": 5,
          "nombreUsuario": "juan_perez",
          "correo": "juan@mail.com"
        }
      },
      {
        "idParticipacion": 12,
        "idUser": 7,
        "idMatch": 1,
        "nombreEquipo": "B",
        "Jugador": {
          "idUser": 7,
          "nombreUsuario": "carlos_r",
          "correo": "carlos@mail.com"
        }
      }
    ]
  }
}
```

**Errores posibles**

| Código | Causa |
|---|---|
| `401` | Token inválido o ausente |
| `404` | Partido no encontrado |

---

### 14. DELETE /participaciones/:idParticipacion

**Contexto:** Permite a un jugador cancelar su propia asistencia a un partido. El creador del partido **no puede** usar este endpoint para salir — debe cancelar el partido completo con `DELETE /partidos/:idMatch`. Solo funciona si el partido está en estado `programado`.

**Request**

```
DELETE /api/participaciones/12
Authorization: Bearer <token>
```

| Param | Tipo | Descripción |
|---|---|---|
| `idParticipacion` | number | ID de la participación a cancelar |

> No requiere body.

**Response `200`**

```json
{
  "ok": true,
  "statusCode": 200,
  "message": "Asistencia cancelada exitosamente"
}
```

**Errores posibles**

| Código | Causa |
|---|---|
| `400` | El partido no está en estado `programado` / el usuario es el creador del partido |
| `401` | Token inválido o ausente |
| `403` | La participación pertenece a otro usuario |
| `404` | Participación no encontrada |

---

## Resumen rápido

| Método | Endpoint | Auth | Descripción |
|---|---|---|---|
| `GET` | `/partidos` | Sí | Listar partidos disponibles (paginado) |
| `GET` | `/partidos/:idMatch` | Sí | Detalle de un partido |
| `GET` | `/partidos/:idMatch/creador` | Sí | Creador del partido |
| `GET` | `/partidos/:idMatch/participantes` | Sí | Lista de participantes |
| `POST` | `/partidos/programar` | Sí | Crear partido |
| `POST` | `/partidos/:idMatch/unirse` | Sí | Unirse a un partido |
| `DELETE` | `/partidos/:idMatch` | Sí | Cancelar partido (solo creador) |
| `PATCH` | `/partidos/:idMatch/estado` | Sí | Cambiar estado (creador/admin) |
| `GET` | `/partidos/usuario/:idUser/creados` | Sí | Partidos creados por usuario |
| `GET` | `/partidos/usuario/:idUser/participando` | Sí | Partidos donde participa usuario |
| `GET` | `/partidos/usuario/:idUser/historial` | Sí | Historial completo de usuario |
| `POST` | `/participaciones/inscribir` | Sí | Inscribir con idUser explícito |
| `GET` | `/participaciones/:idMatch` | Sí | Cupos + lista de participaciones |
| `DELETE` | `/participaciones/:idParticipacion` | Sí | Cancelar asistencia propia |
