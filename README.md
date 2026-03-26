# Loginco — Sitio Web Patio y Bodega

Sitio web estático de una sola página para **Loginco**, empresa de almacenaje estratégico y patio de resguardo temporal ubicada en Puerto Lázaro Cárdenas, Michoacán, México.

## Correr localmente

```bash
python3 -m http.server 8000
```

Abre `http://localhost:8000` en tu navegador. No requiere instalación de dependencias.

## Estructura del proyecto

```
PatioBodega/
├── index.html       # Sitio completo (HTML + CSS + JS inline)
├── robots.txt       # Directivas de rastreo para buscadores
├── sitemap.xml      # Mapa del sitio para indexación
├── img/
│   ├── Logotipo.png # Logo horizontal (header y footer)
│   └── Isotipo.svg  # Ícono del favicon
└── README.md
```

## Stack técnico

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura y contenido |
| CSS inline (`<style>`) | Paleta de colores, componentes, responsive |
| JavaScript inline (`<script>`) | Menú mobile, FAQ accordion, validación de formulario |
| [Tailwind CSS](https://cdn.tailwindcss.com) vía CDN | Utilidades de layout y espaciado |
| [Font Awesome](https://cdnjs.cloudflare.com) 6.4.0 vía CDN | Íconos |
| Google Fonts — Inter | Tipografía |

> El sitio requiere conexión a internet para cargar fuentes e íconos desde CDN.

## Paleta de colores

| Token | Valor | Uso |
|---|---|---|
| Accent | `#4C50D4` | Color principal, botones, íconos |
| Accent dark | `#3638B8` | Hover de botones |
| Accent tint | `#EEEEF9` | Fondos de tarjetas y badges |
| Hero dark | `rgba(10,10,60,0.88)` | Overlay del hero |

## Secciones del sitio

1. **Header** — Navbar sticky con menú desktop y panel mobile colapsable
2. **Hero** — H1 principal, subtítulo y CTAs hacia `#bodega` y `#contacto`
3. **Stats** — 4 métricas clave: 12+ años, 9,000 m², 24/7, 100% seguro
4. **Bodega / CEDIS** — Video + 3 tarjetas de servicio
5. **Patio de Resguardo** — 4 features + iframe Google Maps (coordenadas reales)
6. **Tecnología y Seguridad** — 4 tarjetas sobre WMS, reportes, biometría y API
7. **Proceso** — Timeline de 4 pasos: Evaluación → Propuesta → Implementación → Operación
8. **FAQ** — Accordion con 4 preguntas frecuentes
9. **Contacto** — Formulario de cotización con validación frontend
10. **Footer** — 4 columnas: marca, soluciones, certificaciones, contacto

## Funcionalidades JavaScript

| Función | Comportamiento |
|---|---|
| Menú hamburguesa | Toggle del panel mobile, cierre al hacer clic fuera o en un enlace |
| FAQ accordion | Un solo ítem abierto a la vez, animación con `max-height` |
| Validación de formulario | Campos `required`, validación de email, mensajes de error y éxito |
| Navbar scroll | Sombra progresiva al bajar la página |
| WhatsApp flotante | Botón fijo con tooltip, enlace directo con mensaje predefinido |

## SEO

El sitio incluye las siguientes optimizaciones:

- **Title tag** y **meta description** con keywords y geo-localización
- **`<link rel="canonical">`** para evitar contenido duplicado
- **Open Graph** y **Twitter Cards** para previews en redes sociales y WhatsApp
- **Geo meta tags** (`geo.region`, `geo.position`, `ICBM`)
- **Schema.org JSON-LD:**
  - `LocalBusiness` — nombre, dirección, horarios, certificaciones, coordenadas
  - `Service` — catálogo de los 3 servicios principales
  - `FAQPage` — 4 preguntas para rich results en Google
- **`robots.txt`** y **`sitemap.xml`**

## Pendientes para producción

- [ ] Crear `img/og-loginco.jpg` (1200×630 px) con foto real de instalaciones para Open Graph
- [ ] Conectar formulario de contacto a backend (recomendado: [Formspree](https://formspree.io) o webhook)
- [ ] Crear y verificar **Google Business Profile** para las dos ubicaciones:
  - CEDIS: Av. Río Tepalcatepec No. 48, Lázaro Cárdenas
  - Patio: Autopista Morelia-Lázaro Cárdenas No. 135, Isla del Cayacal
- [ ] Subir `robots.txt` y `sitemap.xml` al servidor raíz
- [ ] Registrar sitemap en [Google Search Console](https://search.google.com/search-console)
- [ ] Solicitar reseñas a clientes actuales en GBP

## Contacto del negocio

| Canal | Datos |
|---|---|
| Teléfono | +52 753 537 7838 |
| Email | info@loginco.com.mx |
| Dirección CEDIS | Av. Río Tepalcatepec No. 48, Col. 1er Sector de FIDELAC, Lázaro Cárdenas, Mich. 60950 |
| Dirección Patio | Autopista Morelia-Lázaro Cárdenas No. 135, Isla del Cayacal, C.P. 60950 |
| Coordenadas | 17.9766429, -102.1884628 |
