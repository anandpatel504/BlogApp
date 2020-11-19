const Users = require('../models/users');
const bcrypt = require('bcrypt');

module.exports = class UserService {
    async findAll(txn) {
        const users = await Users.query(txn);
        console.log(users, "txn users")
        return users;
    }

    async createUsers(details) {
        const pass = await bcrypt.hash(details.password, 5)
        details['password'] = pass
        return await Users.query().insertGraph(details);
    }

    async emailChecking(email) {
        const userDetails = await Users.query().findOne({
            email: email
        })
        return userDetails;
    }

    async PassChecking(userInfo, Pass) {
        return await bcrypt.compare(Pass, userInfo.password)
    }

    async findById(userId) {
        const id = await Users.query().findById(userId);
        console.log(id, "ser id");
        return id;
    }

}