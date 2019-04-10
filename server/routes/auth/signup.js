module.exports = function(config, req, res) {
    req.session.locale = req.localeInfo && req.localeInfo.lang ? req.localeInfo.lang : "en-US";

    res.set({
        "Cache-Control": "no-cache"
    });

    res.redirect(307, '/login?signup=true');
};
