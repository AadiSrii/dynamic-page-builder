// src/components/Preview.jsx

import React from 'react';
import { useLocation } from 'react-router-dom';
import { renderComponent } from '../App';  // Import renderComponent

function Preview() {
  const location = useLocation();
  const { items } = location.state || { items: [] };

  return (
    <div className="preview">
      {items.map((item, index) => (
        <div key={index}>{renderComponent(item)}</div>
      ))}
    </div>
  );
}

export default Preview;
