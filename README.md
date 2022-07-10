# GoChamp

## Overview

This project contains the client for GoChamp. A game selection and sports performance insight tool.

## Running the Project

To run a local version use the command `npm start` from the root directory.

By default the app will try to access data from the hosted api at https://api.gochamp.co.uk - this will work whilst this application remains in development as CORS has been enabled on the server.

To use a local version of the server create a .env file in the root directory with the following variable:

```
REACT_APP_API=http://localhost:8080
```

The server will use port 8080 by default, if you have specified an alternative port, mirror that selection here.
