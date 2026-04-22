import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Hide on touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const onMove = (e) => {
            setPos({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const onOver = (e) => {
            const target = e.target;
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.closest('button') ||
                target.closest('a') ||
                target.closest('[data-cursor="pointer"]');
            setIsHovering(!!isInteractive);
        };

        const onLeave = () => setIsVisible(false);
        const onEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseover', onOver);
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('mouseenter', onEnter);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', onOver);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('mouseenter', onEnter);
        };
    }, [isVisible]);

    if (!isVisible && pos.x === 0 && pos.y === 0) return null;

    return (
        <>
            {/* Inner dot */}
            <motion.div
                className="custom-cursor"
                animate={{
                    x: pos.x - 5,
                    y: pos.y - 5,
                    scale: isHovering ? 0 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 600,
                    damping: 30,
                    mass: 0.3,
                }}
                style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: 'white',
                }}
            />

            {/* Outer ring */}
            <motion.div
                className="custom-cursor"
                animate={{
                    x: pos.x - (isHovering ? 24 : 18),
                    y: pos.y - (isHovering ? 24 : 18),
                    width: isHovering ? 48 : 36,
                    height: isHovering ? 48 : 36,
                    opacity: isVisible ? 0.5 : 0,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 25,
                    mass: 0.5,
                }}
                style={{
                    borderRadius: '50%',
                    border: '1.5px solid rgba(255,255,255,0.6)',
                    background: isHovering ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                }}
            />
        </>
    );
};

export default CustomCursor;
