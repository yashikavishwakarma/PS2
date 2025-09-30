# SamundraManthan Design Guidelines

## Design Approach

**Selected System:** Material Design with Ocean Science Customization
**Rationale:** Material Design excels at data visualization and information hierarchy, perfect for a scientific dashboard. We'll customize it with ocean-themed aesthetics while maintaining usability for researchers and policymakers.

---

## Core Design Elements

### A. Color Palette

**Primary Colors (Ocean Blue):**
- Primary: `200 90% 45%` - Deep ocean blue for headers, CTAs, active states
- Primary Light: `200 80% 60%` - Interactive elements, hover states
- Primary Dark: `200 95% 30%` - Text on light backgrounds, emphasis

**Secondary Colors (Teal/Cyan):**
- Secondary: `180 70% 50%` - Data highlights, chart accents
- Secondary Light: `180 60% 70%` - Map markers, badges
- Coastal Accent: `190 80% 55%` - Special data points, alerts

**Neutral Colors:**
- Background (Light): `210 20% 98%` - Main background
- Surface (Light): `0 0% 100%` - Cards, panels
- Background (Dark): `210 20% 12%` - Dark mode background
- Surface (Dark): `210 15% 18%` - Dark mode cards

**Data Visualization:**
- Fine Sand: `40 85% 65%` - Warm sand yellow
- Medium Sand: `35 80% 55%` - Amber
- Coarse Sand: `25 75% 50%` - Deep orange

**Status Colors:**
- Success: `145 65% 45%` - Successful predictions
- Warning: `40 90% 55%` - Medium confidence alerts
- Error: `355 75% 50%` - Low confidence/errors

### B. Typography

**Font Families:**
- Primary: 'Inter' (Google Fonts) - Clean, modern, excellent readability for data
- Monospace: 'JetBrains Mono' - Coordinates, timestamps, technical data

**Type Scale:**
- Display (Hero): text-5xl (3rem), font-bold, tracking-tight
- H1 (Page Titles): text-4xl (2.25rem), font-semibold
- H2 (Section Headers): text-3xl (1.875rem), font-semibold
- H3 (Card Titles): text-xl (1.25rem), font-medium
- Body Large: text-lg (1.125rem), font-normal
- Body: text-base (1rem), font-normal
- Small (Metadata): text-sm (0.875rem), font-normal
- Caption (Labels): text-xs (0.75rem), font-medium, uppercase, tracking-wide

### C. Layout System

**Spacing Primitives:** Tailwind units of 4, 6, 8, 12, 16 for consistent rhythm
- Component padding: p-4 to p-6
- Section spacing: py-8 to py-16
- Card gaps: gap-4 to gap-6
- Grid gutters: gap-6 to gap-8

**Container Widths:**
- Dashboard/Analytics: max-w-7xl (full data display)
- Forms: max-w-2xl (focused input)
- Content sections: max-w-6xl

### D. Component Library

**Navigation:**
- Top navbar: Gradient background (ocean blue to teal), glassmorphic effect, sticky positioning
- Logo: "SamundraManthan" with wave icon, white text
- Nav links: Horizontal on desktop, hamburger menu on mobile
- Active state: Underline with secondary color

**Dashboard Map:**
- Full-width Leaflet.js map, minimum h-96
- Custom markers: Droplet shapes color-coded by grain size
- Marker clusters for dense data points
- Popup cards: White background, shadow-lg, rounded-lg with prediction data, confidence percentage, timestamp
- Map controls: Bottom-right with ocean blue styling

**Analytics Cards:**
- Container: bg-white dark:bg-surface-dark, rounded-xl, shadow-md, p-6
- Header: flex justify-between with title and icon
- Chart area: Responsive with min-h-64
- Legend: Horizontal below chart with color dots

**Data Display:**
- Stat cards: Grid layout (grid-cols-1 md:grid-cols-3), large numbers with labels
- Live feed: List with alternating subtle backgrounds, image thumbnails on left
- Timeline view: Vertical line connecting events, color-coded dots

**Forms (Upload Page):**
- Card container: Centered, max-w-2xl, white background
- File upload: Dashed border dropzone, teal accent on dragover
- Input fields: Outlined style with focus:ring-primary
- Submit button: Full-width, gradient background (primary to secondary), text-white, rounded-lg

**Charts:**
- Pie chart: Donut style with center metric, ocean color palette
- Line charts: Smooth curves, gradient fills under lines
- Bar charts: Rounded tops, hover tooltips
- Heatmap: Coastal overlay with opacity gradients

**Buttons:**
- Primary: bg-gradient-to-r from-primary to-secondary, text-white, px-6 py-3, rounded-lg, shadow-md
- Secondary: border-2 border-primary, text-primary, hover:bg-primary hover:text-white
- Icon buttons: Circular, p-2, hover:bg-opacity-10

**Modals/Dialogs:**
- Backdrop: bg-black bg-opacity-50
- Content: Centered, bg-white, rounded-2xl, max-w-2xl, shadow-2xl
- Close button: Top-right, text-gray-400 hover:text-gray-600

### E. Page-Specific Layouts

**Dashboard Page:**
- Two-column split: Map (65% width) + Sidebar (35% with latest predictions)
- Quick stats row above map: 4 stat cards showing total measurements, beach types
- Filters panel: Collapsible left sidebar with date range, grain size, region filters

**Analytics Page:**
- Grid layout: grid-cols-1 lg:grid-cols-2 gap-6
- Hero stat section: Full-width card with key metrics
- Chart cards: Equal height, stacked on mobile
- Export button: Fixed bottom-right fab (floating action button)

**Upload Page:**
- Centered single-column layout
- Large file upload area with preview
- GPS input: Two columns (latitude/longitude) with map preview
- Progress indicator: Linear with percentage during upload/processing

**Live Feed:**
- List view with card items
- Each item: Thumbnail (96px), prediction details, timestamp, confidence badge
- Infinite scroll with loading spinner
- Filter chips at top: All, Fine, Medium, Coarse

---

## Visual Enhancements

**Glassmorphism:** Navigation bar with backdrop-blur-md, bg-opacity-90
**Shadows:** Multi-layer shadows for depth (shadow-sm for cards, shadow-lg for modals)
**Gradients:** Subtle gradients in headers and buttons, avoid overwhelming the data
**Icons:** Heroicons for UI elements, custom ocean wave patterns for branding
**Animations:** Fade-in for new data points on map, subtle scale on card hover, smooth chart transitions

---

## Images

**Hero Section (Landing/About):**
- Large banner image: Aerial view of Indian coastline with clear sand beaches
- Overlay: Dark gradient (bottom to top) for text readability
- Placement: Full-width, h-96 to h-screen/2

**Dashboard Backgrounds:**
- Subtle wave pattern SVG as page background with very low opacity (5%)
- No hero image on functional pages - focus on data clarity

**Placeholder Content:**
- Sample sand grain microscopic images for demo uploads
- Indian coastal map base layer with OpenStreetMap

---

## Accessibility & Responsiveness

- Color contrast: WCAG AAA for all text combinations
- Dark mode: Full implementation with dark ocean blues (not pure black)
- Touch targets: Minimum 44px for mobile interactive elements
- Responsive breakpoints: Mobile-first (sm:640px, md:768px, lg:1024px, xl:1280px)
- Focus indicators: Visible ring with primary color on all interactive elements