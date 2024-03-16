devup:
	cd steinkamp_us_dev && docker compose build && docker compose up -d --force-recreate && docker compose logs -f

devlogs:
	cd steinkamp_us_dev && docker compose logs -f

devdown:
	cd steinkamp_us_dev && docker compose down

prod:
	docker compose build && docker compose up -d --force-recreate && docker compose logs -f

prodlogs:
	docker compose logs -f

post:
	bin/new-post
