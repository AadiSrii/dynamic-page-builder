// src/App.jsx
import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';
import DraggableItem from './components/DraggableItem';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

// Function to render different components based on their type
export const renderComponent = (item) => {
  switch(item) {
    case 'Label':
      return <label>Sample Label</label>;
    case 'Input Box':
      return <input type="text" placeholder="Sample Input" />;
    case 'Check Box':
      return <input type="checkbox" />;
    case 'Button':
      return <button>Sample Button</button>;
    case 'Table':
      return (
        <table border="1">
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data 1</td>
              <td>Data 2</td>
            </tr>
          </tbody>
        </table>
      );
    case 'Text Area':
      return <textarea placeholder="Sample Text Area"></textarea>;
    case 'Radio Button':
      return (
        <div>
          <input type="radio" name="sample" /> Option 1
          <input type="radio" name="sample" /> Option 2
        </div>
      );
    case 'Dropdown':
      return (
        <select>
          <option>Option 1</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
      );
    case 'Image':
      return <img src="https://via.placeholder.com/150" alt="Sample" />;
    default:
      return null;
  }
};

function App() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // Handle the end of a drag event
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Save the current layout to Firebase
  const saveLayout = async () => {
    try {
      await addDoc(collection(db, "layouts"), { layout: items });
      alert('Layout saved successfully!');
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Load the layout from Firebase
  const loadLayout = async () => {
    const querySnapshot = await getDocs(collection(db, "layouts"));
    querySnapshot.forEach((doc) => {
      setItems(doc.data().layout);
    });
  };

  // Navigate to the preview page
  const publishPage = () => {
    navigate('/preview', { state: { items } });
  };

  // Available components to drag and drop
  const availableComponents = [
    'Label', 'Input Box', 'Check Box', 'Button', 
    'Table', 'Text Area', 'Radio Button', 
    'Dropdown', 'Image'
  ];

  return (
    <div className="App">
      <button onClick={saveLayout}>Save Layout</button>
      <button onClick={loadLayout}>Load Layout</button>
      <div className="available-components">
        {availableComponents.map((component) => (
          <div key={component} onClick={() => setItems([...items, component])}>
            {component}
          </div>
        ))}
      </div>
      <div className="canvas">
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item, index) => (
              <DraggableItem key={index} id={item}>
                {renderComponent(item)}
              </DraggableItem>
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <button onClick={publishPage}>Publish</button>
    </div>
  );
}

export default App;
