# Credifox Store

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)

Credifox Store es una tienda en línea enfocada en la venta de teléfonos celulares, accesorios y productos tecnológicos.

La aplicación fue desarrollada con una arquitectura moderna utilizando Next.js App Router y está preparada para ejecutarse tanto localmente como mediante Docker.

---

# Tecnologías

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Shadcn/UI
- Prisma ORM
- Docker
- PostgreSQL

---

# Características

- Catálogo de productos
- Venta de celulares
- Venta de accesorios
- Diseño responsive
- Componentes reutilizables
- Prisma ORM
- Optimización con App Router
- SEO Ready
- Docker Ready

---

# Requisitos

- Node.js 22+
- pnpm
- Docker (Opcional)

---

# Instalación

Clonar el repositorio

```bash
git clone https://github.com/ravexcode/credifox-store
```

Entrar al proyecto

```bash
cd credifox-store
```

Instalar dependencias

```bash
pnpm install
```

---

# Variables de entorno

Crear un archivo `.env`

```env
DATABASE_URL=

NEXTAUTH_SECRET=

NEXTAUTH_URL=http://localhost:3000
```

---

# Prisma

Generar cliente

```bash
pnpm prisma generate
```

Ejecutar migraciones

```bash
pnpm prisma migrate dev
```

Producción

```bash
pnpm prisma migrate deploy
```

Abrir Prisma Studio

```bash
pnpm prisma studio
```

---

# Ejecutar en desarrollo

```bash
pnpm dev
```

La aplicación estará disponible en

```
http://localhost:3000
```

---

# Ejecutar con Docker

Construir

```bash
docker compose up --build
```

Segundo plano

```bash
docker compose up -d --build
```

Detener

```bash
docker compose down
```

---

# Scripts

```bash
pnpm dev
```

Servidor de desarrollo

```bash
pnpm build
```

Compilar producción

```bash
pnpm start
```

Iniciar producción

```bash
pnpm lint
```

Lint

```bash
pnpm prisma generate
```

Generar cliente Prisma

```bash
pnpm prisma migrate dev
```

Migraciones

```bash
pnpm prisma studio
```

Prisma Studio

---

# Estructura

```
app/
components/
lib/
prisma/
public/
hooks/
types/
```

---

# Stack

| Tecnología | Uso |
|------------|-----|
| Next.js 16 | Framework |
| App Router | Routing |
| Tailwind CSS | Estilos |
| Shadcn/UI | Componentes |
| Prisma ORM | Base de datos |
| PostgreSQL | Persistencia |
| Docker | Contenedores |

---

# Producción

```bash
pnpm build
pnpm start
```

o mediante Docker

```bash
docker compose up -d
```

---

# Licencia

Este proyecto pertenece a **Credifox**.

Todos los derechos reservados.