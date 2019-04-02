"use strict";

module.exports = function(config, req, res, next) {
  var locale = req.session.locale;
  if (!locale) {
    // This can happen when we try to logout again when we are already
    // logged out (i.e. the session doesn't exist and hence req.session.locale
    // is undefined)
    locale =
      req.localeInfo && req.localeInfo.lang ? req.localeInfo.lang : "en-US";
  }

  res.set("Cache-Control", "no-cache");

  req.session = null;
  return res.redirect(307, "/" + locale);
};
