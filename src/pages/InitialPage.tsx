"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Icon from '@/components/Icon'
import Logo from '@/assets/svg/logo.svg?react'
import Text from '@/components/Text'
import Button from '@/components/Button'
import Container from '@/components/Container'
import BlurText from "@/components/BlurText";
import AnimatedContent from '@/components/AnimatedContent'
import { HoverButton } from "@/components/HoverButton"


interface AnimatedGradientBackgroundProps {
    className?: string;
    children?: React.ReactNode;
    intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
    x: number;
    y: number;
    width: number;
    length: number;
    angle: number;
    speed: number;
    opacity: number;
    hue: number;
    pulse: number;
    pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
    const angle = -35 + Math.random() * 10;
    return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 30 + Math.random() * 60,
        length: height * 2.5,
        angle: angle,
        speed: 0.6 + Math.random() * 1.2,
        opacity: 0.12 + Math.random() * 0.16,
        hue: 0 + Math.random() * 225,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
    };
}

export default function BeamsBackground({
    className,
    intensity = "strong",
}: AnimatedGradientBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<Beam[]>([]);
    const animationFrameRef = useRef<number>(0);
    const MINIMUM_BEAMS = 20;

    const handleAnimationComplete = () => {
        console.log('Animation completed!');
    };

    const opacityMap = {
        subtle: 0.7,
        medium: 0.85,
        strong: 1,
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);

            const totalBeams = MINIMUM_BEAMS * 1.5;
            beamsRef.current = Array.from({ length: totalBeams }, () =>
                createBeam(canvas.width, canvas.height)
            );
        };

        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);

        function resetBeam(beam: Beam, index: number, totalBeams: number) {
            if (!canvas) return beam;

            const column = index % 3;
            const spacing = canvas.width / 3;

            beam.y = canvas.height + 100;
            beam.x =
                column * spacing +
                spacing / 2 +
                (Math.random() - 0.5) * spacing * 0.5;
            beam.width = 100 + Math.random() * 100;
            beam.speed = 0.5 + Math.random() * 0.4;
            beam.hue = 0 + (index / totalBeams) * 225;
            beam.opacity = 0.2 + Math.random() * 0.1;
            return beam;
        }

        function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
            ctx.save();
            ctx.translate(beam.x, beam.y);
            ctx.rotate((beam.angle * Math.PI) / 180);

            const pulsingOpacity =
                beam.opacity *
                (0.8 + Math.sin(beam.pulse) * 0.2) *
                opacityMap[intensity];

            const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
            gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 50%, 0)`);
            gradient.addColorStop(0.1, `hsla(${beam.hue}, 85%, 50%, ${pulsingOpacity * 0.4})`);
            gradient.addColorStop(0.4, `hsla(${beam.hue}, 85%, 50%, ${pulsingOpacity})`);
            gradient.addColorStop(0.6, `hsla(${beam.hue}, 85%, 50%, ${pulsingOpacity})`);
            gradient.addColorStop(0.9, `hsla(${beam.hue}, 85%, 50%, ${pulsingOpacity * 0.4})`);
            gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 50%, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            ctx.restore();
        }

        function animate() {
            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = "blur(40px)";

            const totalBeams = beamsRef.current.length;
            beamsRef.current.forEach((beam, index) => {
                beam.y -= beam.speed;
                beam.pulse += beam.pulseSpeed;

                if (beam.y + beam.length < -100) {
                    resetBeam(beam, index, totalBeams);
                }

                drawBeam(ctx, beam);
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    });

    return (
        <div
            className={cn(
                "relative min-h-screen w-full overflow-hidden bg-neutral-950",
                className
            )}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
                style={{ filter: "blur(20px)" }}
            />

            <motion.div
                className="absolute inset-0 bg-neutral-950/10 pointer-events-none"
                animate={{
                    opacity: [0.05, 0.15, 0.05],
                }}
                transition={{
                    duration: 8,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                }}
                style={{
                    backdropFilter: "blur(50px)",
                }}
            />

            {/* Bottom fade for smooth scroll transition */}
            <div 
                className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-20"
                style={{
                    background: 'linear-gradient(to bottom, transparent 30%, #1A1A1A 100%)'
                }}
            />

            <Container className="relative z-10 min-h-screen flex flex-col items-center justify-center">
                <Icon svg={Logo}></Icon>
                <div className='flex flex-col gap-1 mt-18 text-center'>
                    <AnimatedContent
                        distance={50}
                        direction="vertical"
                        reverse={true}
                        duration={1.2}
                        initialOpacity={0.1}
                        animateOpacity
                        scale={1.2}
                        threshold={0.2}
                        delay={0.1}
                    >
                        <Text variant={"m-text-xl"} className="text-center">Point of view!</Text>
                    </AnimatedContent>
                    <BlurText
                        text='Get ready to jump into nostalgia and exploring. Show your "pov", review and create a list of your favorite movies of all time'
                        delay={50}
                        animateBy="words"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="font-lato text-[20px] opacity-78 text-gray-100 justify-center text-center"
                    />
                </div>

                <div className='flex flex-col gap-5 mt-12'>
                    <Button variant={"primary"} className="">Get Started</Button>
                    <HoverButton>Sign in</HoverButton>
                </div>
            </Container>
        </div>
    );
}