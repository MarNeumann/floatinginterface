"use client";
import {
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { useRef } from "react";

export default function Home() {
    let mouseX = useMotionValue(Infinity);

    return (
        <div
            style={{
                background: "url(/wallpaper.jpg)",
                backgroundSize: "cover",
            }}
        >
            <div className="w-screen h-screen flex items-center justify-center backdrop-blur-xl">
                <motion.div
                    onMouseMove={(e) => mouseX.set(e.pageX)}
                    onMouseLeave={() => mouseX.set(Infinity)}
                    className="mx-auto flex h-16 items-end gap-4 rounded-full bg-black/50 shadow px-4 pb-3"
                >
                    {[...Array(4).keys()].map((i) => (
                        <AppIcon mouseX={mouseX} key={i} />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

function AppIcon({ mouseX }: { mouseX: MotionValue }) {
    let ref = useRef<HTMLDivElement>(null);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        return val - bounds.x - bounds.width / 2;
    });

    let widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
    let width = useSpring(widthSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className="aspect-square w-10 rounded-full bg-gray-400"
        />
    );
}
