module.exports = {
  init: function(app, middleware, config) {
    app.get("/login", require("./login").bind(app, config));
    app.get("/signup", require("./signup").bind(app, config));
    app.get("/logout", require("./logout").bind(app, config));

    app.get(
      "/callback",
      middleware.setErrorMessage("errorAuthenticating"),
      require("./oauth2-callback").bind(app, config)
    );
  }
};
