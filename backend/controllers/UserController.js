'use strict';

let User = require('../models/User'),
    OnlineUsersList = require('../models/OnlineUsersList');


let updateUserSession = function (session, user) {
    session.userId = user._id;
    session.authenticated = true;
    session.login = user.login;
};

module.exports = {

    getCurrentUser: async function (ctx, next) {
        let user = await User.findById(ctx.session.userId);
        if(user.login) {
            await OnlineUsersList.add(user.login);
            await OnlineUsersList.broadcast(ctx.app.io);
        }
        ctx.body = user;
    },

    login: async function (ctx) {
        let {login, password} = ctx.request.body,
            user;
        try {
            user = await User.checkPassword(login, password);
        } catch (e){
            ctx.throw(e, 400);
            return;
        }

        updateUserSession(ctx.session, user);
        await OnlineUsersList.add(user.login);
        await OnlineUsersList.broadcast(ctx.app.io);

        ctx.body = user.toJSON();
    },

    logout: async function (ctx){
        await OnlineUsersList.remove(ctx.session.login);
        await OnlineUsersList.broadcast(ctx.app.io);
        ctx.session = null;
        ctx.body = 'logouted';
    },

    register: async function (ctx) {
        let {login, password} = ctx.request.body,
            user;
        try {
            user = await User.register(login, password);
        } catch (e){
            ctx.throw(e, 400);
            return;
        }

        updateUserSession(ctx.session, user);
        await OnlineUsersList.add(user.login);
        await OnlineUsersList.broadcast(ctx.app.io);

        ctx.body = user.toJSON();
    }

};