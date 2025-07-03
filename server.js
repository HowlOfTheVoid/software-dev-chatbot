process.env["NODE_TLS_REJECT_UNAUTHORIZED"]=0;
const express = require('express');
const path = require('path');
const { OpenAIAPI } = require('./openai');
const { OpenAI } = require('openai/client.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/getChatbotResponse', async (req, res) => {
    const userMessage = req.body.userMessage;

    // Generate response with OpenAI API
    const chatbotResponse = await OpenAIAPI.generateResponse(userMessage);

    // Return response
    res.json({ chatbotResponse });
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
