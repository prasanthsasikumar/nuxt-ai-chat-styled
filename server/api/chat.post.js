export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();
	let messages = [];
	const previousMessages = await readBody(event);
  
	// Transform messages into OpenAI's Chat API format
	messages = previousMessages.map((msg) => ({
		role: msg.role, // 'user', 'assistant', or 'system'
		content: msg.message
	}));

	// Add the system message at the beginning, if needed
	messages.unshift({
		role: 'system',
		content: 'You are a helpful and friendly AI assistant.'
	});

	const apiKey = config.OPENAI_API_KEY;
	console.log(apiKey);  // For debugging, check that the key is being read correctly

	// Make a request to OpenAI's Chat Completion API
	const req = await fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${config.OPENAI_API_KEY}`
		},
		body: JSON.stringify({
			model: 'gpt-4', // Use 'gpt-3.5-turbo' for a cheaper option
			messages: messages,
			temperature: 0.7, // Adjust for creativity
			max_tokens: 512,
			top_p: 1.0,
			frequency_penalty: 0,
			presence_penalty: 0.6
		})
	});

	const res = await req.json();
	console.log(res);
	const result = res.choices[0].message.content;

	return {
		message: result
	};
});