let config = {
     bind_addresses: [
        "127.0.0.1"
    ],
    bind_port: 5051,
    disconnect_on_unauthorized_publish: false,
    disconnect_on_unauthorized_subscribe: false,
    authorize_response: false,
    broker: {
        address: "localhost",
        port: 1883,
        username: false,
        password: false,
        tls: false,
        tls_ca: false,
        tls_client_key: false,
        tls_client_cert: false
    },
    aaa_client: {
        name: "mqtt-proxy",
        log_level: "",
        no_timestamp: false
    },
    no_auth: false,
    auth_service: "http://localhost:5053/auth",
    openidConnectProviderName: undefined
};
const fs = require('fs');
const configFromFile = require('../config/config.json');
if(configFromFile["mqtt-proxy"]) {
    Object.assign(config, configFromFile["mqtt-proxy"]);
}
module.exports = config;
