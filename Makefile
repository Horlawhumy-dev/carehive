# CareHive - Production Workflow

# Variables
PROJECT_ID=sdolvhiyxbtqmviusqzl
SUPABASE=npx supabase
NPM=npm

.PHONY: help install build lint test supabase-login supabase-link supabase-push deploy

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	$(NPM) install

build: ## Build the application for production
	$(NPM) run build

dev: ## Run the application in development mode
	$(NPM) run dev

lint: ## Run linting checks
	$(NPM) run lint

test: ## Run unit tests
	$(NPM) run test

supabase-login: ## Login to Supabase CLI
	$(SUPABASE) login

supabase-link: ## Link local environment to remote project
	$(SUPABASE) link --project-ref $(PROJECT_ID)

supabase-push: ## Push local migrations to remote database
	$(SUPABASE) db push --include-all

deploy: lint build supabase-push ## Full deployment: lint, build, and push migrations
	@echo "Local build and database migrations complete. Upload the dist/ folder to your static hosting provider."
