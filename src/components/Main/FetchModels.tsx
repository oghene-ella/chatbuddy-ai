import axios from 'axios';

const FetchModels = async (model: string, message: string) => {
	let response;
	switch (model) {
		case "GPT-3":
			response = await axios.post(
				"https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
				{
					prompt: message,
					max_tokens: 150,
				},
				{
					headers: {
						Authorization: `Bearer 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`,
					},
				},
			);
			break;
		case "Gemini AI":
			response = await axios.post(
				"https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
				{
					prompt: message,
				},
				{
					headers: {
						Authorization: `Bearer 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`,
					},
				},
			);
			break;

		default:
			throw new Error("Model not supported");
	}
	return response.data;
};
export default FetchModels;