# Contributing to n8n-nodes-algolia

Thank you for your interest in contributing to the n8n-nodes-algolia project! This document provides guidelines and information for contributors.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Standards](#code-standards)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Release Process](#release-process)

## Getting Started

### Prerequisites

- **Node.js**: Version 20.15 or higher
- **npm**: Package manager (version 10.14.0+)
- **n8n**: Version 1.0.0 or higher for testing

### Initial Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/n8n-nodes-algolia.git
   cd n8n-nodes-algolia
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Development Setup

### Available Scripts

- `npm run build` - Build the project for production
- `npm run dev` - Build and watch for changes during development
- `npm run lint` - Run ESLint to check code quality
- `npm run lintfix` - Automatically fix ESLint issues where possible
- `npm run format` - Format code using Prettier

### Development Workflow

1. **Start development mode**:

   ```bash
   npm run dev
   ```

   This will build the project and watch for changes.

2. **Test in n8n**:

   Link your local development version to n8n for testing:

   ```bash
   # In your n8n installation directory: ~/.n8n/custom/
   npm link n8n-nodes-algolia
   ```

   See [Troubleshooting](https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/#troubleshooting) if there is no `/custom` directory in `~/.n8n`

## Code Standards

### TypeScript Configuration

The project uses strict TypeScript configuration with the following key settings:

- ES2019 target with modern library features
- Strict type checking enabled
- Path mapping with `@/*` alias for clean imports

## Project Structure

```
n8n-nodes-algolia/
├── credentials/           # Authentication configurations
│   └── AlgoliaApi.credentials.ts
├── nodes/                 # Node implementations
│   └── Algolia/
│       ├── Algolia.node.ts       # Main node file
│       ├── Algolia.node.json     # Node metadata
│       ├── algolia.svg           # Node icon
│       ├── index/               # Index operations
│       ├── objects/             # Object operations
│       └── shared/              # Shared field definitions
├── helpers/               # Utility functions
└── dist/                 # Built files (generated)
```

### Adding New Operations

1. **Create operation files** in the appropriate directory (`index/`, `objects/`, etc.)
2. **Export from index.ts** in the operation directory
3. **Add to main node** in `Algolia.node.ts`
4. **Add shared fields** to `shared/` if reusable

### Shared Fields

Common field definitions are stored in `shared/` to promote reusability:

- `indexName.field.ts` - Index name parameter
- `query.field.ts` - Search query parameter
- `object.field.ts` - Object data parameter
- And more...
