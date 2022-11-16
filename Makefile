local= docker-compose -f docker-compose-local.yaml
prod= docker-compose -f docker-compose-prod.yaml
path-cron-prod= ./compact-cron-prod.sh
path-cron-local= ./compact-cron-local.sh

build-prod:
	$(prod) build --no-cache

build-local:
	$(local) build --no-cache

start-prod: 
	$(prod) up -d --force-recreate

stop-prod: 
	$(prod) down

logs-prod:
	$(prod) logs -f

logs-local:
	$(local) logs -f

start-local: 
	$(local) up -d --force-recreate

stop-local: 
	$(local) down

compact-prod: 
	$(prod) down && $(prod) up fuseki_compact && $(prod) up -d

compact-local:
	$(local) down && $(local) up fuseki_compact && $(local) up -d

set-compact-cron-prod: 
	(crontab -l 2>/dev/null; echo "0 4 * * * $(path-cron-prod) >> /tmp/cronlog.txt") | crontab -

set-compact-cron-local: 
	(crontab -l 2>/dev/null; echo "0 4 * * * $(path-cron-local) >> /tmp/cronlog.txt") | crontab -

prune-data:
	sudo rm -rf ./data