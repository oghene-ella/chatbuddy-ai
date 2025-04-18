import axios from "axios";
import { MODELS } from '../../config/models';

const FetchModels = async (modelName: string, message: string) => {
	let response;
	const modelConfig = Object.values(MODELS).find(m => m.name === modelName);
	
	if (!modelConfig) {
		throw new Error("Model not supported");
	}

	response = await axios.post(
		"https://api.openai.com/v1/chat/completions",
		{
			model: modelConfig.id,
			messages: [{ role: "user", content: message }],
			max_tokens: modelConfig.maxTokens,
			temperature: modelConfig.temperature,
		},
		{
			headers: {
				Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
			},
		},
	);

	return response.data;
};

export default FetchModels;
