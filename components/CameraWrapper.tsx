import { CameraView, useCameraPermissions } from "expo-camera";
import NoPermission from "./pages/NoPermission";
import {
	createContext,
	PropsWithChildren,
	useContext,
	useRef,
	useState,
} from "react";
import Flex from "./ui/Flex";
import { useConfigStore } from "@/store/useConfig";
import { StyleSheet, ImageBackground } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ImageTo64 } from "@/util/Image";
import { useFetchStream } from "@/hooks/useFetchStream";
import { useCameraStore } from "@/store/useCameraStore";
import Camera from "./Camera";

type CameraContextType = {
	isLoading: boolean;
	takePicture(): void;
	pickAndProcessImage(): void;
	isStreaming: boolean;
	streamedText: string[];
};

const CameraContext = createContext<CameraContextType | null>(null);

export function useCameraContext() {
	const context = useContext(CameraContext);

	if (!context) {
		throw new Error("Context not defined.");
	}

	return context;
}

export default function CameraWrapper({ children }: PropsWithChildren) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [permission, requestPermision] = useCameraPermissions();
	const facingBack = useConfigStore((state) => state.facingBack);
	const cameraRef = useRef<CameraView>(null);

	const { error, fetcher, isStreaming, streamedText } = useFetchStream();
	const photoURI = useCameraStore((state) => state.photoURI);
	const setPhotoURI = useCameraStore((state) => state.setPhotoURI);

	if (!permission || !permission.granted) {
		return (
			<NoPermission
				permission={permission}
				requester={requestPermision}
			/>
		);
	}

	const takePicture = async () => {
		try {
			setIsLoading(true);

			if (cameraRef.current) {
				let photo = await cameraRef.current.takePictureAsync();

				if (photo) {
					const uri = photo.uri;
					setPhotoURI(uri);
					const base64 = await ImageTo64(uri);
					fetcher(base64);
				}
			}
		} catch (err) {
			console.log("Error taking a picture.");
		} finally {
			setIsLoading(false);
		}
	};

	const pickAndProcessImage = async () => {
		try {
			setIsLoading(true);

			let result = await ImagePicker.launchImageLibraryAsync();

			if (!result.canceled) {
				const uri = result.assets[0].uri;
				setPhotoURI(uri);
				const base64 = await ImageTo64(uri);
				fetcher(base64);
			}
		} catch (err) {
			console.error("Error picking or processing image:", err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<CameraContext.Provider
			value={{
				takePicture,
				pickAndProcessImage,
				isLoading,
				isStreaming,
				streamedText,
			}}
		>
			<Flex flex={1} wfull items="center">
				{photoURI ? (
					<ImageBackground
						source={{ uri: photoURI }}
						style={{ flex: 1 }}
					>
						{children}
					</ImageBackground>
				) : (
					<Camera ref={cameraRef}>{children}</Camera>
				)}
			</Flex>
		</CameraContext.Provider>
	);
}
