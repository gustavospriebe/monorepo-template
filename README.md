# NewCompany Monorepo Template

This repository serves as a template for starting new full-stack projects using a modern monorepo setup. It includes a React frontend, a Fastify backend, shared UI components, shared TypeScript types, and consistent linting/formatting configurations.

## Structure

The monorepo is organized into two main directories:

- `apps/`: Contains the deployable applications.
  - `backend`: A Fastify server built with TypeScript.
  - `frontend`: A React application built with Vite and TypeScript.
- `packages/`: Contains shared code, configurations, and utilities used across the applications.
  - `ui`: Shared React UI components (potentially using shadcn/ui structure).
  - `types`: Shared TypeScript type definitions used by both frontend and backend.
  - `eslint-config`: Shared ESLint configuration for consistent linting rules.
  - `typescript-config`: Shared TypeScript `tsconfig.json` bases for consistency.

## Technologies Used

- **Package Manager:** [pnpm](https://pnpm.io/) (using workspaces)
- **Monorepo Tool:** [Turborepo](https://turbo.build/repo)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Frontend:** [React](https://reactjs.org/), [Vite](https://vitejs.dev/)
- **Backend:** [Fastify](https://www.fastify.io/)
- **Linting:** [ESLint](https://eslint.org/)
- **Formatting:** (Implicitly via ESLint/EditorConfig - consider adding Prettier explicitly if desired)
- **UI:** Shared component library (`packages/ui`)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url> your-project-name
    cd your-project-name
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
    This command installs dependencies for all packages and applications within the monorepo.

## Common Commands

These commands should be run from the root of the monorepo. Turborepo will efficiently execute the corresponding scripts in the relevant packages.

- **Start development servers:**

  ```bash
  pnpm dev
  ```

  This typically starts the frontend (Vite) and backend (tsx) development servers concurrently. Check the `turbo.json` and individual `package.json` files for specifics.

- **Build all applications and packages:**

  ```bash
  pnpm build
  ```

- **Lint all code:**

  ```bash
  pnpm lint
  ```

- **Run tests (if configured):**
  ```bash
  pnpm test
  ```

## Packages Overview

- **`apps/backend`**: The main API server. Run `pnpm dev` within this directory (or via the root `pnpm dev`) to start it.
- **`apps/frontend`**: The main web application. Run `pnpm dev` within this directory (or via the root `pnpm dev`) to start the Vite development server.
- **`packages/ui`**: Contains reusable React components. Changes here will be reflected in the frontend application during development thanks to workspace linking.
- **`packages/types`**: Defines shared TypeScript interfaces and types used across the backend, frontend, and potentially UI packages.
- **`packages/eslint-config`**: Centralized ESLint rules. Packages extend these configurations.
- **`packages/typescript-config`**: Centralized `tsconfig.json` base configurations used by other packages.

## Dependency Management

- **Consistency:** Dependency versions are enforced across the workspace using `pnpm overrides` in the root `package.json`.
- **Adding Dependencies:**
  - To add a dependency to a specific app/package: `pnpm add <dependency-name> --filter <package-name>` (e.g., `pnpm add zod --filter @newcompany/backend`)
  - To add a dev dependency shared across the monorepo: `pnpm add -D <dependency-name> -w` (adds to the root `package.json`)
- **Updating Dependencies:** Update versions in the root `package.json` `overrides` section or individual `package.json` files as needed, then run `pnpm install`. Consider using tools like `pnpm up -Li` to help with interactive updates.
