"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faForward,
    faBackward,
    faPause,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
    return (
        <main
            className="h-screen w-screen flex items-center justify-center"
            style={{
                background: "url('./background.jpeg')",
                backgroundSize: "cover",
            }}
        >
            <container className="backdrop-blur-lg rounded-full p-4 bg-black/50 flex flex-row gap-4">
                <MenuItem iconPath={"finder.png"} />
                <MenuItem iconPath={"appstore.png"} />
                <MenuItem iconPath={"tv.png"} />
                <MenuItem iconPath={"music.png"} />
            </container>
        </main>
    );
}

const MenuItem = ({ iconPath }) => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };

    useEffect(() => {
        console.log("Active: ", active);
    }, [active]);

    return (
        <motion.div
            className={
                "h-32 flex flex-row bg-black/50 rounded-full items-center"
            }
            onBlur={() => setActive(false)}
        >
            <button
                className={
                    "rounded-full overflow-clip hover:scale-105 duration-300 w-32 h-32"
                }
                onClick={handleClick}
            >
                <motion.img
                    src={iconPath}
                    animate={{
                        padding: active ? "0.5rem" : 0,
                        duration: 0.3,
                    }}
                />
            </button>
            <motion.section
                className={"flex flex-row gap-8 whitespace-nowrap"}
                animate={{
                    width: active ? "18rem" : 0,
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeOut",
                }}
            >
                <span className="flex flex-col pl-2">
                    {/* <p className="font-bold text-white text-xl">Heat Waves</p>
                    <p className="text-white/50">Glass Animals</p> */}
                    <StaggeredText
                        text="Heat Waves"
                        className="text-white text-xl font-bold"
                        active={active}
                    />
                    <StaggeredText
                        text="Glass Animals"
                        className="text-white/50"
                        active={active}
                    />
                </span>
                <div className="flex flex-row gap-6 text-white items-center text-lg">
                    <motion.div
                        className="hover:scale-110 duration-300"
                        animate={{ scale: active ? 1 : 0 }}
                        transition={{
                            duration: 0.1,
                            delay: 0.2,
                        }}
                    >
                        <FontAwesomeIcon icon={faBackward} />
                    </motion.div>
                    <motion.div
                        className="hover:scale-110 duration-300"
                        animate={{ scale: active ? 1 : 0 }}
                        transition={{
                            duration: 0.1,
                            delay: 0.2,
                        }}
                    >
                        <FontAwesomeIcon icon={faPause} className="text-3xl" />
                    </motion.div>
                    <motion.div
                        className="hover:scale-110 duration-300"
                        animate={{ scale: active ? 1 : 0 }}
                        transition={{
                            duration: 0.1,
                            delay: 0.2,
                        }}
                    >
                        <FontAwesomeIcon icon={faForward} />
                    </motion.div>
                </div>
            </motion.section>
        </motion.div>
    );
};

const StaggeredText = ({ text, className, active }) => {
    // zoom letter by letter with stagger effect
    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    return (
        <motion.span variants={stagger} className="flex flex-row">
            {text.split("").map((char, index) => (
                <motion.div
                    key={index}
                    animate={{ scale: active ? 1 : 0 }}
                    transition={{
                        duration: 0.1,
                        delay: index * 0.03,
                    }}
                    className={className}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.div>
            ))}
        </motion.span>
    );
};
