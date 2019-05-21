module.exports.middleware  = function () {
    return function (req, res, next) {
        const currentUserUUID = req.session && req.session.user ? req.session.user.uuid : null;
        if (currentUserUUID) {
            const cookieUserUUID = req.cookies.bbcuuuid;
            if ((!!cookieUserUUID && currentUserUUID !== cookieUserUUID) || !cookieUserUUID) {
                req.session.token = null;
            }
        }
        next();
    };
};
