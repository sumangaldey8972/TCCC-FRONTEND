let phi = 0;
let running = true;

self.onmessage = (e) => {
    if (e.data?.type === "STOP") {
        running = false;
        return;
    }

    if (e.data?.type === "START") {
        running = true;
        tick();
    }
};

function tick() {
    if (!running) return;

    phi += 0.005;

    self.postMessage({
        type: "TICK",
        phi,
    });

    requestAnimationFrame(tick);
}
