FROM nginx:1.27

COPY ./reverse_proxy/localhost.pem /etc/nginx/ssl/localhost.pem
COPY ./reverse_proxy/localhost-key.pem /etc/nginx/ssl/localhost-key.pem
COPY ./reverse_proxy/default.conf /etc/nginx/conf.d/default.conf
