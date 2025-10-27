# Macao Internacional - Corporate Website

🌎 **Tecnología sin fronteras**

Sitio web corporativo para Macao Internacional S.A., distribuidor oficial de productos electrónicos WiWU en América Latina y el Caribe.

## 🚀 Características

- ✅ **100% Responsive** - Diseño optimizado para móvil, tablet y desktop
- ✅ **SEO Optimizado** - Meta tags completos, Schema.org, sitemap.xml
- ✅ **Formulario de contacto** - Validación y envío de mensajes
- ✅ **Navegación suave** - Smooth scroll entre secciones
- ✅ **Menú móvil** - Hamburger menu para dispositivos móviles
- ✅ **Botón WhatsApp flotante** - Contacto directo desde cualquier página
- ✅ **Botón "Volver arriba"** - Navegación rápida al inicio
- ✅ **Optimizado para rendimiento** - CSS y JS minimalista
- ✅ **Accesibilidad** - ARIA labels y navegación por teclado

## 📁 Estructura del Proyecto

```
macaoin/
├── index.html              # Página principal
├── styles.css              # Estilos CSS (2100+ líneas)
├── main.js                 # JavaScript interactivo
├── sitemap.xml             # Mapa del sitio para SEO
├── robots.txt              # Instrucciones para crawlers
├── content.txt             # Contenido de referencia
├── imagenes-necesarias.md  # Guía de imágenes
├── CLAUDE.md               # Guía de desarrollo
└── images/                 # Imágenes organizadas por sección
    ├── logo/
    ├── hero/
    ├── about/
    ├── products/
    ├── testimonials/
    └── why-choose/
```

## 🛠️ Desarrollo Local

### Prerrequisitos
- Ninguno! Es un sitio HTML/CSS/JS puro

### Ejecutar localmente

**Opción 1: Python (recomendado)**
```bash
# Python 3
python3 -m http.server 8000

# Abrir en navegador: http://localhost:8000
```

**Opción 2: Node.js**
```bash
npx serve

# Abrir en navegador: http://localhost:3000
```

**Opción 3: VS Code Live Server**
1. Instalar extensión "Live Server"
2. Click derecho en `index.html` > "Open with Live Server"

## 🌐 Deployment

### GitHub Pages

1. Crear repositorio en GitHub
2. Push del código
3. Settings > Pages > Source: main branch
4. Sitio disponible en: `https://[usuario].github.io/macaoin/`

### Netlify

1. Crear cuenta en [Netlify](https://www.netlify.com/)
2. Conectar con repositorio GitHub o drag & drop la carpeta
3. Build settings: ninguno necesario
4. Deploy!

**Configuración recomendada:**
```toml
# netlify.toml
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel

1. Crear cuenta en [Vercel](https://vercel.com/)
2. Importar proyecto desde GitHub
3. Framework Preset: Other
4. Build Command: (dejar vacío)
5. Output Directory: (dejar vacío)
6. Deploy!

### Hosting tradicional (cPanel, FTP)

1. Comprimir todos los archivos
2. Subir vía FTP al directorio `public_html/` o similar
3. Asegurar que `index.html` esté en la raíz
4. Verificar permisos de archivos (644 para archivos, 755 para directorios)

## 📧 Integración de Formularios

### EmailJS (Recomendado para sitios estáticos)

1. Crear cuenta en [EmailJS](https://www.emailjs.com/)
2. Crear servicio de email
3. Crear template con estas variables:
   - `{{nombre}}`
   - `{{empresa}}`
   - `{{email}}`
   - `{{telefono}}`
   - `{{pais}}`
   - `{{tipo}}`
   - `{{mensaje}}`

4. En `main.js` línea ~118, descomentar y configurar:

```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data)
  .then(() => {
    alert('¡Gracias por contactarnos!');
    contactForm.reset();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
```

### Formspree

1. Crear cuenta en [Formspree](https://formspree.io/)
2. Crear formulario
3. En `main.js` línea ~118, descomentar y actualizar:

```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  body: formData,
  headers: { 'Accept': 'application/json' }
});
```

### Backend personalizado

Enviar datos a tu API:

```javascript
const response = await fetch('https://api.tudominio.com/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

## 📊 Google Analytics

1. Crear propiedad GA4
2. Copiar Measurement ID
3. En `main.js` línea ~378, descomentar y reemplazar:

```javascript
gtag('config', 'G-XXXXXXXXXX');
```

4. Agregar script de GA en `<head>` de `index.html`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

## 🎨 Personalización

### Cambiar colores

Editar variables CSS en `styles.css` líneas 8-18:

```css
:root {
    --primary-red: #EF4444;
    --dark-red: #DC2626;
    --text-dark: #1F2937;
    /* ... etc */
}
```

### Modificar contenido

Todo el contenido está en `index.html`. Buscar por sección:
- Hero: línea 120
- Nosotros: línea 221
- Productos: línea 295
- Servicios: línea 358
- Contacto: línea 483
- Footer: línea 598

### Agregar más productos

1. Duplicar un `<div class="product-card">` en línea ~232
2. Actualizar imagen, título, descripción y precio
3. Agregar imagen correspondiente en `images/products/`

## 🔧 Optimizaciones

### Comprimir CSS y JS (Producción)

```bash
# Usando online tools:
# https://cssminifier.com/
# https://jscompress.com/

# O con npm (opcional):
npm install -g clean-css-cli uglify-js
cleancss -o styles.min.css styles.css
uglifyjs main.js -o main.js.min.js
```

### Optimizar imágenes

- Usar WebP cuando sea posible
- Comprimir JPG/PNG con [TinyPNG](https://tinypng.com/)
- Exportar a 2x para pantallas Retina
- Implementar lazy loading (ya incluido en HTML)

### Performance tips

- CSS y JS ya están optimizados
- Habilitar compresión gzip en servidor
- Configurar cache headers
- Usar CDN para assets estáticos

## 📱 Responsividad

Breakpoints definidos:
- **Mobile**: 320px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1024px
- **Large Desktop**: 1025px+

Testear en:
- Chrome DevTools (F12 > Toggle device toolbar)
- Dispositivos reales
- [Responsive Design Checker](https://responsivedesignchecker.com/)

## 🐛 Troubleshooting

### Formulario no envía
- Verificar configuración EmailJS/Formspree
- Revisar consola del navegador (F12)
- Validar que todos los campos required estén llenos

### Menú móvil no funciona
- Verificar que `main.js` esté cargando
- Revisar errores en consola
- Limpiar cache del navegador

### Imágenes no cargan
- Verificar rutas en `index.html`
- Asegurar que archivos existen en `images/`
- Revisar permisos de archivos en servidor

### Smooth scroll no funciona
- Algunos navegadores antiguos no soportan `scroll-behavior: smooth`
- El JS fallback debería funcionar automáticamente

## 📞 Contacto

- **Teléfono**: +507 431-3500 / +507 431-3501
- **Email**: info@macaoin.com
- **WhatsApp**: +507 6112-1304
- **Instagram**: [@macaointernacionalzl](https://www.instagram.com/macaointernacionalzl)
- **Dirección**: Calle 15 y Calle E, Paseo Gorgas, Manzana 13-B, Zona Libre de Colón, Panamá
- **Horario**: Lun - Vie: 08:30 a 17:30 (GMT-5)

## 📄 Licencia

© 2025 Macao Internacional S.A. Todos los derechos reservados.

---

**Desarrollado con ❤️ para Macao Internacional**

*Tecnología sin fronteras 🌎*
