#!/bin/sh
set -e

echo "SPRING_DATASOURCE_USERNAME=$SPRING_DATASOURCE_USERNAME"
echo "SPRING_DATASOURCE_URL=$SPRING_DATASOURCE_URL"
echo "SPRING_DATASOURCE_PASSWORD=$SPRING_DATASOURCE_PASSWORD"

FULL_URL="$SPRING_DATASOURCE_URL"
URL_WITHOUT_PREFIX="${FULL_URL#jdbc:postgresql://}"
HOST_AND_PORT="${URL_WITHOUT_PREFIX%%/*}"
HOST="${HOST_AND_PORT%%:*}"
PORT="${HOST_AND_PORT##*:}"

# Si dig est dispo, utiliser pour forcer IPv4
if command -v dig > /dev/null; then
  HOST_IPV4=$(dig +short A "$HOST" | head -n1)
else
  # fallback : utiliser le host tel quel (peut résoudre IPv6 aussi)
  HOST_IPV4="$HOST"
fi

echo "Tentative de connexion avec :"
echo "  Host: $HOST ($HOST_IPV4)"
echo "  Port: $PORT"
echo "  User: $SPRING_DATASOURCE_USERNAME"
echo "  DB:   postgres"

echo "=> Test de connexion à la base de données..."

ATTEMPTS=0
MAX_ATTEMPTS=30
while ! PGPASSWORD="$SPRING_DATASOURCE_PASSWORD" psql -h "$HOST_IPV4" -p "$PORT" -U "$SPRING_DATASOURCE_USERNAME" -d "postgres" -c '\l' > /dev/null 2>&1; do
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
