#!/bin/bash

# Add /usr/local/bin directory where docker-compose is installed
#PATH=/usr/sbin:/usr/bin:/sbin:/bin:/usr/local/bin

# check if the path is ok
cd /home/debian/petr-peps-prod

make compact

echo "[INFO] Cron job compact finished at" $(date)