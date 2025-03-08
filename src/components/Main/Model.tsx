import { FC } from "react";
import { Select, MenuItem, FormControl } from "@mui/material";

interface ModelSelectorProps {
	models: string[];
	selectedModel: string;
	onSelectModel: (model: string) => void;
}

const ModelSelector: FC<ModelSelectorProps> = ({
	models,
	selectedModel,
	onSelectModel,
}) => {
	return (
		<div className="p-2 w-1/6 text-white">
			<FormControl fullWidth>
				<Select
					labelId="model-select-label"
					value={selectedModel}
					label="Select Model"
                    color="primary"
                    className="border border-white rounded-xl"
                    sx={{
                    "& .MuiSelect-select": {
                    color: "white"
                    }}}
					onChange={(e) => onSelectModel(e.target.value)}
				>
					{models.map((model) => (
						<MenuItem key={model} value={model}>
							{model}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};

export default ModelSelector;
