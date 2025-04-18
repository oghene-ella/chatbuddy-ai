import robotImg from "../assets/robot.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();

	const handleGetStarted = () => {
		navigate("/signup");
	};

	return (
		<div className="w-screen h-full flex justify-center">
			<div className="w-screen flex items-center flex-col-reverse lg:flex-row p-10 md:p-5 md:m-20 gap-10">
				<div className=" md:w-2/3 text-center md:text-start">
					<h1 className="text-5xl font-bold text-white">
						Chat<b className="text-blue-400">Buddy</b> AI!
					</h1>
					<p className="py-6 text-gray-100">
						ChatBuddy AI is a friendly and interactive chat
						application built with React JS and TypeScript. The application is optimized for helpfulness and
						safety, ensuring that users receive relevant and
						accurate information in a secure environment. Whether
						you are looking for a virtual assistant, customer
						support, or just a friendly conversation, ChatBuddy AI
						is here to help.
						<br />
						<br />
						With its ability to generate text and code based on user
						input, ChatBuddy AI demonstrates the power and
						versatility of modern AI technology. This project
						highlights the practical integration of advanced
						language models in a user-friendly web application,
						showcasing its potential in creating
						meaningful and dynamic interactions.
					</p>
					<button className="bg-blue-400 px-2 py-4 rounded-sm lg:w-1/6" onClick={handleGetStarted}>
						Get Started
					</button>
				</div>
				<img src={robotImg} className="md:w-1/3" />
			</div>
		</div>
	);
};

export default Header;