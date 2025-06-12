#!/bin/sh
set -e

echo "SPRING_DATASOURCE_USERNAME=$SPRING_DATASOURCE_USERNAME"
echo "SPRING_DATASOURCE_URL=$SPRING_DATASOURCE_URL"
echo "SPRING_DATASOURCE_PASSWORD=$SPRING_DATASOURCE_PASSWORD"

# Extraire le host de la JDBC URL
FULL_URL="$SPRING_DATASOURCE_URL"
URL_WITHOUT_PREFIX="${FULL_URL#jdbc:postgresql://}"
HOST="${URL_WITHOUT_PREFIX%%:*}"

echo "HOST=$HOST"

echo "Tentative de connexion avec :"
echo "  Host: $HOST"
echo "  Port: 5432"
echo "  User: $SPRING_DATASOURCE_USERNAME"
echo "  DB:   postgres"

echo "=> Test de connexion à la base de données..."

ATTEMPTS=0
MAX_ATTEMPTS=30

while ! PGPASSWORD="$SPRING_DATASOURCE_PASSWORD" psql -h "$HOST" -p "5432" -U "$SPRING_DATASOURCE_USERNAME" -d "postgres" -c '\l'; do
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
