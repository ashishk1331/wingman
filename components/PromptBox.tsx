import AntDesign from "@expo/vector-icons/AntDesign";
import Button from "./ui/Button";
import Flex from "./ui/Flex";
import { StyleSheet, TextInput } from "react-native";
import { useConfigStore } from "@/store/useConfig";

export default function PromptBox() {
	const prompt = useConfigStore((state) => state.prompt);
	const setPrompt = useConfigStore((state) => state.setPrompt);
	const toggleShowPromptBox = useConfigStore(
		(state) => state.toggleShowPromptBox,
	);

	return (
		<Flex gap={8} align="flex-end">
			<Flex
				direction="column"
				flex={1}
				bg="#313131"
				px={8}
				py={8}
				rounded={16}
			>
				<TextInput
					style={styles.textBox}
					value={prompt}
					onChangeText={setPrompt}
					multiline
					placeholder="Ask anything..."
					placeholderTextColor="white"
				/>
				<Flex wfull items="flex-end">
					<Button style={styles.upload}>
						<AntDesign name="arrowup" size={16} color="#313131" />
					</Button>
				</Flex>
			</Flex>
			<Button
				variant="icon"
				style={styles.padBottom}
				onPress={toggleShowPromptBox}
			>
				<AntDesign name="close" size={16} color="white" />
			</Button>
		</Flex>
	);
}

const styles = StyleSheet.create({
	textBox: {
		color: "white",
		textAlignVertical: "top",
	},
	upload: {
		backgroundColor: "white",
		padding: 12,
	},
	padBottom: {
		marginBottom: 8,
	},
});
