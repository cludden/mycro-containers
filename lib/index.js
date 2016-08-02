'use strict';

const fp = require('lodash/fp');
const include = require('include-all');

module.exports = function containers(done) {
    const mycro = this;

    // ensure appPath present
    const appPath = mycro._appPath;
    if (!fp.isString(appPath)) {
        return process.nextTick(function() {
            const err = new Error('Mycro is missing required "_appPath" variable');
            done(err);
        });
    }

    // determine appropriate hook configuration
    const defaultConfig = require('./defaults');
    const userConfig = fp.get('config.containers', mycro);
    const config = fp.isObject(userConfig) ? userConfig : defaultConfig;

    const getOptions = function(name, options) {
        return fp.defaults({
            dirname: mycro._appPath + '/' + name,
            filter:  /(.+)\.js$/,
            excludeDirs:  /^\.(git|svn)$/,
            keepDirectoryPath: true,
            flattenDirectories: true,
            optional: true
        }, fp.isObject(options) ? options : {});
    };

    // loop keys in configuration and load containers
    Object.keys(config).forEach(function(name) {
        const options = getOptions(name, config[name]);
        const container = fp.mapValues(function(mod) {
            if (fp.isFunction(mod)) {
                return mod(mycro);
            }
            return mod;
        }, include(options));
        if (Object.keys(container).length > 0) {
            mycro[name] = fp.merge(mycro[name], container);
        }
    }, {});

    process.nextTick(done);
};
