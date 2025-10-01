import { useState, useEffect } from 'react';

const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
};

const useBreakpoint = (breakpoint: keyof typeof breakpoints): boolean => {
    const [isAbove, setIsAbove] = useState(
        typeof window !== 'undefined' ? window.innerWidth >= breakpoints[breakpoint] : false
    );
    
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            setIsAbove(window.innerWidth >= breakpoints[breakpoint]);
        };

        window.addEventListener('resize', handleResize);
        
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    return isAbove;
};

export default useBreakpoint;
