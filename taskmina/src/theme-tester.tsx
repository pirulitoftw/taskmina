import React from 'react';

const ThemeTester: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Theme Testing</h1>
      
      <div className="grid gap-4">
        <div className="p-4 bg-header-light">
          <p className="text-white">This div should be teal (bg-header-light)</p>
        </div>
        
        <div className="p-4" style={{ backgroundColor: 'rgb(0, 128, 128)' }}>
          <p className="text-white">This div should be teal (inline style)</p>
        </div>
        
        <div className="p-4 bg-teal">
          <p className="text-white">This div should be teal (bg-teal)</p>
        </div>
      </div>
    </div>
  );
};

export default ThemeTester;
