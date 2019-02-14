let config = {
    tls_key: "",
    tls_cert: "",
    request_client_cert: false,
    client_ca_path: false,
    enable_ALPN_mode: false,
    servers:
        [
            {
                name: "http_proxy",
                bind_addresses: ["0.0.0.0"],
                bind_port: 443,
                dest_port: 5050,
                dest_address: "127.0.0.1"
            },
            {
                name: "mqtt_proxy",
                bind_addresses: ["0.0.0.0"],
                bind_port: 8883,
                dest_port: 5051,
                dest_address: "127.0.0.1"
            },
            {
                name: "websocket_proxy",
                bind_addresses: ["0.0.0.0"],
                bind_port: 9002,
                dest_port: 5052,
                dest_address: "127.0.0.1"
            }
        ],
    aaa_client: {
        name: "external-interface",
        log_level: "",
        no_timestamp: false
    }
};
const fs = require('fs');
const configFromFile = require('../config/config.json');
if (configFromFile["external-interface"]) {
    Object.assign(config, configFromFile["external-interface"]);
}
module.exports = config;
