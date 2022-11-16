# FROM nginx:stable-alpine

# COPY nginx.conf /etc/nginx/nginx.conf
# COPY docker-entrypoint.sh /

# WORKDIR /usr/share/nginx/html
# COPY dist/luna-bakery .

# ENTRYPOINT [ "/docker-entrypoint.sh" ]


FROM nginx:stable-alpine

USER root

RUN apk --update add bash && \
    apk add dos2unix

COPY nginx.conf /etc/nginx/nginx.conf
COPY docker-entrypoint.sh /

RUN dos2unix /docker-entrypoint.sh

RUN chmod 777 -R /docker-entrypoint.sh

WORKDIR /usr/share/nginx/html
COPY dist/luna-bakery .


ENTRYPOINT [ "/docker-entrypoint.sh" ]
