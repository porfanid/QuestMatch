---
sidebar_position: 1
---

# Create New Endpoint

To create a new endpoint you can go to the functions directry in the BackEnd directory and edit the ```index.js``` file(```BackEnd/functions/index.js```).

## What is the endpoint?

If you have a url, like this: `https://github.com/porfanid/` You have the host: `https://github.com` and the endpoint: `/porfanid`. So it is basically the part of the url that is not the host.

## Add an endpoint

The back end is a simple express server. To add an endpoint you just have to use the implemented express app.

> If you want to add a custom express app(for example you want to use another file, you are going to have to make sure that the main express app uses the express app you have created)

## How to create a simple endpoint

In order to create an endpoint you are going to have to add a function.

```javascript
app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});
```

This is an example function that will send `hello world` as a respond. You can add anything else you want from here. he respond should be in json format so that the front end developers can use it without much hussle.

If you want to create a new express app, then you will have to read the official documentation on how to write an express web server and you can include it as follows:

```javascript
app.use("/newEndpoint", customExpressApp);
```

Now, to access the endpoint, you will have to go to:
`https://{host}/newEndpoint/{your endpoint}`

This will help categorise the endpoints based on which function each endpoint is doing.
