#!/usr/bin/env bash
# Publica el sitio en el servidor Apache vía rsync sobre SSH.
#
# Uso:
#   ./deploy.sh usuario@servidor:/ruta/al/docroot
# o exportando la variable:
#   DEPLOY_TARGET="usuario@servidor:/var/www/bitspace.software" ./deploy.sh
#
# Requiere acceso SSH ya configurado (clave o contraseña) al servidor.
set -euo pipefail

TARGET="${1:-${DEPLOY_TARGET:-}}"
if [ -z "$TARGET" ]; then
  echo "Uso: ./deploy.sh usuario@servidor:/ruta/al/docroot" >&2
  exit 1
fi

echo "▶ Construyendo (npm run build)…"
npm run build

echo "▶ Publicando dist/ → $TARGET"
# --delete elimina en el servidor archivos que ya no existen en dist/.
# Quita --delete si el docroot contiene otros archivos que debas conservar.
rsync -avz --delete \
  --exclude '.git' --exclude '.well-known' --exclude '.htaccess' \
  dist/ "${TARGET%/}/"

echo "✓ Publicado. Verifica con:"
echo "  curl -s -H 'Cache-Control: no-cache' \"https://bitspace.software/?cb=\$RANDOM\" | grep -o 'no deberían ser manuales'"
