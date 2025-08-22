.PHONY: lint test test-components test-integration test-unit check dev dev-down dev-logs dev-shell build build-down ci

# ===== COMMON =====
include .env
export $(shell sed 's/=.*//' .env)

define compose_cmd
	docker compose --env-file .env $(1)
endef

# ===== TEST =====
TEST_COMPOSE_FILE = docker/test/docker-compose.yml
TEST_ENV_FILE     = docker/test/.env
TEST_ENV_OPT      = $(if $(wildcard $(TEST_ENV_FILE)),--env-file $(TEST_ENV_FILE),)
TEST_PROJECT_NAME = $(COMPOSE_APP_NAME)_test

lint:
	$(call compose_cmd,$(TEST_ENV_OPT) -p $(TEST_PROJECT_NAME) -f $(TEST_COMPOSE_FILE) run --rm test npm run lint)

test:
	$(call compose_cmd,$(TEST_ENV_OPT) -p $(TEST_PROJECT_NAME) -f $(TEST_COMPOSE_FILE) run --rm test npm run test)

test-components:
	$(call compose_cmd,$(TEST_ENV_OPT) -p $(TEST_PROJECT_NAME) -f $(TEST_COMPOSE_FILE) run --rm test npm run test:components)

test-integration:
	$(call compose_cmd,$(TEST_ENV_OPT) -p $(TEST_PROJECT_NAME) -f $(TEST_COMPOSE_FILE) run --rm test npm run test:integration)

test-unit:
	$(call compose_cmd,$(TEST_ENV_OPT) -p $(TEST_PROJECT_NAME) -f $(TEST_COMPOSE_FILE) run --rm test npm run test:unit)

check:
	$(call compose_cmd,$(TEST_ENV_OPT) -p $(TEST_PROJECT_NAME) -f $(TEST_COMPOSE_FILE) run --rm test sh -c "npm run lint && npm run test")

# ===== DEV =====
DEV_COMPOSE_FILE = docker/dev/docker-compose.yml
DEV_ENV_FILE     = docker/dev/.env
DEV_ENV_OPT      = $(if $(wildcard $(DEV_ENV_FILE)),--env-file $(DEV_ENV_FILE),)
DEV_PROJECT_NAME = $(COMPOSE_APP_NAME)_dev

dev:
	$(call compose_cmd,$(DEV_ENV_OPT) -p $(DEV_PROJECT_NAME) -f $(DEV_COMPOSE_FILE) up -d)

dev-down:
	$(call compose_cmd,$(DEV_ENV_OPT) -p $(DEV_PROJECT_NAME) -f $(DEV_COMPOSE_FILE) down)

dev-logs:
	$(call compose_cmd,$(DEV_ENV_OPT) -p $(DEV_PROJECT_NAME) -f $(DEV_COMPOSE_FILE) logs -f)

dev-shell:
	$(call compose_cmd,$(DEV_ENV_OPT) -p $(DEV_PROJECT_NAME) -f $(DEV_COMPOSE_FILE) exec dev sh)

# ===== BUILD =====
BUILD_COMPOSE_FILE = docker/build/docker-compose.yml
BUILD_ENV_FILE     = docker/build/.env
BUILD_ENV_OPT      = $(if $(wildcard $(BUILD_ENV_FILE)),--env-file $(BUILD_ENV_FILE),)
BUILD_PROJECT_NAME = $(COMPOSE_APP_NAME)_build

build:
	$(call compose_cmd,$(BUILD_ENV_OPT) -p $(BUILD_PROJECT_NAME) -f $(BUILD_COMPOSE_FILE) up -d)

build-down:
	$(call compose_cmd,$(BUILD_ENV_OPT) -p $(BUILD_PROJECT_NAME) -f $(BUILD_COMPOSE_FILE) down)

# ===== CI (lint + test + build) =====
ci: check build
