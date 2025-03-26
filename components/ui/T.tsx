import { PropsWithChildren } from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

type TProps = {
	variant?: keyof typeof styles;
	c?: TextStyle["color"];
	weight?: TextStyle["fontWeight"];
	style?: TextStyle;
} & PropsWithChildren;

export default function T({
	variant = "paragraph",
	c = "black",
	weight = "normal",
	style = {},
	children,
}: TProps) {
	return (
		<Text
			style={{
				color: c,
				fontWeight: weight,
				...styles[variant],
				...style,
			}}
		>
			{children}
		</Text>
	);
}

const styles = StyleSheet.create({
	paragraph: {
		fontSize: 16,
	},
	caption: {
		fontSize: 12,
	},
	display: {
		fontSize: 36,
		fontWeight: 500,
	},
});
