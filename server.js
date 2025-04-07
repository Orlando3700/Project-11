// server.js

//This imports the express module, which is used to create a web 
//server and define routes and middleware for handling HTTP requests 
//in Node.js.
var express = require('express');
//This imports the cors module, which is used to handle Cross-Origin 
//Resource Sharing (CORS). This is necessary when you want to allow 
//requests from different origins (e.g., when your frontend is running 
//on a different domain/port than your backend).
var cors = require('cors');
//This creates an instance of an Express application. This object is 
//used to define routes and middleware for handling requests.
var app = express();
//This defines a variable port with the value 3000. This is the port 
//number where the server will listen for incoming requests
var port = 3000;

// Middleware
//This is a middleware that tells Express to automatically parse 
//incoming requests with a Content-Type of application/json. It 
//converts the request body into a JavaScript object so it can be 
//easily accessed via req.body.
app.use(express.json()); // For parsing application/json
//This middleware allows cross-origin requests. By calling cors(), 
//the server will accept requests from any domain or port. This is 
//particularly useful for handling requests made from a different 
//domain than the server
app.use(cors()); // Allow cross-origin requests

// In-memory message storage (for simplicity)
let messages = [];

// API to get all messages
//This defines a route handler for GET requests to the /api/messages 
//endpoint. The callback function receives the request (req) and 
//response (res) objects. It will be used to return all messages 
//stored in the messages array.
app.get('/api/messages', (req, res) => {
  //This sends a JSON response to the client with the current list of 
  //messages. The res.json() function automatically sets the 
  //Content-Type to application/json and sends the data as JSON.
  res.json(messages);
});

// API to send a new message
//This defines a route handler for POST requests to the /api/messages 
//endpoint. The callback function receives the request (req) and 
//response (res) objects. This route is used to create a new message 
//and add it to the messages array.
app.post('/api/messages', (req, res) => {
  //This destructures the message property from the request body 
  //(req.body). This is where the client sends the message content they 
  //want to save. For example, the body might look like 
  //{ "message": "Hello!" }.
  var { message } = req.body;
  if (message) {
	//This creates a new message object with two properties:
	//text: the content of the message (message).
	//timestamp: the current date and time, formatted as an ISO string (new Date().toISOString()).
    var newMessage = { text: message, timestamp: new Date().toISOString() };
    //This adds the newly created message to the messages array
	messages.push(newMessage);
	//This sends a 201 Created status code along with the newMessage 
	//object in the response. The 201 status indicates that a new 
	//resource (message) has been successfully created.
    res.status(201).json(newMessage);
  } else {
	//This sends a 400 Bad Request status code along with a JSON 
	//object containing an error message. It informs the client that 
	//the message content is required to successfully create a new 
	//message.
    res.status(400).json({ error: 'Message content is required' });
  }
});

// Start the server
//This tells the Express application to listen for incoming requests 
//on the specified port (3000). Once the server is running, the 
//callback function will be executed.
app.listen(port, () => {
  //This logs a message to the console indicating that the server 
  //is running and accessible at the specified URL (http://localhost:3000).
  console.log(`Server is running on http://localhost:${port}`);
});


