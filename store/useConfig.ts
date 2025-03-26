import { create } from "zustand";

interface ConfigState {
	prompt: string;
	showPromptBox: boolean;
	facingBack: boolean;
	url: string;
}

interface ConfigActions {
	setPrompt(prompt: string): void;
	toggleShowPromptBox(): void;
	toggleFacing: () => void;
	setURL(url: string): void;
}

export const useConfigStore = create<ConfigState & ConfigActions>()((set) => ({
	showPromptBox: false,
	toggleShowPromptBox() {
		return set((prev) => ({ showPromptBox: !prev.showPromptBox }));
	},

	prompt: "",
	setPrompt(prompt) {
		return set({ prompt });
	},

	facingBack: true,
	toggleFacing() {
		return set((prev) => ({ facingBack: !prev.facingBack }));
	},

	url: "",
	setURL(url) {
		return set({ url });
	},
}));
