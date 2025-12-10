import { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Coin Cartel",
    other: {
        "the-coin-cartel": "24cda809b6ff"
    }
};

export default function Head() {
    return (
        <>
            <meta name="the-coin-cartel" content="24cda809b6ff" />
        </>
    );
}
