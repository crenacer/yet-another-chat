Simple Chat App
============

App is ready to deploy and can be scaled without any changes to project: sessions, messages, users stored in standalone storages: Redis and mongoDB.

TOC
------------

* [Requirements](#requirements)
* [Installation](#installation)
* [Environments configuration](#environments configuration)
* [Tests](#tests)
* [Screenshots](#screenshots)

##Requirements

* **nodejs 7.10.0** (latest)
* **redis**. Default: listening on localhost:6379
* **mongodb**. Default: listening on localhost:27017
    

##Installation

1. Clone project
2. $ npm install
3. Check configs, setup mongoDB, redis and so on if needed 
4. $ npm start

##Environments configuration
By default app uses development configuration. Set NODE_ENV=production for using production config.

Another env vars to set up production app:
 
    REDIS_HOST
    REDIS_PORT
    REDIS_PASSWORD
    MONGO_URL
    PASSWORD_SALT
    
##Tests

TBD

##Screenshots

Some screenshots of app:

![Login page](https://raw.githubusercontent.com/Groumentt/simple-chat/master/docs/login.png)

![Register page](https://raw.githubusercontent.com/Groumentt/simple-chat/master/docs/register.png)

![Chat page](https://raw.githubusercontent.com/Groumentt/simple-chat/master/docs/chat.png)