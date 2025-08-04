# 🐎 Don't Push the Horses

> *A thrilling horse racing simulation built with Vue 3*

Experience the excitement of horse racing from the comfort of your browser! Watch majestic horses thunder down the track, place your bets, and feel the rush of victory in this immersive racing simulation.

## ✨ Features

- **Realistic Racing Simulation** - Watch horses compete with dynamic racing mechanics
- **Interactive Betting System** - Place bets and test your racing intuition
- **Beautiful UI** - Crafted with Tailwind CSS for a premium experience
- **Responsive Design** - Enjoy seamless gameplay on any device

## 🛠️ Tech Stack

- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework
- **[Vuex 4](https://vuex.vuejs.org/)** - Centralized state management
- **[Tailwind CSS 4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[floating-vue](https://floating-vue.starpad.dev/)** - Advanced tooltip system
- **[lucide-vue-next](https://lucide.dev/guide/packages/lucide-vue-next)** - Beautiful icon library

## 📋 Prerequisites

- **Node.js** version `21.7.3` (recommended)
- **npm** package manager (recommended)

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd dont-push-the-horses

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint

# Fix linting issues
npm run lint:fix
```

## ⚙️ Development Setup

This project uses a carefully curated development environment:

### Code Quality
- **ESLint** with Vue-specific plugins
- **@antfu/eslint-config** for consistent code style
- ⚠️ **Important**: Disable Prettier in your editor to avoid conflicts with ESLint

### Recommended VS Code Extensions
- Vue Language Features (Volar)
- ESLint
- Tailwind CSS IntelliSense

### Editor Configuration

Add this to your VS Code `settings.json`:

```json
{
  "prettier.enable": false,
  "javascript.validate.enable": true,
  "eslint.debug": true,
  "eslint.useFlatConfig": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": "never",
    "source.fixAll": "always",
    "source.fixAll.eslint": "explicit",
    "source.fixAll.stylelint": "always"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "toml"
  ],
  "files.associations": {
    "*.css": "tailwindcss",
    "*.scss": "tailwindcss"
  }
}
```

## 🏗️ Project Structure

```
src/
├── features/
│   └── game/
│       ├── components/     # Game-specific components
│       ├── composables/    # Game composition functions
│       ├── router/         # Game routing
│       ├── services/       # Game business logic
│       ├── stores/         # Game state management
│       └── GamePage.vue    # Main game page
├── home/                   # Home page feature
├── layouts/
│   ├── components/         # Layout components
│   ├── DefaultLayout.vue   # Default app layout
│   └── FullscreenLayout.vue # Fullscreen layout
├── router/                 # Main app routing
└── shared/
    ├── assets/
    │   ├── images/         # Image resources
    │   └── styles/         # Global styles
    ├── components/ui/      # Reusable UI components
    ├── composables/        # Shared composition functions
    ├── store/              # Global state management
    └── utils/              # Utility functions
```

## 🎮 How to Play

1. **Choose Your Horses** - Select which horses you think will win
2. **Place Your Bets** - Decide how much you want to wager
3. **Watch the Race** - Enjoy the thrilling simulation as horses compete
4. **Collect Winnings** - Celebrate your victories and learn from defeats

---

**Remember**: In horse racing, as in life, don't push the horses! Let them run at their natural pace and enjoy the journey. 🏇

*Happy racing!* 🏁