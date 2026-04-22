import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({ children, className = '', as = 'button', href, onClick, ...props }) => {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setPosition({ x: x * 0.3, y: y * 0.3 });
    };

    const handleLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const Tag = as === 'a' ? motion.a : motion.button;

    return (
        <Tag
            ref={ref}
            className={className}
            href={href}
            onClick={onClick}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 350, damping: 15, mass: 0.5 }}
            {...props}
        >
            {children}
        </Tag>
    );
};

export default MagneticButton;
