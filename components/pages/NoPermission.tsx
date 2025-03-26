import Flex from "../ui/Flex";
import T from "../ui/T";
import LoadingSpinner from "../ui/LoadingSpinner";
import { PermissionResponse } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";
import Button from "../ui/Button";
import { StyleSheet } from "react-native";

type NoPermissionProps = {
	permission: PermissionResponse | null;
	requester: () => Promise<PermissionResponse>;
};

export default function NoPermission({
	permission,
	requester,
}: NoPermissionProps) {
	return (
		<Flex
			direction="column"
			px={18}
			py={18}
			m={16}
			gap={8}
			bg="#313131"
			rounded={24}
		>
			{!permission ? (
				<Flex direction="row" py={4} gap={8} align="center">
					<LoadingSpinner />
					<T variant="caption" weight="bold" c="#FFD11C">
						Loading Permissions...
					</T>
				</Flex>
			) : !permission.granted ? (
				<Flex
					wfull
					direction="column"
					py={4}
					gap={24}
					align="flex-start"
				>
					<Flex gap={8} align="center">
						<AntDesign
							name="infocirlce"
							size={16}
							color="#FFD11C"
						/>
						<T c="white" variant="caption">
							App requires camera permission
						</T>
					</Flex>
					<Button style={styles.askButton} onPress={requester}>
						<T weight="bold">Grant Permission</T>
					</Button>
				</Flex>
			) : (
				<Flex direction="row" py={4} gap={8} align="center">
					<AntDesign name="smile-circle" size={16} color="#FFD11C" />
					<T weight="bold" c="#FFD11C" variant="caption">
						You're all set!
					</T>
				</Flex>
			)}
		</Flex>
	);
}

const styles = StyleSheet.create({
	askButton: {
		width: "100%",
		backgroundColor: "#FFD11C",
		alignItems: "center",
	},
});
