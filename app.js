// app.js

// Function to send a message
async function sendMessage() {
  var messageInput = document.getElementById('message-input');

  //This gets the value that the user typed into the message input
  // field (messageInput.value) and removes any leading and trailing 
  //spaces with trim().
  var message = messageInput.value.trim();

  if (message !== '') {
    // Send message to the backend API
	//The try block is used to handle errors. Code within this block
	// will execute, and if any error occurs, it will be caught by 
	//the catch block.
    try {
	  //This sends an HTTP POST request to the server at the URL 
	  //'http://localhost:3000/api/messages'. The await keyword ensures 
	  //that the code waits for the server's response before continuing.
      var response = await fetch('http://localhost:3000/api/messages', {
        //This specifies the HTTP method for the request, which in 
		//this case is POST. This method is used to send data to the server.
		method: 'POST',
		//This sets the request's headers. The 'Content-Type': 
		//'application/json' indicates that the body of the request 
		//will be in JSON format.
        headers: {
          'Content-Type': 'application/json'
        },
		//This converts the message object into a JSON string to send
		// in the body of the POST request.
        body: JSON.stringify({ message })
      });

	  //This checks if the response from the server is successful
      // (status code 200-299). response.ok returns true if the 
      //response was successful.
      if (response.ok) {
		//This reads the response body and converts it into a 
		//JavaScript object using .json(). The await keyword ensures 
		//it waits for the server's response before continuing.
        var newMessage = await response.json();
		//This calls the displayMessage function to display the new 
		//message that was just sent. It passes the newMessage object 
		//returned from the server.
        displayMessage(newMessage);
        messageInput.value = ''; // Clear input field
      } else {
        console.error('Failed to send message');
      }
	//The catch block catches any errors that occur during the 
	//execution of the try block, such as network issues or unexpected 
	//behavior.
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

// Function to display a message
function displayMessage(message) {
  //This retrieves the element with the class application-messages
  var applicationMessages = document.querySelector('.application-messages');
  //Create a div element that contains a single message
  var messageElement = document.createElement('div');
  //This adds a CSS class named message to the newly created div 
  //element.
  messageElement.classList.add('message');
  //This sets the text content of the div to the text property of the 
  //message object passed to the function.
  messageElement.textContent = message.text;
  //This adds the newly created div element to the applicationMessages
  // element, which means the message will be displayed on the page.
  applicationMessages.appendChild(messageElement);
  //This automatically scrolls the message container to the bottom, 
  //so the newest message is always visible
  applicationMessages.scrollTop = applicationMessages.scrollHeight;
}

// Fetch and display all messages when the page loads
async function loadMessages() {
  try {
    var response = await fetch('http://localhost:3000/api/messages');
    if (response.ok) {
      var messages = await response.json();
      messages.forEach(displayMessage);
    }
  } catch (error) {
    console.error('Error loading messages:', error);
  }
}

// Event listener for the send button
document.getElementById('send-button').addEventListener('click', sendMessage);

// Event listener for "Enter"
document.getElementById('message-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    sendMessage();
  }
});

// Load existing messages when the page loads
window.onload = loadMessages;


