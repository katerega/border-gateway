# Border Gateway

[![Docker Pulls](https://img.shields.io/docker/pulls/linksmart/bgw.svg)](https://hub.docker.com/r/linksmart/bgw/tags)
[![GitHub tag (latest SemVer)](https://img.shields.io/github/tag/linksmart/border-gateway.svg)](https://github.com/linksmart/border-gateway/tags)
[![Build Status](https://travis-ci.com/linksmart/border-gateway.svg)](https://travis-ci.com/linksmart/border-gateway)

The LinkSmart Border Gateway provides a single point of entry into an Internet of Things
autonomous system (IoT AS) consisting of connected devices, their supporting services and the messaging infrastructure.
These are the main functionalities:

* TLS offloading at the edge of the protected autonomous system for the following protocols:
    * HTTPS
    * TLS-encrypted MQTT
    * TLS-encrypted WebSocket
* Authentication and authorization for HTTP, MQTT and WebSocket requests.
  Users and their permissions can be defined using an Identity Provider conforming to
  the OpenID Connect protocol.
* Access control for HTTP requests can be defined for the type of protocol (HTTP or HTTPS),
  requested resources (or paths) and allowed HTTP methods.
* Access control for MQTT requests can be defined for topics, wildcards, and MQTT commands
  (publish, subscribe etc.).
* Access control for WebSocket connections can be defined for hostname, port and request paths.
* HTTP request forwarding to internal services according to location definitions
  (e.g. a request to `https://iot.linksmart.eu/<location>` can be forwarded to localhost or
  any other host protected by the Border Gateway on the correct port).
* Address translation for HTTP requests, i.e. internal IoT-AS addresses in HTTP responses can be
  translated to external addresses that the requester is able to connect to.

![Border Gateway architecture](https://github.com/linksmart/border-gateway/blob/master/paper/figure.png)

## Getting Started

It is recommended to take twenty minutes to do the [tutorial][Tutorial] to get a better understanding about possible configurations and use cases.

Find the complete documentation [here][Documentation].

## Deployment 

See the [deployment page][Deploy].

## Configuration

The microservices share a common configuration file ``config.toml``. Find a commented configuration example in the [tutorial][Tutorial] (raw file [here][Configuration]). Also have a look under `/test` for more example configurations.

## Development

Border Gateway consists of a number of optional Node.js-based microservices:

* bgw-auth-service: Handles requests to the OpenID Connect provider.
* bgw-external-interface: Handles TLS offloading.
* bgw-http-proxy: Handles connections to HTTP based services / REST APIs.
* bgw-mqtt-proxy: Handles connections to MQTT brokers.
* bgw-websocket-proxy: Handles connections to WebSocket services.

Dependencies for each microservice are listed in their respective `package.json` file. To start a single service run

```bash
npm install
node <bgw-microservice-name>/index.js
```

It is highly recommended to run the Border Gateway using Docker and docker-compose (see [deployment page][Deploy]).

If Docker is available on your machine, you can run the Border Gateway test suite locally by cloning the repository and then running

```bash
./test/build_and_run_tests.sh tutorial no_ssl nginx nginx_no_x_forward nginx_444
```

This creates a full setup with Keycloak as an OpenID Connect provider, web servers (nginx) using self-signed TLS certificates and some backend components, then runs tests on the Border Gateway using all supported protocols for multiple configurations.

## Contributing

Feel free to create an issue or fork and create a pull request in GitHub in case you want to contribute to the software.

[Documentation]: https://github.com/linksmart/border-gateway/wiki
[Tutorial]: https://github.com/linksmart/border-gateway/wiki/Tutorial
[Docker]: https://hub.docker.com/r/linksmart/bgw/tags
[Deploy]: https://github.com/linksmart/border-gateway/wiki/Deployment
[Configuration]: https://raw.githubusercontent.com/linksmart/border-gateway/master/test/tutorial/config.toml

