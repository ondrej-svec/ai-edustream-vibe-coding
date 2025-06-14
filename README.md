# AI EduStream Vibe Coding

## Overview
AI EduStream Vibe Coding is a modern educational platform and coding environment designed for interactive learning, code experimentation, and rapid prototyping. It features a custom UI component library, robust validation, API integration, and comprehensive testing.

## Features
- Custom UI component library (Radix UI + Tailwind)
- Centralized type and constant management
- Abstracted data service layer
- Comprehensive input validation
- Secure HTML rendering (DOMPurify)
- Loading and error state management
- Real API integration (no mock data)
- Full test suite (unit, integration, E2E)
- Automated security and CI/CD integration

## Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- Git

## Installation
```sh
git clone <repo-url>
cd ai-edustream-vibe-coding
npm install
```

## Configuration
- Copy `.env.example` to `.env` and fill in required values (API keys, endpoints, etc.)
- See `package.json` scripts for available commands

## Usage
- **Development server:**
  ```sh
  npm run dev
  # App runs at http://localhost:8080
  ```
- **Run tests:**
  ```sh
  npm test
  # or
  npx vitest run
  ```
- **Run E2E tests:**
  ```sh
  npx playwright test
  ```
- **Build for production:**
  ```sh
  npm run build
  ```

## Contribution Guidelines
- Fork the repo and create a feature branch
- Write clear, focused commits
- Add/maintain tests for new features
- Follow code style and linting rules
- Document new components/APIs
- Open a pull request with a clear description

## Troubleshooting
- If dependencies fail to install, ensure Node/npm versions are up to date
- For test failures, run `npm run lint` and check for code style issues
- If the dev server fails to start, check `.env` configuration
- For Playwright E2E issues, ensure the dev server is running on port 8080

## License
MIT
