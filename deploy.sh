#!/usr/bin/env bash
# Publica el sitio estático (carpeta www/) en el servidor Apache vía rsync sobre SSH.
#
# Uso:
#   ./deploy.sh usuario@servidor:/ruta/al/docroot
# o:
#   DEPLOY_TARGET="ubuntu@bitspace.software:/var/www/html/bitspace.software" ./deploy.sh
set -euo pipefail

TARGET="${1:-${DEPLOY_TARGET:-}}"
if [ -z "$TARGET" ]; then
  echo "Uso: ./deploy.sh usuario@servidor:/ruta/al/docroot" >&2
  exit 1
fi

echo "▶ Publicando www/ → $TARGET"
rsync -avz --delete --exclude '.git' --exclude '.well-known' www/ "${TARGET%/}/"

echo "✓ Publicado."
