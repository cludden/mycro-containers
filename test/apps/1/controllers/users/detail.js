'use strict';

module.exports = function(mycro) {
    return {
        index(req, res) {
            const Foo = mycro.services.foo;
            const result = Foo.bar(1,3);
            res.status(200).json({ result });
        }
    };
};
