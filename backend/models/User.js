'use strict';

let mongoose = require('mongoose'),
    crypto = require('crypto'),
    config = global.config,
    userSchema = mongoose.Schema({
        login: String,
        password: String
    });
userSchema.methods.toJSON = function(){
    return {
        id: this._id,
        login: this.login
    }
};
var User = mongoose.model('User', userSchema);

module.exports = {

    findById (id) {
        return User.findOne({'_id': id}).then((user) => {
            if(user) {
                return user.toJSON()
            } else {
                return {}
            }
        });
    },

    register (login, password) {
        var newUser = new User({login: login, password: this.getHashedString(password)});
        return newUser.save();
    },

    authenticate (user, ctx){


        return user.toJSON();
    },

    async checkPassword (login, password){
        let user = await User.findOne({'login': login});
        if(!user){
            throw new Error('User not found!');
        }
        if(this.getHashedString(password) === user.password) {
            return user;
        } else {
            throw new Error('Login or password incorrect');
        }
    },

    getHashedString(string){
        var md5sum = crypto.createHash('sha256');
        md5sum.update(string + config.passwordSalt);
        return md5sum.digest('hex');
    }

};