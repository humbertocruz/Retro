"use client";
import React, { useRef, useEffect, useState } from 'react';

interface PongProps {
    onExit: () => void;
}

export const Pong = ({ onExit }: PongProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState({ player: 0, cpu: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 4, dy: 4, size: 10 };
        const paddleH = 60;
        const paddleW = 10;
        const player = { x: 10, y: canvas.height / 2 - paddleH / 2, score: 0 };
        const cpu = { x: canvas.width - 20, y: canvas.height / 2 - paddleH / 2, score: 0 };

        let animationId: number;
        const keyDown: { [key: string]: boolean } = {};

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onExit();
            keyDown[e.key] = true;
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            keyDown[e.key] = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const update = () => {
            // Player movement
            if (keyDown['ArrowUp'] && player.y > 0) player.y -= 6;
            if (keyDown['ArrowDown'] && player.y < canvas.height - paddleH) player.y += 6;

            // CPU movement (simple AI)
            if (ball.y < cpu.y + paddleH / 2 && cpu.y > 0) cpu.y -= 4;
            if (ball.y > cpu.y + paddleH / 2 && cpu.y < canvas.height - paddleH) cpu.y += 4;

            // Ball movement
            ball.x += ball.dx;
            ball.y += ball.dy;

            // Collision with top/bottom
            if (ball.y < 0 || ball.y > canvas.height) ball.dy *= -1;

            // Collision with paddles
            if (
                (ball.x < player.x + paddleW && ball.y > player.y && ball.y < player.y + paddleH) ||
                (ball.x > cpu.x - ball.size && ball.y > cpu.y && ball.y < cpu.y + paddleH)
            ) {
                ball.dx *= -1.1; // Speed up
            }

            // Scoring
            if (ball.x < 0) {
                cpu.score++;
                setScore(s => ({ ...s, cpu: s.cpu + 1 }));
                resetBall();
            } else if (ball.x > canvas.width) {
                player.score++;
                setScore(s => ({ ...s, player: s.player + 1 }));
                resetBall();
            }
        };

        const resetBall = () => {
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
            ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
            ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1);
        };

        const draw = () => {
            // Clear canavs but keep retro background color context
            ctx.fillStyle = 'rgba(0,0,0,0.2)'; // Trail effect
            ctx.clearRect(0,0, canvas.width, canvas.height); // actually clear for clean drawing
            
            ctx.fillStyle = 'currentColor'; // Uses CSS text color (green/amber)
            
            // Paddles
            ctx.fillRect(player.x, player.y, paddleW, paddleH);
            ctx.fillRect(cpu.x, cpu.y, paddleW, paddleH);
            
            // Ball
            ctx.fillRect(ball.x, ball.y, ball.size, ball.size);
            
            // Net
            for(let i=0; i<canvas.height; i+=20) {
                ctx.fillRect(canvas.width/2 - 1, i, 2, 10);
            }
        };

        const loop = () => {
            update();
            draw();
            animationId = requestAnimationFrame(loop);
        };

        loop();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            cancelAnimationFrame(animationId);
        };
    }, [onExit]);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full relative">
            <h2 className="absolute top-4 font-retro text-4xl tracking-[0.5em] opacity-50">PONG</h2>
            <div className="absolute top-16 flex w-full justify-between px-32 font-retro text-6xl font-bold">
                <span>{score.player}</span>
                <span>{score.cpu}</span>
            </div>
            <canvas 
                ref={canvasRef} 
                width={800} 
                height={500} 
                className="border-4 border-current max-w-full max-h-full"
            />
            <div className="mt-4 text-sm opacity-70">
                USE ARROW KEYS TO MOVE. ESC TO EXIT.
            </div>
        </div>
    );
};
