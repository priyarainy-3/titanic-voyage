
import React from 'react';
import { Ship } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ship className="h-8 w-8 text-ocean-600" />
          <h1 className="text-2xl font-bold gradient-heading">Titanic Survival Prediction</h1>
        </div>
        <div>
          <span className="text-sm text-muted-foreground">Supervised Learning Models</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
