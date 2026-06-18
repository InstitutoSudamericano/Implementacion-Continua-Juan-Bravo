# Informe de la Estructura del Backend — GAD Municipal de Cañar

Este documento presenta una explicación detallada, amigable y técnica de la arquitectura, estructura de código y lógica del sistema de backend para la **Gestión de Trámites y Permisos de Construcción** del Gobierno Autónomo Descentralizado (GAD) Municipal de Cañar.

---

## 🚀 Stack Tecnológico

El backend está diseñado siguiendo estándares modernos de desarrollo de software para garantizar robustez, mantenibilidad y escalabilidad:

- **Lenguaje de Programación:** TypeScript (agrega tipado seguro sobre JavaScript).
- **Framework de Desarrollo:** NestJS (un framework progresivo para Node.js que sigue patrones como la Inyección de Dependencias y la modularidad empresarial).
- **Base de Datos:** PostgreSQL (base de datos relacional robusta).
- **ORM (Object-Relational Mapping):** Prisma (facilita las consultas a la base de datos de manera tipada y segura).
- **Autenticación y Seguridad:** JWT (JSON Web Tokens) con tokens de acceso (Access Tokens) y refresco (Refresh Tokens), y encriptación de contraseñas mediante `bcryptjs`.
- **Documentación Interactiva:** Swagger (genera de forma automática la documentación de las rutas y modelos).

---

## 📁 Estructura del Proyecto (`src/`)

La estructura de carpetas sigue la arquitectura modular recomendada por NestJS. Cada módulo agrupa sus controladores, servicios y DTOs (Objetos de Transferencia de Datos).

```text
src/
├── main.ts              # Punto de entrada de la aplicación. Configura CORS, validaciones y Swagger.
├── app.module.ts        # Módulo raíz que importa y unifica todos los submódulos.
│
├── prisma/              # Conexión directa y control del cliente de base de datos Prisma.
│
├── auth/                # Módulo de Autenticación. Maneja login, registro, estrategias JWT (Access/Refresh) y guards de seguridad.
│
├── users/               # Módulo de Usuarios. Gestión de perfiles, roles y permisos dentro del sistema.
│
├── requests/            # Módulo de Trámites. Lógica de negocio central: gestión del ciclo de vida de las solicitudes, cálculos de cobros (fee-rules) y reportes de inspección.
│
├── audit/               # Módulo de Auditoría. Registro de acciones clave para trazabilidad y control de cambios en el sistema.
│
└── common/              # Recursos compartidos. Contiene decoradores personalizados (ej. roles), enumeradores y filtros de excepciones globales.
```

---

## ⚙️ Lógica de Negocio y Flujo Municipal

El sistema incorpora reglas de negocio específicas para optimizar el flujo de trabajo del GAD Municipal de Cañar:

1. **Gestión Integral de Trámites por Profesionales:** 
   Se habilita a los profesionales (arquitectos, ingenieros) para que gestionen de manera completa el ciclo de vida de los trámites y solicitudes, con trazabilidad desde la creación hasta la aprobación final.

2. **Cálculo de Pagos Automatizado:** 
   El sistema incluye un motor de reglas (`fee-rules.service.ts`) que determina automáticamente los montos a cobrar basándose en los parámetros del trámite, agilizando el proceso de liquidación de tasas.

3. **Sistema de Archivos y Documentación Digital:**
   Se establece un modelo estructurado de gestión documental digital para administrar y verificar los archivos adjuntos en cada fase del trámite.

4. **Validación de Prerrequisitos Obligatorios:**
   Antes de permitir la aprobación de planos, el flujo valida estrictamente que se hayan cumplido requisitos previos obligatorios, como la obtención de la *línea de fábrica*, garantizando el cumplimiento normativo.

5. **Flujo Basado en Roles y Firmas Digitales:**
   El flujo de revisión y aprobación delega acciones específicas según el rol. Por ejemplo, incluye pasos donde la Secretaría realiza la validación de firmas electrónicas en los documentos PDF antes de autorizar la emisión de resoluciones o permisos.
