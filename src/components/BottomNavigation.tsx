
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { BookOpen, Search, Compass, Calculator, User } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { icon: BookOpen, label: 'Learn', path: '/' },
    { icon: Search, label: 'Quiz', path: '/quiz' },
    { icon: Compass, label: 'Flavors', path: '/flavors' },
    { icon: Calculator, label: 'DrinkWise', path: '/drinkwise' },
    { icon: User, label: 'Reference', path: '/reference' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bartender-surface border-t border-bartender-surface-light z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'text-bartender-amber' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon size={20} className={`mb-1 ${isActive ? 'text-bartender-amber' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
