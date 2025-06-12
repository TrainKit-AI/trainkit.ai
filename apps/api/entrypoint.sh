#!/bin/sh
set -e

echo "DATABASE_USER=$SPRING_DATASOURCE_USERNAME"
echo "DATABASE_HOST=$SPRING_DATASOURCE_URL"
echo "DATABASE_PASSWORD=$SPRING_DATASOURCE_PASSWORD"
URL="${SPRING_DATASOURCE_URL#jdbc:postgresql://}"
echo "URL=$URL"

# Construire l'URL psql à partir des variables Render
# PSQL_URL="${SPRING_DATASOURCE_USERNAME}:${SPRING_DATASOURCE_PASSWORD}@${SPRING_DATASOURCE_URL}:5432/postgres"

echo "=> Test de connexion à la base de données..."

ATTEMPTS=0
MAX_ATTEMPTS=30
while ! PGPASSWORD="$SPRING_DATASOURCE_PASSWORD" psql -h "$URL" -p "5432" -U "$SPRING_DATASOURCE" -d "postgres" -c '\l' > /dev/null 2>&1; do
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