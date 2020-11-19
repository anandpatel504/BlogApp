const { Model } = require('objection');
const knex = require('../config/dbConfig');
Model.knex(knex);

// unique email
const unique = require('objection-unique')({
    fields: ['email'],
    identifiers: ['id']
  });

class Users extends unique(Model) {
    static get tableName() {
        return 'users';
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['email'],
            properties: {
                id: { type: 'integer' },
                name: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string' },
                password: { type: 'string' }
            }
        }
    }
}
module.exports = Users;