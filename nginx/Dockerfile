FROM nginx:1.15

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

ENV SERVER_PORT=3000

ENV SERVER_HOST=server

 