import { memo } from "react";
import { Globe } from "./globe";

const BackgroundGlobe = memo(function BackgroundGlobe() {
    return (
        <div
            aria-hidden="true"
            className="
        absolute top-1/2 right-[20%] -translate-y-1/2
        w-[700px] h-[700px]
        opacity-50
        pointer-events-none
        select-none
        z-0
      "
        >
            <Globe className="w-full h-full pointer-events-none" />
        </div>
    );
});


export default BackgroundGlobe