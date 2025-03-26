import Flex from "./ui/Flex";
import T from "./ui/T";

export default function ErrorBox() {
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
			<Flex direction="row" py={4} gap={8} align="center">
				<T variant="caption" weight="bold" c="#FFD11C">
					Error Loading the image.
				</T>
			</Flex>
		</Flex>
	);
}
