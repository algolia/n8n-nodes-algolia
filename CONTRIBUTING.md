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
   git clone https://github.com/algolia/n8n-nodes-algolia.git
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

1. **Test in n8n**:

   **Note for asdf users**: If you're using asdf as your Node.js version manager, you need to manually create the global symlink first:
   <details>
   <summary>Create global symlink</summary>

   ```bash
   # Get your npm prefix (asdf path)
   npm config get prefix

   # Create the global symlink (replace with your actual prefix path)

   ln -sf /absolute/path/to/n8n-nodes-algolia $(npm config get prefix)/lib/node_modules/@algolia/n8n-nodes-algolia
   ```

   </details>

   ```
   cd ~/.n8n/custom
   npm link @algolia/n8n-nodes-algolia
   ```

   See [Troubleshooting](https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/#troubleshooting) if there is no `/custom` directory in `~/.n8n`.

2. **Start development mode**:

   ```bash
   npm run dev
   ```

   This will start an n8n instance, build the project and watch for changes.

   If this fails to start the n8n instance because the port is already used, do:

   ```bash
   lsof -i :5678

   # Find the n8n process PID, usually name is "node" and kill it
   kill -9 PID_OF_PROCESS
   ```

## Code Standards

### TypeScript Configuration

The project uses strict TypeScript configuration with the following key settings:

- ES2019 target with modern library features
- Strict type checking enabled
- Path mapping with `@/*` alias for clean imports

## Project Structure

```
n8n-nodes-algolia/
├── credentials/                      # Authentication configurations
│   └── AlgoliaApi.credentials.ts
├── nodes/                            # Node implementations
│   └── Algolia/
│       └── specs/                    # Folder containing all the OpenAPI definitions
│           ├── *.json                # OpenAPI definitions
│           └── *.ts                  # n8n nodes definitions
│       ├── Algolia.node.json         # Node metadata
│       ├── algolia.svg               # Node icon
│       ├── Algolia.node.ts           # Main node file
│       ├── Algolia.node.json         # Node metadata
│       └── algolia.svg               # Node icon
├── scripts/                          # Utility and build scripts
│   ├── generate-properties.ts        # Script to generate properties from OpenAPI
│   ├── generate-readme-operations.ts # Script to update README with supported operations
│   └── generate-specs-index.ts       # Script to generate an index for specs
├── .github/                          # Github configuration files
└── dist/                             # Built files (generated)
```
