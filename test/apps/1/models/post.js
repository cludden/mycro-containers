'use strict';

module.exports = function() {
    return function(connection, Schema) {
        const schema = new Schema({
            title: String,
            content: String,
            author: Schema.Types.ObjectId
        });

        return connection.model('post', schema);
    };
};
