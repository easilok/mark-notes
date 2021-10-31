# Introduction

This is a(nother) note taking app, for those who wishes to take their notes in
markdown. 

# Features

- Notes written in markdown through an IDE-like editor provided by [CodeMirror](https://codemirror.net/)
- Preview markdown as full screen or split screen as you type
- Syntax highlight on IDE-like editor and on preview (using Tania Rascia's 
  [New Moon Theme](https://taniarascia.github.io/new-moon/) for now)
- Multi-cursor editing (feature from [CodeMirror](https://codemirror.net/))
- No database because the notes are stored in your browser

# About 

This app is heavily inspired in the [Tania Rascia's Takenote](https://github.com/taniarascia/takenote) 
that I found when searching for good self-hosted note taking apps. In the
future developments it will also have some minor inspirations on the 
[QingWei-Li's Notea](https://github.com/QingWei-Li/notea).

I found that Takenote is a well feature app, but its missing a way to interact
with it in mobile. I want a note taking app that I can access everywhere. I
thought of adding it to Takenote but I was take it as a opportunity to create a
good and kind of big project with React and Typescript, applying some of the
knowledge I recently got and gaining some more, and this is the result of my
time on it.

# Future development

I want to make this app full feature and more useful, and for that I want to
add the next features in the near future

- Database mode to multi place access (described below)
- Export/Import your notes
- Note categories, for better filter your categories
- Keyboard shortcuts for easiness in working with it
- Progressive web app, or even a mobile app version

# Database mode (Future feature)

This is a mode that I found lacking in some of the applications I tried. 
[Takenote](https://github.com/taniarascia/takenote) has a feature kind of like
this, but is locked to using github as storage. [Notea](https://github.com/QingWei-Li/notea)
has a feature like this, because is embedded in a server, and uses one of
several storage services to provide that feature.

What I want is an abstraction, meaning, this application is a client, that will
be able to work in local storage mode, or cloud. For the last one, there will be 
well defined API endpoints that the application searches, the user only needs
to point for the server address that provides data on those endpoints.

I will also make a server application that will implement those API endpoints and 
anyone will be able to install and make the pair the two parts.

# Use this application

There is a [demo version](http://easilok-notes.netlify.com) of the application
online for anyone to try (local browser storage).

To host this application, it's very simple, as it is a simple react app. 
Just clone the repo, install the dependencies with

```bash
npm install
```

And build the production version with

```bash
npm build
```

Then the application can be served from the build folder.

For development, you can run the command:

```bash
npm start
```

That will build and spin up a local server.
