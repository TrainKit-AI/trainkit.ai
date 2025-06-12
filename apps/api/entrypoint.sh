#!/bin/bash

echo "⏳ Vérification de la connexion à la base de données..."

# Tentative de connexion
PGPASSWORD="$SPRING_DATASOURCE_PASSWORD" psql "$SPRING_DATASOURCE_URL" -U "$SPRING_DATASOURCE_USERNAME" -c '\dt' || {
  echo "❌ Échec de connexion à la base PostgreSQL"
  exit 1
}

echo "✅ Connexion à la base PostgreSQL réussie"

# Lancer l'application Spring Boot
exec java -jar app.jar