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
- Export/Import your notes in markdown
- Server mode with database to multi place access (described below)

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

- Note categories, for better filter your categories
- Keyboard shortcuts for easiness in working with it
- Progressive web app, or even a mobile app version (some initial setup is
  already made)

# Server mode with database

This is a mode that I found lacking in some of the applications I tried.
[Takenote](https://github.com/taniarascia/takenote) has a feature kind of like
this, but is locked to using github as storage. [Notea](https://github.com/QingWei-Li/notea)
has a feature like this, because is embedded in a server, and uses one of
several storage services to provide that feature.

What I want is an abstraction, meaning, this application is a client, that is
able to work in local storage mode, or with a cloud setup to multi access. 

At this moment, the application needs the following REST endpoints to work properly:

#### GET /api/catalog
This endpoint should return the catalog of the current available notes with the following JSON structure:
```JSON
{
    "data": {
        "notes": [
            {
                "filename": "note1",
                "title": "note title 1",
                "favorite": false
            },
            {
                "filename": "note2",
                "title": "note title 2",
                "favorite": false
            }
        ]
    }
}            
```

#### PATCH /api/favorites/:filename
This endpoint receives in the URL the filename (as returned in the previous endpoint)
and in the body is sent JSON data as follows:
```JSON
{
    "favorite": true/false
}            
```

Any returned data is not currently used. The example server returns the following JSON structure:
```JSON
{
    "data": {
        "filename": "note1",
        "title": "note title 1",
        "favorite": true
    }
}            
```

#### GET /api/note/:filename
This endpoint should return the content of the note represented with the URL field _filename_, and the data is the 
following JSON structure:
```JSON
{
    "data": {
        "content": "## this is the note title 1",
        "filename": "note1"
    }
}
```

#### PUT /api/note/:filename
This endpoint receives in the URL the filename of the file to create/edit. The endpoint is the same 
for a new note or a existing one. The server should know if the file exists or not to create or update it.
The body of the request is filled with the following JSON data, that represents the content of the note:
```JSON
{
    "content": "## this is the note title 1"
}            
```

Any returned data is not currently used. The example server returns the following JSON structure:
```JSON
{
    "data": {
        "filename": "note1",
        "title": "note title 1",
        "favorite": true
    }
}            
```

#### DELETE /api/note/:filename
This endpoint should delete the note represented in the URL as the field _filename_ and remove it 
from the catalog. 

Any returned data is not currently used. The example server returns the following JSON structure:
```JSON
{
    "data": true,
    "message": ""
}
```

#### GET /api/note/scan
This endpoint should fetch the server for notes that are note cataloged and add them. This allows
to manually add notes to the server file system and then catalog them into the application. This is a 
feature not mandatory, and to not implement it, it should only return an empty array in the structure below.

The endpoint should return the following JSON structure, that contains only the notes that were not 
cataloged:
```JSON
{
    "data": {
        "notes": [
            {
                "filename": "missingNote1",
                "title": "Missing note 1 title",
                "favorite": false
            },
            {
                "filename": "missingNote2",
                "title": "Missing note 2 title",
                "favorite": false
            }
        ]
    }
}
```

[Here I have a simple server in go that anyone can use](https://github.com/easilok/mark-notes-server).

# Future Work

The next big step is to add authentication to the server mode. After that, I'll
work on the search note feature and finally the categories.

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
