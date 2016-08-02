'use strict';

const defaults = require('../../lib/defaults');
const hook = require('../../lib');
const test = require('tape-expect');

function Mycro(number) {
    this._appPath =  __dirname + `/../apps/${number}`;
    this.config = new Object();
}

test('should load all containers', function(t) {
    const mycro = new Mycro(1);
    hook.call(mycro, function(err) {
        t.expect(err).to.be(undefined);
        Object.keys(defaults).forEach(function(container) {
            t.expect(mycro).to.have.property(container);
            t.expect(mycro[container]).to.be.an('object');
        });
        t.expect(mycro.connections).to.have.property('mongodb');
        ['healthcheck', 'users/detail'].forEach(function(controller) {
            t.expect(mycro.controllers).to.have.property(controller);
            t.expect(mycro.controllers[controller]).to.be.an('object');
            t.expect(mycro.controllers[controller].index).to.be.a('function');
        });
        ['post', 'user'].forEach(function(model) {
            t.expect(mycro.models).to.have.property(model);
            t.expect(mycro.models[model]).to.be.a('function');
        });
        t.expect(mycro.policies).to.have.property('authenticate');
        t.expect(mycro.policies.authenticate).to.be.a('function');
        t.expect(mycro.services).to.have.property('foo');
        t.end();
    });
});

test('should not error if a container is missing', function(t) {
    const mycro = new Mycro(2);
    hook.call(mycro, function(err) {
        t.expect(err).to.be(undefined);
        ['connections', 'controllers', 'models', 'policies'].forEach(function(container) {
            t.expect(mycro).to.not.have.property(container);
        });
        t.expect(mycro).to.have.property('services');
        t.expect(mycro.services).to.have.property('test');
        t.end();
    });
});

test('should allow for custom configuration via "containers" config', function(t) {
    const mycro = new Mycro(3);
    Object.assign(mycro.config, {
        containers: {
            schemas: {
                filter:  /(.+)\.json$/,
            }
        }
    });
    hook.call(mycro, function(err) {
        t.expect(err).to.be(undefined);
        t.expect(mycro).to.have.property('schemas');
        t.expect(mycro.schemas).to.have.property('test');
        t.end();
    });
});
