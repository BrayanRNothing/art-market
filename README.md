# Canvas | Marketplace de Arte Contemporáneo

Este proyecto es una plataforma de exhibición y venta de arte diseñada como una red de **Salones de Arte** personales. El diseño se enfoca en una estética oscura, minimalista y cinematográfica que permite que las obras de arte sean las protagonistas.

## 🎨 Concepto y Modelo de Negocio
Mercado digital diseñado para conectar el talento de artistas independientes con coleccionistas globales mediante un modelo de trato directo:

- **Salón de Arte (Perfil de Artista)**: Cada artista cuenta con su propio espacio personalizado (su "Salón") donde exhibe su catálogo completo de obras, tanto las disponibles para la venta como las que forman parte de su colección personal o histórica.
- **Transacciones Directas**: No existe un sistema de pago automatizado en el sitio. La adquisición se gestiona mediante **contacto directo** con el artista, fomentando una relación personalizada entre creador y coleccionista.
- **Categorización de Obras**: Cada publicación cuenta con un estado claro:
  - `Solo Exhibición`: Obras mostradas por su valor artístico, no disponibles para compra.
  - `En Venta`: Obras disponibles para adquisición inmediata mediante contacto.
  - `Vendido`: Obras que ya han sido adquiridas pero permanecen en el salón como parte del historial de éxito del artista.
- **Acceso y Cuentas**: El registro es exclusivo para artistas que deseen gestionar su salón; los visitantes pueden explorar, disfrutar y contactar sin necesidad de crear una cuenta.

## ✨ Funcionalidades Clave

### 1. Salones de Arte Interactivos
- Perfiles de artista que funcionan como portafolios digitales de alta gama.
- Historial de ventas visible para generar confianza y mostrar trayectoria.

### 2. Galería con Etiquetas de Estado
- Grid de obras con tags visuales dinámicos (`EXHIBICIÓN`, `DISPONIBLE`, `VENDIDO`).
- Filtrado inteligente por disponibilidad o tipo de arte.

### 3. Notch Navigation & Action Icons
- **Main Navigation (English)**:
  - `Home`: Main landing page.
  - `Art Market`: Works available for purchase/contact.
  - `Art Gallery`: Works for exhibition only.
  - `My Art`: Direct access for artists to manage their profile and works.
  - `Contact`: General support and platform inquiries.
- **Action Icons (Right)**:
  - `Cart`: Quick access to selected works (for reference).
  - `Profile Circle`: Simplified for **Login/Logout** functionality, acting as the gateway for artists.

### 4. Hero Section & Artist Invite
- Comunicación clara: "Explora" para amantes del arte, "Crea tu Salón" para artistas.
- Banner de invitación premium para nuevos talentos.

## 🛠️ Stack Tecnológico
- **Frontend**: React + Vite + TypeScript.
- **Estilos**: Tailwind CSS (Sistema de diseño basado en utilidades).
- **Animaciones**: Framer Motion (Efectos de entrada, scroll-linked animations y staggered text).
- **Iconografía**: Lucide React.
- **Tipografía**: Almarai (Global) e Instrument Serif (Acentos).

---

## 🚀 Cómo ejecutar el proyecto

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Construir para producción:
   ```bash
   npm run build
   ```

---

## ⚠️ Directivas de Desarrollo

> [!IMPORTANT]
> **DISEÑO DE LA NAVBAR:** No se debe modificar el diseño general, estructura o estilos complejos de la Navbar (`src/components/Navbar.tsx`) a menos que el usuario lo solicite explícitamente de forma detallada. 
> 
> Si se pide un cambio ligero o una edición puntual (como cambiar un texto o un link), **NO** se debe rediseñar ni alterar el CSS/Tailwind de la estructura principal. Mantener el diseño "Notch" y la coherencia visual actual sin ediciones excesivas.