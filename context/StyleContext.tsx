import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// This is the shape of the style data we expect from WordPress
interface ThemeStyles {
    light: {
        primary: string;
        secondary: string;
        accent: string;
    };
    dark: {
        primary: string;
        secondary: string;
        accent: string;
    };
}

// In a real scenario, this would use a service to query a WordPress GraphQL endpoint.
const fetchThemeStyles = async (): Promise<ThemeStyles> => {
    // This is a mock response that reflects the app's original hardcoded styles.
    // In a real app, an admin would set these values in the WordPress backend,
    // and this function would fetch them.
    console.log("Fetching theme styles from backend...");
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
    return {
        light: {
            primary: '#1e40af',
            secondary: '#1d4ed8',
            accent: '#f97316',
        },
        dark: {
            primary: '#60a5fa',
            secondary: '#93c5fd',
            accent: '#fb923c',
        }
    };
};

const StyleContext = createContext<ThemeStyles | null>(null);

const generateCssVariables = (styles: ThemeStyles): string => {
    let lightVars = '';
    for (const [key, value] of Object.entries(styles.light)) {
        lightVars += `    --color-${key}: ${value};\n`;
    }

    let darkVars = '';
    for (const [key, value] of Object.entries(styles.dark)) {
        darkVars += `    --color-${key}: ${value};\n`;
    }

    return `
        :root {
${lightVars}
        }
        .dark {
${darkVars}
        }
    `;
};

export const StyleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [styles, setStyles] = useState<ThemeStyles | null>(null);
    
    useEffect(() => {
        const getStyles = async () => {
            try {
                const fetchedStyles = await fetchThemeStyles();
                setStyles(fetchedStyles);

                const css = generateCssVariables(fetchedStyles);
                const styleElement = document.createElement('style');
                styleElement.id = 'dynamic-theme-styles';
                styleElement.innerHTML = css;
                
                const oldStyleElement = document.getElementById('dynamic-theme-styles');
                if (oldStyleElement) {
                    oldStyleElement.remove();
                }

                document.head.appendChild(styleElement);
            } catch (error) {
                console.error("Failed to fetch theme styles:", error);
            }
        };

        getStyles();
    }, []);

    return (
        <StyleContext.Provider value={styles}>
            {children}
        </StyleContext.Provider>
    );
};

export const useStyle = () => {
  const context = useContext(StyleContext);
  return context;
};