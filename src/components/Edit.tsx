
import React, { useState } from 'react';

interface TableData {
    pinCode: number;
    name: string;
    age: number;
    city : string;
  }

interface EditModalProps {
  item: TableData;
  onSave: (updatedItem: TableData) => void;
  onClose: () => void;
}

const Edit: React.FC<EditModalProps> = ({ item, onSave, onClose }) => {
  const [editedName, setEditedName] = useState(item.name);

  const handleSave = () => {
    const updatedItem: TableData = { ...item, name: editedName };
    onSave(updatedItem);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Name</h2>
        <input
          type="text"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Edit;
