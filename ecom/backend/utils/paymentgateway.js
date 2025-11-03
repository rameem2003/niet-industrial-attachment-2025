const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = "niete6908718a571e8";
const store_passwd = "niete6908718a571e8@ssl";
const is_live = false; //true for live, false for sandbox

const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
const gotTopayment = async (data) => {
  let url = "";
  sslcz.init(data).then((apiResponse) => {
    console.log(apiResponse);

    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    // res.redirect(GatewayPageURL);
    console.log("Redirecting to: ", GatewayPageURL);
    url = GatewayPageURL;
  });

  return url;
};

module.exports = sslcz;
