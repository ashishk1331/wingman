import { SaveFormat, manipulateAsync } from "expo-image-manipulator";

export async function ImageTo64(URI: string): Promise<string> {
	const manipulatedImage = await manipulateAsync(
		URI,
		[{ resize: { width: 600 } }], // Resize to width 1200, maintaining aspect ratio
		{ compress: 0.8, format: SaveFormat.JPEG, base64: true }, // Adjust compression as needed
	);

	return manipulatedImage.base64 as string;
}
