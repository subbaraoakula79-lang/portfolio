import { useEffect, useRef } from 'react';

const BackgroundEffect = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Subtle dot grid
        const drawGrid = () => {
            const isDark = document.documentElement.classList.contains('dark');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const spacing = 60;
            const dotSize = 0.8;
            const color = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';

            ctx.fillStyle = color;
            for (let x = spacing; x < canvas.width; x += spacing) {
                for (let y = spacing; y < canvas.height; y += spacing) {
                    ctx.beginPath();
                    ctx.arc(x, y, dotSize, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        drawGrid();

        // Redraw on theme change
        const observer = new MutationObserver(drawGrid);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        return () => {
            window.removeEventListener('resize', resize);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 z-0 pointer-events-none"
            />
            <div className="fixed inset-0 z-0 pointer-events-none gradient-mesh" />
        </>
    );
};

export default BackgroundEffect;
