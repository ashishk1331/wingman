import { Dispatch, SetStateAction } from "react";
import { StyleSheet, TextInput } from "react-native";

type URLBoxProps = {
	value: string;
	onChangeText: Dispatch<SetStateAction<string>>;
};

export default function URLBox({ value, onChangeText }: URLBoxProps) {
	return (
		<TextInput
			style={styles.input}
			value={value}
			onChangeText={onChangeText}
			placeholder="Enter URL"
			placeholderTextColor="#f8fafc"
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		flex: 1,
		borderWidth: 1,
		padding: 10,
		borderRadius: 6,
		backgroundColor: "#00112cae",
		color: "#f8fafc",
		fontSize: 16,
	},
});
