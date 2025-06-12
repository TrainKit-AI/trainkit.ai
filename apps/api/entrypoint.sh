#!/bin/sh
set -e

echo "=> Test de connexion à la base de données..."

# On attend que la base soit accessible (timeout 30s)
ATTEMPTS=0
MAX_ATTEMPTS=30
while ! psql "$SPRING_DATASOURCE_URL" -c '\l' > /dev/null 2>&1; do
  ATTEMPTS=$((ATTEMPTS+1))
  if [ $ATTEMPTS -ge $MAX_ATTEMPTS ]; then
    echo "⚠️ Impossible de se connecter à la base après $MAX_ATTEMPTS essais, arrêt."
    exit 1
  fi
  echo "Attente de la base... tentative $ATTEMPTS/$MAX_ATTEMPTS"
  sleep 1
done

echo "✅ Connexion réussie, lancement de l'application..."

exec java -Dserver.port=8080 -jar app.jar