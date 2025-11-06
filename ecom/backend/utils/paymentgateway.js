const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = process.env.SSL_STORE_ID;
const store_passwd = process.env.SSL_STORE_PASS;
const is_live = false; //true for live, false for sandbox

const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

module.exports = sslcz;
