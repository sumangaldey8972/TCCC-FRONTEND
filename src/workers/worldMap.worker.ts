/* eslint-disable no-restricted-globals */
import DottedMap from "dotted-map";

self.onmessage = (e) => {
    const { theme, dots } = e.data;
    console.log({ theme, dots })
    const map = new DottedMap({ height: 100, grid: "diagonal" });

    const svgMap = map.getSVG({
        radius: 0.22,
        color: theme === "dark" ? "#ffffff2f" : "#0000002e",
        shape: "circle",
    });

    const projectPoint = (lat: number, lng: number) => {
        const x = (lng + 180) * (800 / 360);
        const y = (90 - lat) * (400 / 180);
        return { x, y };
    };

    const createCurvedPath = (start: any, end: any) => {
        const midX = (start.x + end.x) / 2;
        const midY = Math.min(start.y, end.y) - 50;
        return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
    };

    const paths = dots.map((dot: any) => {
        const start = projectPoint(dot.start.lat, dot.start.lng);
        const end = projectPoint(dot.end.lat, dot.end.lng);

        return {
            start,
            end,
            path: createCurvedPath(start, end),
        };
    });

    self.postMessage({ svgMap, paths });
};
