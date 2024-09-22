import { useState, useEffect, useRef } from "react";

declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext;
    }
}

const useAudioFromBuffer = (bufferArray?: number[]) => {
    const audioCtxRef = useRef<AudioContext | null>(null);
    const [audioSource, setAudioSource] =
        useState<AudioBufferSourceNode | null>(null);
    const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
    const [error, setError] = useState<string | null>(null); // error is string or null

    // Initialize Audio Context
    useEffect(() => {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) {
            setError("Web Audio API is not supported in this browser.");
            return;
        }

        audioCtxRef.current = new AudioCtx();
        return () => {
            audioCtxRef.current?.close();
        };
    }, []);

    // Decode audio data from buffer array
    useEffect(() => {
        if (!bufferArray) {
            setAudioBuffer(null);
            return;
        }

        audioCtxRef.current
            ?.decodeAudioData(new Uint8Array(bufferArray).buffer)
            .then(setAudioBuffer)
            .catch((err) => {
                console.error("Error decoding audio data:", err);
                setError("Failed to load audio.");
            });
    }, [bufferArray]);

// Handle audio playback
const onAudioClick = async () => {
    if (!audioCtxRef.current || !audioBuffer) {
        setError("Audio buffer not available for playback.");
        return;
    }

    try {
        // Resume AudioContext if it's suspended due to browser policies
        if (audioCtxRef.current.state === "suspended") {
            await audioCtxRef.current.resume();
            console.log("AudioContext resumed.");
        }

        // If there's no active audio source, create and play the audio
        if (!audioSource) {
            const source = audioCtxRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioCtxRef.current.destination);
            source.start();
            source.onended = () => {
                setAudioSource(null);
            };
            setAudioSource(source);
            return;
        }

        // Stop the currently playing audio
        audioSource.stop();
        audioSource.disconnect(audioCtxRef.current.destination);
        setAudioSource(null);

    } catch (err) {
        console.error("Error handling audio playback:", err);
        setError("An error occurred during audio playback.");
    }
};

    return {
        audioExists: !!audioBuffer,
        isAudioPlaying: !!audioSource,
        onAudioClick,
        error, // Return error state for use in components
    };
};

export default useAudioFromBuffer;
