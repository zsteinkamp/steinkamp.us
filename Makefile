devup:
	cd dev && docker compose build && docker compose up -d --force-recreate && docker compose logs -f

devdown:
	cd dev && docker compose down

prod:
	docker compose build && docker compose up -d --force-recreate && docker compose logs -f
