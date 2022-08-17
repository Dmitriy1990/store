import React, { ReactNode, FC } from 'react';

type Theme = 'light' | 'dark';

type Context = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext<Context>({
  theme: 'light',
  toggleTheme: () => undefined
});

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = React.useState<Theme>(
    (localStorage.getItem('theme') as Theme) || 'light'
  );
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

  React.useEffect(() => {
    if (!window.matchMedia) {
      setTheme('light');
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    document.documentElement.dataset.theme = mediaQuery.matches ? 'dark' : 'light';
    setTheme(mediaQuery.matches ? 'dark' : 'light');

    function onChange(event: MediaQueryListEvent): void {
      setTheme(event.matches ? 'dark' : 'light');
      document.documentElement.dataset.theme = event.matches ? 'dark' : 'light';
    }

    mediaQuery.addEventListener('change', onChange);

    return () => {
      mediaQuery.removeEventListener('change', onChange);
    };
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
