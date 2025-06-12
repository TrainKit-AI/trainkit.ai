#!/bin/sh
set -e

echo "DATABASE_USER=$SPRING_DATASOURCE_USERNAME"
echo "DATABASE_URL=$SPRING_DATASOURCE_URL"
echo "DATABASE_PASSWORD=$SPRING_DATASOURCE_PASSWORD"

# On enlève le préfixe "jdbc:postgresql://"
URL="${SPRING_DATASOURCE_URL#jdbc:postgresql://}"

# On récupère host:port/dbname
HOSTPORT_DB="${URL}"

# Extraire host et port
HOSTPORT="${HOSTPORT_DB%%/*}"  # tout avant le premier /
HOST="${HOSTPORT%%:*}"         # tout avant ':'
PORT="${HOSTPORT##*:}"         # tout après ':'

# Extraire dbname
DB="${HOSTPORT_DB#*/}"         # tout après le premier '/'

# Construire l'URL psql standard
PSQL_URL="postgresql://${SPRING_DATASOURCE_USERNAME}:${SPRING_DATASOURCE_PASSWORD}@${HOST}:${PORT}/${DB}"

echo "=> Test de connexion à la base de données..."
ATTEMPTS=0
MAX_ATTEMPTS=30
while ! psql "$PSQL_URL" -c '\l' > /dev/null 2>&1; do
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
