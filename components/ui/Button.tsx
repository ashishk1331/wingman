import { PropsWithChildren } from "react";
import { ButtonProps, Pressable, StyleSheet, ViewStyle } from "react-native";

type CustomButtonProps = {
	variant?: keyof typeof styles;
	style?: ViewStyle;
	onPress?: ButtonProps["onPress"] | null;
} & PropsWithChildren;

export default function Button({
	variant = "icon",
	style = {},
	onPress = null,
	children,
}: CustomButtonProps) {
	return (
		<Pressable style={{ ...styles[variant], ...style }} onPress={onPress}>
			{children}
		</Pressable>
	);
}

const primitives = StyleSheet.create({
	"round-basic": {
		width: 64,
		height: 64,
		borderRadius: 64,
	},
	flex: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
	},
});

const styles = StyleSheet.create({
	icon: {
		backgroundColor: "#313131",
		padding: 14,
		borderRadius: 24,
	},
	camera: {
		backgroundColor: "red",
		...primitives["round-basic"],
	},
	"camera-close": {
		backgroundColor: "#313131",
		...primitives["round-basic"],
		...primitives["flex"],
	},
});
