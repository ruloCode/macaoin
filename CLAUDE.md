# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Macao Internacional S.A. corporate website - a single-page static website for a Latin American electronics distributor specializing in WiWU brand products. The company operates across Panama, Colombia, Costa Rica, and other Central/South American and Caribbean markets.

## Tech Stack

- **HTML5**: Semantic markup with full SEO optimization
- **CSS3**: Modern responsive design with CSS Grid and Flexbox
- **Vanilla JavaScript**: No frameworks - pure JS for interactivity
- **Single page application**: All content in `index.html` with smooth scroll navigation
- **Static hosting ready**: Can be deployed to any static host (GitHub Pages, Netlify, Vercel, etc.)

## File Structure

```
/
├── index.html          # Main HTML - complete single-page site
├── styles.css          # All styling - 2100+ lines of responsive CSS
├── main.js             # JavaScript - interactive features and form handling
├── sitemap.xml         # SEO sitemap for search engines
├── robots.txt          # Crawler instructions
├── content.txt         # Content reference document
├── imagenes-necesarias.md  # Detailed image specifications and prompts
├── CLAUDE.md           # This file - development guide
├── README.md           # Deployment and setup instructions
└── images/             # Organized by section
    ├── logo/
    ├── hero/
    ├── about/
    ├── products/
    ├── testimonials/
    └── why-choose/
```

## Development Workflow

### Viewing the site locally
```bash
# Option 1: Python simple server
python3 -m http.server 8000

# Option 2: If you have Node.js installed
npx serve

# Option 3: Any other static file server
```

Then open http://localhost:8000 in your browser.

### Making changes
- **HTML changes**: Edit `index.html` directly
- **Style changes**: Edit `styles.css` directly
- **Images**: Place in appropriate subdirectory under `images/`, following naming convention

## Design System

### Color Palette
Defined in `:root` CSS variables in styles.css:
- Primary Red: `#EF4444` (--primary-red)
- Dark Red: `#DC2626` (--dark-red)
- Text Dark: `#1F2937` (--text-dark)
- Text Gray: `#6B7280` (--text-gray)
- Border: `#E5E7EB` (--border-color)

### Layout System
- Max container width: `1200px`
- Header height: `80px` (fixed)
- Mobile-first responsive approach
- Spacing uses consistent padding/margins

## Site Structure

The single-page site contains these sections in order:
1. **Header** (fixed) - Logo, responsive navigation, CTA button
2. **Hero** (#inicio) - Main value proposition with CTAs, stats, and floating cards
3. **About** (#nosotros) - Company introduction with team photos and statistics
4. **Products** (#productos) - Three product categories (Apple Accessories, Protectors/Keyboards, Audio/Smartwatches)
5. **Why Choose Us** (#servicios) - Three key differentiators
6. **Testimonials** - Customer reviews in grid layout
7. **Contact** (#contacto) - Full contact form with multiple contact methods
8. **Footer** - Newsletter signup, navigation, contact info, social links
9. **Floating Elements** - WhatsApp button (left), Back-to-top button (right)

## Image Management

### Image Organization
Images are organized by section in `images/` directory. Each section has its own subdirectory matching the HTML section names.

### Image Naming Convention
`[section]-[description]-[variant].[extension]`

Examples:
- `hero-main-image.png`
- `product-apple-accessories.png`
- `testimonial-distributor.png`

### Image Specifications
See `imagenes-necesarias.md` for:
- Detailed requirements for each image
- Exact dimensions and export settings
- AI generation prompts for creating images
- Color palette and styling guidelines

### When Adding New Images
1. Export at 2x resolution for Retina displays
2. Optimize for web (JPG at 85% quality)
3. Follow existing naming conventions
4. Place in appropriate subdirectory
5. Update `index.html` with correct path

## Content Reference

The `content.txt` file contains the Spanish content copy for all sections. Use this as the source of truth for text content when making updates.

## CSS Architecture

The CSS file is organized in sections matching the HTML structure:
1. Reset & Variables
2. Header
3. Hero
4. About
5. Products
6. Why Choose Us
7. Testimonials
8. Footer

Each section is clearly commented. Styles use CSS custom properties (variables) for consistency.

## Common Tasks

### Update company contact information
Edit the footer section in `index.html` around lines 444-465.

### Change product offerings
Edit the products section in `index.html` around lines 217-277 and update product card content.

### Modify color scheme
Update CSS variables in `styles.css` at lines 8-18, then review sections for any hardcoded colors.

### Add new section
1. Add HTML markup in `index.html` following existing section patterns
2. Add corresponding styles in `styles.css`
3. Create `images/[section-name]/` directory if images needed
4. Update navigation links if the section should be in the nav menu

## JavaScript Features

The `main.js` file provides:
- **Mobile menu**: Hamburger menu for tablet/mobile devices
- **Smooth scroll**: Enhanced smooth scrolling to sections
- **Active navigation**: Auto-highlights current section in nav
- **Header scroll effect**: Changes header style on scroll
- **Back to top button**: Appears after scrolling down 300px
- **Form validation**: Client-side validation for contact and newsletter forms
- **Form submission**: Handles form data (ready for EmailJS/Formspree integration)
- **Scroll animations**: IntersectionObserver for fade-in effects
- **Performance monitoring**: Logs page load time in console

## Contact Information

All contact links are functional:
- **Phone**: +507 431-3500 / +507 431-3501 (tel: links)
- **Email**: info@macaoin.com (mailto: link)
- **WhatsApp**: +507 6112-1304 (https://api.whatsapp.com/send?phone=50761121304)
- **Instagram**: @macaointernacionalzl
- **Catalog**: https://vercatalogo.com/macaointernacionalzl/products/by-all/all
- **Address**: Calle 15 y Calle E, Paseo Gorgas, Manzana 13-B, Zona Libre de Colón, Panamá
- **Hours**: Lun - Vie: 08:30 a 17:30 (GMT-5)

## SEO Optimization

The site includes:
- Complete meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card tags
- Schema.org structured data (Organization type)
- Sitemap.xml with all sections
- Robots.txt allowing all crawlers
- Semantic HTML5 markup
- Canonical URL
- Proper heading hierarchy (h1-h4)

## Form Integration

### Contact Form
The contact form in `main.js` (line ~95) is ready for integration with:
- **EmailJS**: Email service integration
- **Formspree**: Form backend service
- **Custom backend**: POST to your API endpoint

To integrate, uncomment and configure the fetch code in the form submission handler.

### Newsletter Form
Similarly configured for email service integration (line ~155).

## Important Notes

- **Language**: All content is in Spanish (target audience: Latin America)
- **Brand**: WiWU is the featured brand - maintain brand consistency
- **Target Markets**: Panama, Colombia, Costa Rica, Caribbean - keep cultural context appropriate
- **Responsive**: 100% responsive design (320px to 4K+)
- **Accessibility**: ARIA labels, keyboard navigation, focus states
- **Performance**: Optimized CSS, lazy loading ready, smooth animations

## Common Development Tasks

### Integrate contact form with EmailJS
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create email service and template
3. In `main.js` line ~118, uncomment and add your credentials
4. Test the form submission

### Integrate with email marketing (Newsletter)
1. Sign up for Mailchimp, SendGrid, or similar
2. Get API endpoint or integration code
3. Update `main.js` line ~178 with your endpoint
4. Configure double opt-in if required

### Add Google Analytics
1. Get GA4 measurement ID
2. In `main.js` line ~378, uncomment GA code
3. Replace 'GA_MEASUREMENT_ID' with your ID

### Update company information
Edit these locations:
- Contact section: `index.html` line 482-595
- Footer: `index.html` line 597-683
- Schema.org data: `index.html` line 46-83

## Git Workflow

Best practices:
- Commit images separately from code when possible
- Use descriptive commit messages referencing specific changes
- No build artifacts to ignore (no package.json, no node_modules)
- Test responsive design before committing HTML/CSS changes
