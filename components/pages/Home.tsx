import { useConfigStore } from "@/store/useConfig";
import NavBar from "../NavBar";
import PromptBox from "../PromptBox";
import ThinkBox from "../ThinkBox";
import Flex from "../ui/Flex";

export default function Home() {
	const showPromptBox = useConfigStore((state) => state.showPromptBox);
	return (
		<Flex
			direction="column"
			flex={1}
			px={16}
			py={16}
			items="flex-end"
			align="flex-end"
		>
			<Flex flex={1}>
				<ThinkBox isLoading={false} />
			</Flex>
			{showPromptBox ? <PromptBox /> : <NavBar />}
		</Flex>
	);
}
