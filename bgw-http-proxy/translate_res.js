const config = require('./config');
const logger = require('../logger/log')(config.serviceName,config.logLevel);
const url = require("url");
const domainMatch = require('domain-match');

const checkUrl = /(https?|tcp|ssl|mqtt):\/\/([\-\:\_\.\w\d]*)/g;

const encode = (data) => Buffer.from(data).toString('base64').replace(/=/g, '');
const decode = (data) => {
    const queryString = Buffer.from(data, 'base64').toString('ascii');
    let {protocol, host, port} = url.parse(queryString);
    port = port ? port : (protocol === "https:" ? 443 : 80);
    return (protocol && host && port) ? queryString : false;
};

const transformURI = (data, req, res) =>
    (data + "").replace(checkUrl, (e, i, j) => {

        logger.log('debug', 'Host headers in request',{host: req.headers.host,x_fowarded_host:req.headers['x-forwarded-host']});

        if (req.bgw.alias.translate_local_addresses && req.bgw.alias.translate_local_addresses.url_translation_map && req.bgw.alias.translate_local_addresses.url_translation_map[e]) {
            return req.bgw.alias.translate_local_addresses.url_translation_map[e];
        }

        if (!i.includes('http')) {
            return e;
        }

        let httpHost = req.headers['x-forwarded-host'] || req.headers.host;
        let splitHost;
        if(httpHost) {
            splitHost = httpHost.split(":");
        }
        else
        {
            return e;
        }
        let host = splitHost[0];
        let port = splitHost[1];

        let aliases = {};
        Object.keys(config.domains[host]).forEach((key) => aliases[config.domains[host][key].local_address] = key);
        const whitelist = req.bgw.alias.translate_local_addresses.whitelist;

        if ((whitelist && whitelist.find(d => domainMatch(d, e)))) {
            return e;
        }

        let protocol;

        if (!config.no_tls) {
            protocol = "https://";
        }
        else {
            protocol = i + "://";
        }

        const local_address = aliases[e] ? aliases[e] : encode(e);
        let external_address;
        if (parseInt(port) === 443) {
            external_address = req.bgw.alias.target_domain || host;
        }
        else {
            external_address = req.bgw.alias.target_domain || httpHost;
        }

        return protocol + external_address + "/" + local_address;
    })
;

module.exports = {decode, transformURI};
