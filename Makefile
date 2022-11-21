local= docker-compose
path-cron= ./compact-cron-local.sh
path= ./compact.sh

build:
	$(local) build --no-cache


start: 
	$(local) up -d --force-recreate

stop: 
	$(local) down

logs:
	$(local) logs -f

compact: 
	$(local) down && $(local) up fuseki_compact && $(local) up -d

set-compact-cron: 
	(crontab -l 2>/dev/null; echo "0 4 * * * $(path-cron) >> /tmp/cronlog.txt") | crontab -

prune-data:
	sudo rm -rf ./data