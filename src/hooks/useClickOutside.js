import { useEffect, useRef } from 'react';

const useClickOutside = (onClick) => {
    const node= useRef(null);
    
    const handleClick = (e) => {
        const { current } = node;
        if (!current || current.contains(e.target)) {
            return;
        }
        onClick();
    };
    
    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, []);
    return node;
};

export default useClickOutside;
