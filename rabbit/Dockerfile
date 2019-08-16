# https://github.com/docker-library/healthcheck

FROM rabbitmq:3-alpine

RUN apk add --no-cache bash

COPY docker-healthcheck /usr/local/bin/

HEALTHCHECK CMD ["docker-healthcheck"]
