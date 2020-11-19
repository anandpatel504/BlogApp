const { Model } = require('objection');
const knex = require('../config/dbConfig');
Model.knex(knex);

class LikeDislike extends (Model) {
    static get tableName() {
        return 'likeDislike'
    }
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['user_id'],
            properties: {
                id: { type: 'integer' },
                user_id: { type: 'integer' },
                like: { type: 'string' },
                dislike: { type: 'string' },
            }
        }
    }

    static get relationMappings() {
        const Users = require('./users')
        return {
            users: {
                relation: Model.BelongsToOneRelation,
                modelClass: Users,
                join: {
                    from: 'likeDislike.user_id',
                    to: 'users.id'
                }
            }
        }
    }
}

// class LikeDislike extends Model {
//     static get tableName() {
//       return 'likeDislike';
//     }
  
//     static get relationMappings() {
//         const Users = require('./users')
//         return {
//             users: {
//                 relation: Model.BelongsToOneRelation,
//                 modelClass: Users,
//                 join: {
//                     from: 'likeDislike.user_id',
//                     to: 'users.id'
//                 }
//             }
//         }
//     }
//   }
  

module.exports = LikeDislike;