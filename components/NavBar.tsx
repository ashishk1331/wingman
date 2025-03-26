import Button from "./ui/Button";
import Flex from "./ui/Flex";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import T from "./ui/T";
import { useConfigStore } from "@/store/useConfig";
import { Pressable } from "react-native";
import { useCameraContext } from "./CameraWrapper";
import { useCameraStore } from "@/store/useCameraStore";

export default function NavBar() {
	const toggleShowPromptBox = useConfigStore(
		(state) => state.toggleShowPromptBox,
	);
	const prompt = useConfigStore((state) => state.prompt);
	const setPrompt = useConfigStore((state) => state.setPrompt);
	const photoURI = useCameraStore((state) => state.photoURI);
	const setPhotoURI = useCameraStore((state) => state.setPhotoURI);
	const toggleFacing = useConfigStore((state) => state.toggleFacing);
	const { takePicture, pickAndProcessImage } = useCameraContext();

	function reset() {
		setPrompt("");
		setPhotoURI(null);
	}

	return (
		<Flex wfull direction="column" gap={12}>
			{photoURI ? (
				<Flex wfull py={18} items="space-evenly" align="center">
					<Button variant="camera-close" onPress={reset}>
						<AntDesign name="close" size={28} color="white" />
					</Button>
				</Flex>
			) : (
				<>
					<Flex wfull items="space-evenly" align="center">
						<Pressable onPress={toggleShowPromptBox}>
							<Flex
								gap={8}
								items="center"
								align="center"
								px={16}
								py={8}
								bg="#313131"
								rounded={16}
							>
								<MaterialCommunityIcons
									name="comment-quote"
									size={16}
									color="white"
								/>
								<T c="white">{prompt || "Describe"}</T>
							</Flex>
						</Pressable>
					</Flex>
					<Flex wfull py={18} items="space-evenly" align="center">
						<Button variant="icon" onPress={pickAndProcessImage}>
							<AntDesign name="picture" size={18} color="white" />
						</Button>
						<Button variant="camera" onPress={takePicture} />
						<Button variant="icon" onPress={toggleFacing}>
							<AntDesign name="sync" size={18} color="white" />
						</Button>
					</Flex>
				</>
			)}
		</Flex>
	);
}
