# FoodStuffs

This is Node.js application that stores recipes. It is similar to the asp.net variant of the same name. 

## Technologies

This application was built on Node.js, Express, and uses the Jade templating engine and stores to a local MongoDb.

The future goal is to implement Angular for change saving and other features, possibly adding multi-user support and a news feed for sharing recipes.

## How to run

1. Install Node.js
2. Open terminal and cd to directroy that has package.json
3. run 'npm install'
4. To run the site you can use 'node ./bin/www'
5. If you want to use bower to manage the front end modules
    --1. Install Python 2.7.2
    --2. Install Gyp via 'npm install -g node-gyp
    --3. Run 'bower install' to ensure the packages are fully installed.
6. Install Mongodb. Add mongo and mongod to your system and user paths.
    --1. Create a new mongo database called foodstuffs (if you want to change this, change the connection string "dbUrl" in index.js.
    --2. Create a collection called recipes inside the foodstuffs database.
7. Start the app with 'npm start'
    --1. Note that this will start the database server automatically.
        
The steps for installing this particular framework can also be found [here](https://youtu.be/Avv-Y_ePYA0) courtesy of [Derek Banas](http://www.newthinktank.com/).