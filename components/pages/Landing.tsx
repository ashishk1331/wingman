import { StyleSheet, TextInput } from "react-native";
import Flex from "../ui/Flex";
import T from "../ui/T";
import Button from "../ui/Button";
import { AntDesign } from "@expo/vector-icons";
import { useConfigStore } from "@/store/useConfig";
import { router } from "expo-router";

const PATTERN = /https:\/\/[a-z0-9\-]+\.ngrok\-free\.app\/?/gm;

export default function Landing() {
	const url = useConfigStore((state) => state.url);
	const setURL = useConfigStore((state) => state.setURL);

	function handlePress() {
		if (url.match(PATTERN)) {
			router.push("/home");
		}
	}

	return (
		<Flex
			direction="column"
			flex={1}
			px={16}
			py={16}
			gap={64}
			items="center"
			align="center"
			bg="#313131"
		>
			<T variant="display" c="white">
				Wingman
			</T>
			<Flex
				wfull
				direction="column"
				gap={24}
				align="center"
				px={12}
				py={12}
			>
				<TextInput
					value={url}
					onChangeText={setURL}
					style={styles.textInput}
					multiline
					placeholder="Enter URL here..."
					placeholderTextColor="white"
				/>
				<Button
					variant="icon"
					style={styles.enterButton}
					onPress={handlePress}
				>
					<AntDesign name="arrowright" size={24} color="#313131" />
				</Button>
			</Flex>
		</Flex>
	);
}

const styles = StyleSheet.create({
	textInput: {
		width: "100%",
		padding: 12,
		paddingHorizontal: 24,
		color: "white",
		borderWidth: 1,
		borderColor: "white",
		borderRadius: 6,
	},
	enterButton: {
		backgroundColor: "white",
	},
});
