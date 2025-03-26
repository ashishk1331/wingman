import { create } from "zustand";

interface CameraStoreState {
	photoURI: string | null;
}

interface CameraStoreActions {
	setPhotoURI(photoURI: CameraStoreState["photoURI"]): void;
}

export const useCameraStore = create<CameraStoreState & CameraStoreActions>()(
	(set) => ({
		photoURI: null,
		setPhotoURI(photoURI) {
			return set({ photoURI });
		},
	}),
);
