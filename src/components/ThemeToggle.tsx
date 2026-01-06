import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun className={`h-5 w-5 transition-all duration-300 ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
      <Moon className={`absolute h-5 w-5 transition-all duration-300 ${theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
    </Button>
  );
};

export default ThemeToggle;
