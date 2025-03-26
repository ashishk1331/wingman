import { useCameraStore } from "@/store/useCameraStore";
import AnimatedTextChunk from "./AnimatedText";
import { useCameraContext } from "./CameraWrapper";
import Flex from "./ui/Flex";
import LoadingSpinner from "./ui/LoadingSpinner";
import T from "./ui/T";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

export default function ThinkBox() {
	const { isLoading, isStreaming, streamedText } = useCameraContext();
	const photoURI = useCameraStore((state) => state.photoURI);

	if (!photoURI) return null;

	return (
		<Flex
			flex={1}
			direction="column"
			px={18}
			py={18}
			gap={12}
			bg="#313131"
			rounded={24}
		>
			{streamedText.length > 0 && (
				<Flex direction="row" rowGap={0} colGap={3} wrap="wrap">
					{streamedText.map((token, index) => (
						<AnimatedTextChunk
							key={index}
							text={index === 0 ? token.trimLeft() : token}
						/>
					))}
				</Flex>
			)}
			{isLoading || isStreaming ? (
				<Flex direction="row" py={4} gap={8} align="center">
					<LoadingSpinner />
					<T variant="caption" weight="bold" c="#FFD11C">
						Streaming...
					</T>
				</Flex>
			) : (
				<Flex direction="row" py={4} gap={8} align="center">
					<AntDesign name="smile-circle" size={16} color="#FFD11C" />
					<T variant="caption" weight="bold" c="#FFD11C">
						SmolVLM2
					</T>
					<Entypo name="dot-single" size={16} color="white" />
					<T variant="caption" c="white">
						Double check information.
					</T>
				</Flex>
			)}
		</Flex>
	);
}
