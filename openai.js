class OpenAIAPI {
    static async generateResponse(userMessage, conversationHistory = []) {
        const apiKey = process.env.OPENAI_API_KEY;
        const endpoint = 'https://api.openai.com/v1/chat/completions';
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo-1106",
                messages: conversationHistory.concat([{ role: 'user', content: userMessage }]),
                max_tokens: 150,
            }),
        });
        const responseData = await response.json();
        // Log entire API response (Debugging)
        console.log('Response from OpenAI API: ', responseData.choices[0].message);
        // Check that choices is defined and not empty
        if (responseData.choices && responseData.choices.length > 0 && responseData.choices[0].message) {
            return responseData.choices[0].message.content;
        } else {
            //Choices are empty, return error.
            console.error('Error: No valid response from OpenAI API.');
            return 'Sorry, I couldn\'t understand that.';
        }
    }
}

module.exports = { OpenAIAPI }
