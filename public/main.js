const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');

function sendMessage() {
    const message = userInput.value;
    //Display User message on Log
    displayMessage('user', message);
    // Call OpenAI API and get response
    getChatbotResponse(message);
    // Clear user input
    userInput.value = '';
}

function displayMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender)
    // Wrap message in <p> tag
    const messageParagraph = document.createElement('p');
    messageParagraph.innerText = message;
    // Append paragraph to div element
    messageElement.appendChild(messageParagraph);
    chatLog.appendChild(messageElement);
}

function getChatbotResponse(userMessage) {
    // Make request to server
    fetch('/getChatbotResponse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage }),
    })
    .then(response => response.json())
    .then(data => {
        // Display Chatbot's response
        displayMessage('chatbot', data.chatbotResponse);
    })
    .catch(error => {
        console.error('Error:', error);
        displayMessage('error', error);
    });
}
