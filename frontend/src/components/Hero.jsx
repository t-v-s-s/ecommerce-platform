import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
    const placeholderDataUri = (width, height, text) => {
        const safeText = (text ?? "").toString().slice(0, 30);
        const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#f3f4f6"/>
            <stop offset="1" stop-color="#e5e7eb"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g)"/>
        <rect x="${Math.round(width * 0.08)}" y="${Math.round(height * 0.08)}" width="${Math.round(width * 0.84)}" height="${Math.round(height * 0.84)}" rx="18" fill="#ffffff" opacity="0.55"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" font-size="${Math.max(12, Math.round(Math.min(width, height) * 0.12))}" fill="#6b7280">
          ${safeText}
        </text>
      </svg>
    `.trim();
        return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
    };

    const MotionDiv = motion.div;

    return (
        <section className="bg-gradient-to-br from-background via-white to-secondary px-10 py-20 flex flex-col md:flex-row items-center justify-between overflow-hidden">

            {/* LEFT CONTENT (Animated) */}
            <MotionDiv
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-xl"
            >
                <h1 className="text-4xl md:text-5xl font-semibold text-textmain leading-tight tracking-tight">
                    Discover Premium <br /> Shopping Experience
                </h1>

                <p className="text-gray-500 mt-4">
                    Curated collections designed to elevate your everyday lifestyle.
                </p>

                <button className="mt-6 bg-accent text-white px-6 py-3 rounded-full shadow-md hover:scale-105 hover:bg-opacity-90 transition duration-300">
                    Shop Now
                </button>
            </MotionDiv>

            {/* RIGHT SIDE (Floating + Main Card Combined) */}
            <div className="relative mt-16 md:mt-0 w-[320px] h-[320px] flex items-center justify-center">

                {/* Main Center Image (from second code) */}
                <div className="absolute bg-white w-72 h-72 rounded-2xl flex items-center justify-center shadow-lg z-10">
                    <img
                        src={placeholderDataUri(220, 220, "Product")}
                        alt="Featured product"
                        className="rounded-xl object-cover"
                    />
                </div>

                {/* Floating Card 1 */}
                <MotionDiv
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-0 left-10 bg-white p-3 rounded-2xl shadow-xl w-32"
                >
                    <img src={placeholderDataUri(120, 120, "Headphones")} alt="Headphones" className="rounded-lg" />
                    <p className="text-xs mt-1 text-textmain font-medium">Headphones</p>
                </MotionDiv>

                {/* Floating Card 2 */}
                <MotionDiv
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-0 left-0 bg-white p-3 rounded-2xl shadow-xl w-36"
                >
                    <img src={placeholderDataUri(120, 120, "Shoes")} alt="Shoes" className="rounded-lg" />
                    <p className="text-xs mt-1 text-textmain font-medium">Shoes</p>
                </MotionDiv>

                {/* Floating Card 3 */}
                <MotionDiv
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="absolute top-20 right-0 bg-white p-3 rounded-2xl shadow-xl w-32"
                >
                    <img src={placeholderDataUri(120, 120, "Watch")} alt="Watch" className="rounded-lg" />
                    <p className="text-xs mt-1 text-textmain font-medium">Watch</p>
                </MotionDiv>

            </div>
        </section>
    );
}
