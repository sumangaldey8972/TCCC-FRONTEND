import { createMap } from "svg-dotted-map";

// Worker: receives params → generates map → returns result
self.onmessage = (e) => {
    const { width, height, mapSamples, markers } = e.data;

    const { points, addMarkers } = createMap({
        width,
        height,
        mapSamples,
    });

    const processedMarkers = addMarkers(markers);

    self.postMessage({
        points,
        processedMarkers,
    });
};
