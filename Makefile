.DEFAULT_GOAL := prod

GREP ?= $(shell command -v ggrep 2> /dev/null || command -v grep 2> /dev/null)
AWK  ?= $(shell command -v gawk 2> /dev/null || command -v awk 2> /dev/null)

help: ## Show makefile targets and their descriptions
	@$(GREP) --no-filename -E '^[ a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		$(AWK) 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-28s\033[0m %s\n", $$1, $$2}' | sort

prod: ## Build and run in production mode (default)
	docker compose build && docker compose up -d --force-recreate && docker compose logs -f

prodlogs: ## Tail production container logs
	docker compose logs -f

devup: ## Build and run in development mode
	cd steinkamp_us_dev && docker compose build && docker compose up -d --force-recreate && docker compose logs -f

devlogs: ## Tail development container logs
	cd steinkamp_us_dev && docker compose logs -f

devdown: ## Stop development containers
	cd steinkamp_us_dev && docker compose down

post: ## Create a new post
	bin/new-post
