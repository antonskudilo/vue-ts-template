FROM nginx:alpine
RUN apk add --no-cache gettext
COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template
CMD envsubst '$APP_URL $API_URL' < /etc/nginx/templates/nginx.conf.template > /etc/nginx/conf.d/default.conf \
    && nginx -g 'daemon off;'