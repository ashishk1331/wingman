import { PropsWithChildren } from "react";
import { View, ViewStyle } from "react-native";

type FlexProps = {
	wfull?: boolean;
	bg?: ViewStyle["backgroundColor"];
	direction?: ViewStyle["flexDirection"];
	flex?: ViewStyle["flex"];
	gap?: ViewStyle["gap"];
	rowGap?: ViewStyle["rowGap"];
	colGap?: ViewStyle["columnGap"];
	px?: ViewStyle["paddingHorizontal"];
	py?: ViewStyle["paddingVertical"];
	wrap?: ViewStyle["flexWrap"];
	m?: ViewStyle["margin"];
	items?: ViewStyle["justifyContent"];
	align?: ViewStyle["alignItems"];
	rounded?: ViewStyle["borderRadius"];
	style?: ViewStyle;
} & PropsWithChildren;

export default function Flex({
	wfull = false,
	bg = "transparent",
	direction = "row",
	flex = 0,
	gap = 0,
	rowGap = 0,
	colGap = 0,
	px = 0,
	py = 0,
	m = 0,
	wrap = "nowrap",
	items = "flex-start",
	align = "flex-start",
	rounded = 0,
	style = {},
	children,
}: FlexProps) {
	return (
		<View
			style={{
				width: wfull ? "100%" : "auto",
				backgroundColor: bg,
				display: "flex",
				flex,
				gap,
				rowGap: rowGap || gap,
				columnGap: colGap || gap,
				flexDirection: direction,
				paddingVertical: py,
				paddingHorizontal: px,
				margin: m,
				flexWrap: wrap,
				justifyContent: items,
				alignItems: align,
				borderRadius: rounded,
				...style,
			}}
		>
			{children}
		</View>
	);
}
