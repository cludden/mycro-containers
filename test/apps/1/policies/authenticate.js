'use strict';

module.exports = function() {
    return function(options) {
        return function authenticate(req, res, next) {
            if (req.headers['x-is-authenticated'] || options.authenticated === true) {
                req.authenticated = true;
            }
            next();
        };
    };
};
