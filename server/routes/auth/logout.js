"use strict";

const request = require("request");

const HttpError = require("../../lib/http-error");

module.exports = function(config, req, res, next) {
  if (!!req.session) {
    req.session = null;
    return res.redirect(307, "/");
  }

  const uri = `${config.oauth.authorization_url}/oauth/revoke_token/`;
  console.log("revoking " + req.session.user.token);
  request.post(
    {
      url: uri,
      form: {
        client_id: config.oauth.client_id,
        client_secret: config.oauth.client_secret,
        token: req.session.user.token
      }
    },
    function(err, response, body) {
      if (err) {
        res.status(500);
        next(
          HttpError.format(
            {
              message: `Failed to send request to ${
                uri
              }. Verify that the authentication server is up and running.`,
              context: err
            },
            req
          )
        );
        return;
      }

      if (response.statusCode !== 200) {
        res.status(response.statusCode);
        next(
          HttpError.format(
            {
              message: `Request to ${uri} returned a status of ${
                response.statusCode
              }`,
              context: response.body
            },
            req
          )
        );
        return;
      }

      req.session = null;
      res.redirect(307, "/");
    }
  );
};
