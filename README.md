
# ✨ Bitspace Software

<p align="center">
  <img src="public/favicon.svg" alt="Bitspace Software Logo" width="120" height="120">
</p>

<p align="center">
  <strong>Soluciones digitales confiables y escalables</strong>
</p>

<p align="center">
  <a href="#demo">Demo</a> •
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#customization">Customization</a> •
  <a href="#deployment">Deployment</a> •
</p>

## Demo

[View Live Demo](https://bitspace.software/)

## Features

- 🚀 **Maximum Performance** - Built with Astro.js for lightning-fast static sites
- 🎨 **Modern Design** - Clean UI that focuses on content
- 🌓 **Light/Dark Mode** - Smooth theme switching
- 📱 **Responsive** - Perfect experience on all devices
- ⚡ **SPA Transitions** - Smooth page navigation with transition effects
- 📝 **Markdown & MDX** - Write posts with Markdown and extend with MDX
- 🔍 **SEO Optimized** - Complete SEO with Open Graph, Twitter Cards, Schema.org, and sitemaps
- 📊 **Analytics Ready** - Google Analytics 4 integration with custom event tracking
- 🔖 **Categorization** - Tags and categories system with breadcrumbs
- 🔄 **RSS Feed** - Automatically generated RSS feed
- 🎵 **Spotify Integration** - Display currently playing track
- 🌐 **Internationalization Ready** - Prepared for multiple languages
- 🔒 **Secure** - CSP headers, security policies, and environment variable protection
- 📱 **PWA Ready** - Progressive Web App capabilities with offline support
- 🖼️ **Image Optimization** - Automatic image optimization with Astro Image
- 🗺️ **Sitemap Generation** - Automatic XML sitemap generation
- 🔍 **Advanced Search** - Real-time search with keyboard shortcuts
- 💬 **Comments System** - GitHub Issues integration with Utterances
- 📧 **Newsletter** - Email subscription system
- 🎨 **Micro-interactions** - Advanced animations and transitions
- ♿ **Accessibility** - WCAG 2.1 AA compliant with skip links
- 🔔 **Push Notifications** - Web push notifications support
- 📊 **Advanced Analytics** - Comprehensive user engagement tracking

## Getting Started

### Requirements

- Node.js 16+ and npm/yarn
- Spotify account (optional, for Now Playing feature)

### Installation

```bash
# Clone repository
git clone https://github.com/bitspace-software/bs-website

# Navigate to project directory
cd bs-website

# Install dependencies
npm install

# Create .env file from template
cp env.example .env

# Edit .env with your information
# Required: GA_MEASUREMENT_ID, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
```

### Development

```bash
# Start development server
npm run dev

# Open browser at http://localhost:4321
```

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── content/        # Blog content (Markdown/MDX)
│   ├── layouts/        # Page layouts
│   ├── pages/          # Pages and routes
│   ├── styles/         # CSS and Tailwind
│   └── utils/          # Utilities and helpers
├── astro.config.mjs    # Astro configuration
├── tailwind.config.js  # Tailwind configuration
└── tsconfig.json       # TypeScript configuration
```

## Customization

### Changing Theme

Edit `tailwind.config.js` to change colors, fonts, and other design variables:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {...},
        secondary: {...}
      },
      fontFamily: {
        sans: ['Inter', ...],
        serif: [...]
      }
    }
  }
}
```

### Adding New Posts

Create a new Markdown or MDX file in the `src/content/blog` directory:

```md
---
title: "Optimizing Web Performance for Better UX"
description: "Tips and techniques for improving your website's performance and providing a better user experience."
pubDate: 2023-01-18
heroImage: "/placeholder.svg?height=630&width=1200"
readingTime: "8 min read"
tags: ["performance", "web development", "user experience"]
---

Your post content here...
```

## Spotify Integration

To enable the "Now Playing" feature from Spotify:

1. Create an app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Get your Client ID and Client Secret
3. Add them to your `.env` file:

```env
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token
```

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/marombeltran">Marlon Beltran</a>
</p>
