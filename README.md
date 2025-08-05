# 🐎 Don't Push the Horses

> _A thrilling horse racing simulation built with Vue 3_

Experience the excitement of horse racing from the comfort of your browser! Watch majestic horses thunder down the track, place your bets, and feel the rush of victory in this immersive racing simulation.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Development Guide](#️-development-guide)
- [Project Structure](#️-project-structure)
- [Testing](#-testing)
- [How to Play](#-how-to-play)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **Realistic Racing Simulation** - Watch horses compete with dynamic racing mechanics
- **Interactive Betting System** - Place bets and test your racing intuition
- **Beautiful UI** - Crafted with Tailwind CSS for a premium experience
- **Responsive Design** - Enjoy seamless gameplay on any device
- **Comprehensive Testing** - Full test coverage with Vitest
- **Modern Development** - Built with Vue 3 Composition API and latest tooling

## 🛠️ Tech Stack

### Core Framework
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript framework with Composition API
- **[Vue Router 4](https://router.vuejs.org/)** - Official router for Vue.js
- **[Vuex 4](https://vuex.vuejs.org/)** - Centralized state management

### Styling & UI
- **[Tailwind CSS 4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[floating-vue](https://floating-vue.starpad.dev/)** - Advanced tooltip system
- **[lucide-vue-next](https://lucide.dev/guide/packages/lucide-vue-next)** - Beautiful icon library

### Development Tools
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[ESLint](https://eslint.org/)** - Code linting with Vue-specific rules

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** version `18.0.0` or higher (recommended: `21.7.3`)
- **npm** package manager (comes with Node.js)
- **Git** for version control

### Verify Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
# Clone the repository
git clone <your-repo-url>
cd dont-push-the-horses
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm install
```

### 3. Start Development Server

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

## ⚙️ Development Guide

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues automatically

# Testing
npm run test         # Run tests in watch mode
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage report
npm run test:run     # Run tests once
```

### Development Environment Setup

This project uses a carefully curated development environment for optimal productivity:

#### Code Quality Tools

- **ESLint** with Vue-specific plugins and `@antfu/eslint-config`
- **Vite** for fast development and building
- **Vitest** for comprehensive testing

#### ⚠️ Important Editor Configuration

**Disable Prettier** in your editor to avoid conflicts with ESLint formatting rules.

### Recommended VS Code Extensions

Install these extensions for the best development experience:

- **Vue Language Features (Volar)** - Vue 3 support
- **ESLint** - Code linting
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **Vitest** - Test runner integration

### VS Code Settings

Add this configuration to your VS Code `settings.json`:

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
dont-push-the-horses/
├── public/                 # Static assets
├── src/
│   ├── features/          # Feature-based modules
│   │   ├── game/         # Game feature
│   │   │   ├── components/     # Game-specific components
│   │   │   │   ├── horseList/  # Horse list components
│   │   │   │   ├── program/    # Program components
│   │   │   │   └── track/      # Track components
│   │   │   ├── composables/    # Game composition functions
│   │   │   ├── router/         # Game routing
│   │   │   ├── services/       # Game business logic
│   │   │   ├── stores/         # Game state management
│   │   │   └── GamePage.vue    # Main game page
│   │   └── home/              # Home feature
│   │       ├── router/         # Home routing
│   │       └── HomePage.vue    # Home page
│   │
│   ├── layouts/               # Layout components
│   │   ├── components/        # Layout-specific components
│   │   ├── DefaultLayout.vue   # Default app layout
│   │   └── FullscreenLayout.vue # Fullscreen layout
│   │
│   ├── router/                # Main app routing
│   └── shared/               # Shared resources
│       ├── assets/
│       │   ├── images/        # Image resources
│       │   └── styles/        # Global styles
│       ├── components/ui/     # Reusable UI components
│       ├── composables/       # Shared composition functions
│       ├── store/             # Global state management
│       └── utils/             # Utility functions
│
├── test/                     # Test setup and utilities
├── index.html               # Entry HTML file
├── package.json             # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── vitest.config.js        # Vitest configuration
└── eslint.config.mjs       # ESLint configuration
```

### Key Architectural Decisions

- **Feature-based Structure**: Code is organized by features rather than technical concerns
- **Shared Components**: Reusable UI components in `shared/components/ui/`
- **Composables**: Vue 3 Composition API functions for logic reuse
- **Centralized State**: Vuex stores for state management
- **Comprehensive Testing**: Tests alongside components with high coverage

## 🧪 Testing

This project maintains high test coverage with Vitest:

### Running Tests

```bash
# Run all tests in watch mode
npm run test

# Run tests with UI interface
npm run test:ui

# Run tests once (for CI/CD)
npm run test:run

# Generate coverage report
npm run test:coverage
```

### Test Structure

- Tests are co-located with components in `__test__/` directories
- Each component has corresponding test files
- Mock utilities available in `test/utils.js`
- Test setup configured in `test/setup.js`

## 🎮 How to Play

### Getting Started

1. **Navigate to the Game** - Click "Start Racing" from the home page
2. **Choose Your Horses** - Select which horses you think will win
3. **Place Your Bets** - Wager on your favorite horses
4. **Watch the Race** - Enjoy the thrilling simulation as horses compete
5. **Collect Winnings** - Celebrate your victories and learn from defeats

### Game Mechanics

- **Horse Selection**: Choose from available horses before each race
- **Betting System**: Place bets on horses you think will win
- **Race Simulation**: Watch realistic racing with dynamic outcomes
- **Results**: See your betting results and winnings

## 🔧 Troubleshooting

### Common Issues

#### Development Server Won't Start

```bash
# Check if port is in use
lsof -i :5173

# Kill process using the port
kill -9 <PID>

# Or use a different port
npm run dev -- --port 3000
```

#### Dependencies Issues

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### ESLint Errors

```bash
# Fix auto-fixable issues
npm run lint:fix

# Check ESLint configuration
npx eslint --print-config src/App.vue
```

#### Test Failures

```bash
# Run tests with verbose output
npm run test:run -- --reporter=verbose

# Run specific test file
npm run test src/features/game/__test__/GamePage.test.js
```

### Browser Compatibility

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following the coding standards
4. **Write tests** for new functionality
5. **Run tests** to ensure everything works: `npm run test`
6. **Commit your changes**: `git commit -m 'Add amazing feature'`
7. **Push to the branch**: `git push origin feature/amazing-feature`
8. **Open a Pull Request**

### Coding Standards

- Follow the existing ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Keep components small and focused

### Testing Requirements

- All new features must have tests
- Maintain test coverage above 90%
- Run `npm run test:coverage` before submitting PR

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Remember**: In horse racing, as in life, don't push the horses! Let them run at their natural pace and enjoy the journey. 🏇

_Happy racing!_ 🏁
