import { FC } from "react";
import { Select, MenuItem, FormControl } from "@mui/material";
import { ModelSelectorProps } from "../../types/chat";

const ModelSelector: FC<ModelSelectorProps> = ({
	models,
	selectedModel,
	onSelectModel,
}) => {
	return (
		<div className="p-2 md:1/3 lg:w-1/6 text-white">
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
