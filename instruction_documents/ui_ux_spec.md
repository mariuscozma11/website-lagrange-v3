# UI and UX Specification

## Scope
Define visual rules, layout patterns, and interaction guidelines across the website. Mobile-first priority with light and dark themes. **EXCLUSIVELY uses shadcn/ui components**. Emerald 500 as primary brand hue.

---

## Global Rules
- **Mobile-first**: All layouts designed for small screens first, scale gracefully upwards.
- **Themes**: Light and Dark, toggle available in nav.
- **Typography**: Clean sans-serif, bold geometric for headings, humanist sans for body.
- **Color Palette**:
  - Primary: Emerald 500 look
  - Neutral surfaces: Slate/Zinc ranges
  - Success: Emerald variants
  - Warning: Amber 500 look
  - Danger: Rose 500 look
- **Spacing**: Generous padding, vertical rhythm, avoid clutter.
- **Icons**: Lucide React icons (outline style, consistent stroke).
- **Images**: Crisp, minimal background, alt text in EN/RO.
- **Motion**: Subtle, fast (under 200ms). Avoid bounce. Respect reduced motion.

---

## shadcn/ui Components Specification

### **Core Components (Currently Installed)**
- **Button** (`@/components/ui/button`)
  - Primary: Solid emerald, white text
  - Secondary: Outline neutral, emerald text
  - Destructive: Rose tone, white text
  - Variants: default, destructive, outline, secondary, ghost, link
  - Sizes: default, sm, lg, icon
  - Mobile: full width when context requires

- **Card** (`@/components/ui/card`)
  - Neutral background, thin border
  - Hover lift (desktop), static (mobile)
  - Uniform padding and consistent title/body structure
  - Variants: default, outline
  - Sub-components: CardHeader, CardContent, CardFooter, CardTitle, CardDescription

- **Input** (`@/components/ui/input`)
  - Clean borders, subtle focus highlight
  - Mobile: full width, clear spacing between fields
  - Variants: default, file
  - Sizes: default, sm, lg

- **Label** (`@/components/ui/label`)
  - Always visible labels for form inputs
  - Accessible form associations

- **Textarea** (`@/components/ui/textarea`)
  - Multi-line text input for messages
  - Resizable with proper focus states

- **Dropdown Menu** (`@/components/ui/dropdown-menu`)
  - Language switcher and navigation menus
  - Accessible keyboard navigation

### **Required shadcn/ui Components (Need Installation)**
- **Navigation Menu** (`npx shadcn@latest add navigation-menu`)
  - Main navigation bar component
  - Responsive navigation with mobile hamburger
  - Active link indicators

- **Sheet** (`npx shadcn@latest add sheet`)
  - Mobile navigation drawer
  - Sidebar overlays for mobile menu

- **Separator** (`npx shadcn@latest add separator`)
  - Visual dividers between sections
  - Footer section separators

- **Badge** (`npx shadcn@latest add badge`)
  - Status indicators and tags
  - Service category badges

- **Alert** (`npx shadcn@latest add alert`)
  - Form validation messages
  - Success/error notifications
  - Variants: default, destructive

- **Dialog** (`npx shadcn@latest add dialog`)
  - Modal dialogs for confirmations
  - Contact form success modals

- **Tabs** (`npx shadcn@latest add tabs`)
  - Service category tabs
  - Portfolio project tabs

- **Accordion** (`npx shadcn@latest add accordion`)
  - FAQ sections
  - Expandable content sections

- **Progress** (`npx shadcn@latest add progress`)
  - Loading states
  - Process step indicators

- **Skeleton** (`npx shadcn@latest add skeleton`)
  - Loading placeholders
  - Content loading states

### **Advanced Components (Optional)**
- **Carousel** (`npx shadcn@latest add carousel`)
  - Testimonial carousels
  - Portfolio project showcases

- **Table** (`npx shadcn@latest add table`)
  - Service comparison tables
  - Pricing tables

- **Select** (`npx shadcn@latest add select`)
  - Service category selection
  - Language selection dropdowns

- **Checkbox** (`npx shadcn@latest add checkbox`)
  - Form checkboxes
  - Terms acceptance

- **Radio Group** (`npx shadcn@latest add radio-group`)
  - Service type selection
  - Contact method selection

- **Switch** (`npx shadcn@latest add switch`)
  - Theme toggle
  - Feature toggles

- **Slider** (`npx shadcn@latest add slider`)
  - Price range sliders
  - Project timeline sliders

- **Tooltip** (`npx shadcn@latest add tooltip`)
  - Help text on hover
  - Feature explanations

- **Popover** (`npx shadcn@latest add popover`)
  - Additional information overlays
  - Service details popups

- **Command** (`npx shadcn@latest add command`)
  - Search functionality
  - Command palette

- **Calendar** (`npx shadcn@latest add calendar`)
  - Contact scheduling
  - Project timeline

- **Date Picker** (`npx shadcn@latest add date-picker`)
  - Project deadline selection
  - Meeting scheduling

- **Toast** (`npx shadcn@latest add sonner`)
  - Form submission feedback
  - Success/error notifications

- **Avatar** (`npx shadcn@latest add avatar`)
  - Team member photos
  - User profile images

- **Scroll Area** (`npx shadcn@latest add scroll-area`)
  - Long content sections
  - Mobile-friendly scrolling

- **Collapsible** (`npx shadcn@latest add collapsible`)
  - Expandable content sections
  - Mobile navigation submenus

- **Hover Card** (`npx shadcn@latest add hover-card`)
  - Service preview cards
  - Team member quick info

- **Menubar** (`npx shadcn@latest add menubar`)
  - Alternative navigation pattern
  - Desktop navigation bar

- **Context Menu** (`npx shadcn@latest add context-menu`)
  - Right-click interactions
  - Advanced navigation options

- **Navigation Menu** (`npx shadcn@latest add navigation-menu`)
  - Main site navigation
  - Responsive navigation bar

- **Breadcrumb** (`npx shadcn@latest add breadcrumb`)
  - Page navigation breadcrumbs
  - Site hierarchy navigation

- **Pagination** (`npx shadcn@latest add pagination`)
  - Portfolio pagination
  - Blog post pagination

- **Resizable** (`npx shadcn@latest add resizable`)
  - Dashboard layouts
  - Content area resizing

- **Tabs** (`npx shadcn@latest add tabs`)
  - Service category tabs
  - Content organization

- **Toggle** (`npx shadcn@latest add toggle`)
  - Filter toggles
  - View mode switches

- **Toggle Group** (`npx shadcn@latest add toggle-group`)
  - Multiple selection toggles
  - Filter groups

- **Alert Dialog** (`npx shadcn@latest add alert-dialog`)
  - Confirmation dialogs
  - Destructive action confirmations

- **Aspect Ratio** (`npx shadcn@latest add aspect-ratio`)
  - Consistent image ratios
  - Portfolio image containers

- **Form** (`npx shadcn@latest add form`)
  - Form validation and handling
  - Contact form implementation

- **Label** (`@/components/ui/label`) - Already installed
- **Input** (`@/components/ui/input`) - Already installed
- **Textarea** (`@/components/ui/textarea`) - Already installed
- **Button** (`@/components/ui/button`) - Already installed
- **Card** (`@/components/ui/card`) - Already installed
- **Dropdown Menu** (`@/components/ui/dropdown-menu`) - Already installed

---

## Section Components (shadcn/ui Implementation)

### **Hero Section**
- **Components**: Button, Card, Badge
- **Layout**: Strong headline, supportive subheadline
- **CTAs**: Primary Button (solid emerald), Secondary Button (outline)
- **Background**: Card component with gradient/image overlay
- **Mobile**: Headline max 2–3 lines, full-width buttons

### **About Overview**
- **Components**: Card, Button, Badge
- **Content**: Short mission and values in Card
- **Action**: Button linking to About page
- **Visual**: Avatar or icon within Card

### **Services Overview**
- **Components**: Card (3 cards), Badge, Button
- **Services**: Applications, Websites, Consulting
- **Icons**: Lucide React icons (consistent stroke)
- **Action**: Button to Services page
- **Layout**: Responsive grid (1 col mobile, 3 col desktop)

### **Case Studies Teaser**
- **Components**: Card, Badge, Button
- **Content**: 2–3 featured projects
- **Format**: Card with client, description, metric
- **Action**: Button to Portfolio page

### **Process Section**
- **Components**: Card, Progress, Badge
- **Steps**: 3–4 steps visualized
- **Mobile**: Vertical Card list
- **Desktop**: Horizontal Card timeline
- **Progress**: Progress component for step indicators

### **Testimonials**
- **Components**: Card, Avatar, Carousel (optional)
- **Content**: 2–3 short quotes with Avatar photos
- **Mobile**: Carousel component (if installed)
- **Desktop**: Card grid layout

### **FAQ Section**
- **Components**: Accordion
- **Content**: Expandable Q&A items
- **Mobile**: Single column Accordion
- **Desktop**: Multi-column Accordion

### **Contact Form**
- **Components**: Form, Input, Textarea, Label, Button, Alert
- **Fields**: Name, Email, Message
- **Validation**: Alert component for errors
- **Success**: Dialog or Toast notification

### **CTA Band**
- **Components**: Card (full-width), Button
- **Style**: High contrast Card strip
- **Action**: Single clear Button

### **Footer**
- **Components**: Separator, Card
- **Sections**: Legal info, links, ANPC, services, copyright
- **Layout**: Stacked on mobile, columns on desktop
- **Dividers**: Separator components between sections

---

## Required shadcn/ui Components for Implementation

### **Essential Components (Must Install)**
```bash
# Navigation and Layout
npx shadcn@latest add navigation-menu
npx shadcn@latest add sheet
npx shadcn@latest add separator

# Content and Information
npx shadcn@latest add badge
npx shadcn@latest add alert
npx shadcn@latest add accordion
npx shadcn@latest add tabs

# Forms and Interactions
npx shadcn@latest add form
npx shadcn@latest add dialog
npx shadcn@latest add toast

# Visual Elements
npx shadcn@latest add avatar
npx shadcn@latest add progress
npx shadcn@latest add skeleton
```

### **Recommended Components (Install as Needed)**
```bash
# Enhanced User Experience
npx shadcn@latest add carousel
npx shadcn@latest add tooltip
npx shadcn@latest add popover
npx shadcn@latest add hover-card

# Advanced Forms
npx shadcn@latest add select
npx shadcn@latest add checkbox
npx shadcn@latest add radio-group
npx shadcn@latest add switch

# Data Display
npx shadcn@latest add table
npx shadcn@latest add pagination
npx shadcn@latest add breadcrumb

# Layout and Navigation
npx shadcn@latest add collapsible
npx shadcn@latest add scroll-area
npx shadcn@latest add resizable
```

---

## Accessibility (shadcn/ui Built-in)
- **Contrast**: WCAG AA compliant (built into shadcn components)
- **Focus**: Visible focus rings (Radix UI primitives)
- **Touch**: ≥44px touch targets (shadcn sizing)
- **Font**: ≥16px on mobile (Tailwind responsive typography)
- **Keyboard**: Full keyboard navigation (Radix UI)
- **Screen Readers**: ARIA labels and roles (Radix UI)

---

## Responsiveness (Tailwind + shadcn/ui)
- **Mobile (default)**: Vertical stacks, full-width components
- **Tablet**: Grid of 2–3 columns, increased spacing
- **Desktop**: 12-column grid, max width 1280px
- **Breakpoints**: Tailwind defaults (sm, md, lg, xl)
- **Components**: Responsive by default (shadcn/ui)

---

## Microcopy
- **Tone**: Professional, direct, trustworthy
- **Sentences**: Concise, plain technical language
- **Bilingual**: Consistent tone across EN and RO
- **Components**: Use shadcn/ui component text patterns