'use strict';

module.exports = function() {
    return function(connection, Schema) {
        const schema = new Schema({
            first: String,
            last: String
        });

        return connection.model('user', schema);
    };
};
