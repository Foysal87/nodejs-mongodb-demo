# nodejs-mongodb-demo

**Nodejs+mongodb+Authentication+express.js+Model–view–controller**

## What do you find here?

As nodejs doesn't give anything with the project, so we need to create everything manually. It is very difficult and time-consuming work.
So here, i will show you,"How to directly you can get full setup" .
Also Here, I give setup instructions of nodejs and MongoDB. Just follow the instructions.

## Outline

* [Nodejs installation](#nodejs-installation)
* [Specific version nodejs installation](#specific-version-nodejs-installation)
* [nodejs setup](#nodejs-setup)
* [MongoDB installation](#mongodb-installation)
* [MongoDB compass installation (MongoDB software)](#mongodb-compass-installation-mongodb-software)
* [MongoDB Setup](#mongodb-setup)
* [Setup the demo project](#setup-the-demo-project)
* [Checking Authentication](#checking-authentication)
* [Conclusion](#conclusion)


<img src="/demo/demo1.jpg" width="700" height="400" alt="web home page">
<img src="/demo/demo2.png" width="700" height="400" alt="demo_pic1">
<img src="/demo/demo3.png" width="700" height="400" alt="demo_pic1">
<img src="/demo/demo4.png" width="700" height="400" alt="demo_pic1">

## Demo project content

* User Authentication system (Signup/sign in login)
* database system
* Controller,View,Model system with connection
* ejs template system
* database model system
* Public content connection setup

**All these things will be found in this repository**


### Nodejs installation

```
sudo apt install nodejs
sudo apt install npm
```

These two commands in a terminal will download the latest version of nodejs.

### Specific version nodejs installation

If You want any specific version of nodejs, then run these commands in terminal

```
sudo apt install build-essential checkinstall libssl-dev

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.1/install.sh | bash
```

Restart the terminal

```
nvm --version

nvm install v13.14.0

sudo apt-get install npm
```

It will install v13.14.0. Also, you can check all available versions by calling this command.

```
nvm ls-remote
```

### Nodejs setup

**Ignore this section if you want my demo project as initial**. If you don't want these setup.  you can make your own project setup by calling,

```
npm init
```

### MongoDB installation

```
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -

echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list

sudo apt update

sudo apt-get install -y mongodb-org
```

If you get any error in your system. You can ignore them or you can download the broken files manually.

### MongoDB compass installation (MongoDB software)

 Instead of using the terminal for checking the database, we will use MongoDB compass
```
wget https://downloads.mongodb.com/compass/mongodb-compass_1.24.1_amd64.deb
sudo dpkg -i mongodb-compass_1.24.1_amd64.deb
```

You can find a compass software in your software list now.

### MongoDB Setup

```
sudo chown -R mongodb:mongodb /var/lib/mongodb
sudo chown mongodb:mongodb /tmp/mongodb-27017.sock
sudo service mongod start
sudo service mongod status
```
You can see **Active message there** . Whenever you get compass connection problem, you must **start mongodb service** again.

### Setup the demo project

* Clone this demo project by 

```
git clone https://github.com/Foysal87/nodejs-mongodb-demo.git
```

* open this project in VS code.
* Open a new terminal in vs code
* in terminal type

```
npm install
```
* Go to compass software on your pc. and connect it.
* Start the server by 

```
node .
```

* If you don't get any Error. Go to your browser and type "localhost:3000"
* You can see the full setup
* As my project is so simple. You can easily create and change everything.

### Checking Authentication

* Sign up with any username
* I didn't increase password and username length(you can change the size of the password). So you can put any length password.
* If you give the wrong value, you will get a validation error.
* login with username and password
* You will find the profile page.
* Check your database, you will find an entry.
* You also find the password encrypted

### Conclusion

I create it because if anyone forgot the setup of nodejs, they can easily set up with this. Also, this demo project initializes everything.
