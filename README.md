# Base Vue 3 Template App

This base Vue.js template app comes preinstalled and configured with:

- Vue 3  
- TypeScript  
- Pinia  
- Vue Router  
- Axios  
- Less  
- Guest and main layouts  
- Authentication: middleware, store, login and register pages  
- Jest  
- ESLint  
- Dev, testing and build environments  

---

## Run the project

Choose one of the commands (for example, `make dev` or `make build`) **after creating an `.env` file** in the corresponding directory inside `docker/`.

### Example `.env` file for dev build (`docker/dev/.env`)

```env
# Backend URL that nginx will proxy requests to
API_URL=http://localhost:8080

# Port where the app will be available in the browser (nginx port)
APP_PORT=80

# Environment used to select the proper Vite config
NODE_ENV=development

# Path that nginx will use to proxy requests to API_URL
VITE_API_URL=/api

# Vite app port
VITE_APP_PORT=5173
```

### Main commands

- `make dev` — run dev build  
- `make build` — run production build  
- `make lint` — run linter  
- `make test` — run all tests  
- `make test-components` — run only component tests  
- `make test-integration` — run only integration tests  
- `make test-unit` — run only unit tests  
- `make dev-logs` — show dev container logs  
- `make dev-shell` — open container shell  
- `make build-down` / `make dev-down` — stop containers  
- `make ci` — run CI pipeline  


## Project Structure

```
├── src/                # Application source code
│   ├── api/            # API services
│   ├── components/     # Vue components
│   ├── config/         # Configuration files (env, axios, etc.)
│   ├── layouts/        # Guest and main layouts
│   ├── router/         # Vue-router configuration
│   ├── store/          # Pinia stores
│   ├── styles/         # Global styles (Less)
│   ├── views/          # Pages
│   └── main.ts         # App entry point
│
├── tests/              # Tests
│   ├── unit/           # Unit tests
│   ├── integration/    # Integration tests
│   └── components/     # Component tests
│
├── docker/             # Docker-related files
│   ├── dev/            # Dev environment configs
│   ├── build/          # Build environment configs
│   └── test/           # Test environment configs
│
├── public/             # Static assets
├── vite.config/        # Vite configuration
├── jest.config.ts      # Jest configuration
├── tsconfig.json       # TypeScript configuration
├── Makefile            # Makefile with useful commands
└── README.md           # Project documentation
```
