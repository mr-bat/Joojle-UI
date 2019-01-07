# Joojle-UI

Joojle was our course project which just got serious! Code is really functional and can become a competitor of Doodle. It is really useful if you want to prepare a local version of Doodle for yourself.

![Homepage Demo](/dashboard-simple/README-assets/mainpage.png?raw=true "Homepage")

# Install Dependencies
Actually we didn't have time to refine the initial setup. We appreciate PRs :D
In order to install dependencies when you have cloned the project, run
```
npm install static-server
cd dashboard-simple/
npm install
```

# To run app
```
static-server ./
```

Then in another terminal
```
cd dashboard-simple/
PORT=3001 npm start
```

Now move to http://localhost:9080

**Be Cautious!** [Joojle-Server](https://github.com/mr-bat/Joojle-Server) is designed in a way that the UI is up on port 3001. There is no problem if you want to change the port, but if you want to utilize Joojle-Server you have to change its code yourself. This dependency is maded only because our project was first created as a course work and then grew into a serious competant application. Excuse us because of this bad design.

Also it is worth mentioning that the background design is created from the templates provided by [HTML5 UP](http://html5up.net/)
