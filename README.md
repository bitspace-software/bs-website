# Bitspace Software — sitio

Sitio estático de una sola página (sin framework). Todo vive en `www/`:

- `www/index.html` — la página (HTML + CSS inline, sistema de diseño por variables, tema claro/oscuro).
- `www/favicon.svg`, `www/robots.txt`, `www/.htaccess`

## Desarrollo

Abre `www/index.html` en el navegador, o sirve la carpeta:

    cd www && python3 -m http.server 4321

## Despliegue

Producción es Apache, servido desde `/var/www/html/bitspace.software/`. Publica con:

    ./deploy.sh ubuntu@bitspace.software:/var/www/html/bitspace.software/

(Sincroniza `www/` al docroot vía rsync sobre SSH. Usa `--delete`.)
