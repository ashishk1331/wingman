import { useState } from "react";
import { fetch } from "expo/fetch";
import { useConfigStore } from "@/store/useConfig";

type FetcherReturnType = {
	error: string;
	isStreaming: boolean;
	streamedText: Array<string>;
	fetcher(imageData: string): void;
};

export function useFetchStream(): FetcherReturnType {
	const [error, setError] = useState<string>("");
	const [isStreaming, setIsStreaming] = useState<boolean>(false);
	const [streamedText, setStreamedText] = useState<Array<string>>([]);

	const fetcher = async (imageData: string) => {
		const BASE_URL = useConfigStore.getState().url;
		const PROMPT = useConfigStore.getState().prompt;

		if (!BASE_URL) {
			const message = "Base URL not given.";
			console.error(message);
			throw new Error(message);
		}

		try {
			setIsStreaming(true);
			setStreamedText([]);
			const path = new URL("/stream", BASE_URL);

			const resp = await fetch(path.href, {
				headers: { Accept: "text/event-stream" },
				method: "POST",
				body: JSON.stringify({
					prompt: PROMPT || "Describe brielfy.",
					image: imageData,
				}),
			});

			const reader = resp.body?.getReader();
			const decoder = new TextDecoder();

			while (true) {
				const { done, value } = await reader?.read();
				if (done) break;

				const nextToken = decoder.decode(new Uint8Array(value));
				if (nextToken) {
					if (nextToken.endsWith("<end_of_utterance>")) {
						setIsStreaming(false);
						setStreamedText((prev) => [
							...prev,
							nextToken.substring(0, nextToken.length - 18),
						]);
					} else {
						setStreamedText((prev) => [...prev, nextToken]);
					}
				}
			}
		} catch (err: any) {
			console.error(err);
			setError(err.message);
		} finally {
			setIsStreaming(false);
		}
	};

	return { error, isStreaming, streamedText, fetcher };
}
