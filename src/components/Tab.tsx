import React, { useState, useEffect } from 'react';
import './Tab.css'
import Edit from './Edit'

interface TableData {
  pinCode: number;
  name: string;
  age: number;
  city : string;
}

const Tab: React.FC = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const handleEdit = (index: number) => {
    setSelectedItemIndex(index);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedItem: TableData) => {
    if (selectedItemIndex !== null) {
      const newData = [...data];
      newData[selectedItemIndex] = updatedItem;
      setData(newData);
      alert("Success : Edits Saved")
    }
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedItemIndex(null);
  };


  useEffect(() => {
    // Fetching data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('https://assets.alippo.com/catalog/static/data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleDelete = (index: number) => {
    // Handle delete functionality here
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    console.log('Deleted item at index:', index);
    alert("Success: Item Deleted")
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Numbers</th>
            <th>pinCode</th>
            <th>Name</th>
            <th>Age</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.pinCode}>
                <td>{index + 1}</td>
              <td>{item.pinCode || 'N/A'}</td>
              <td>{item.name || 'N/A'}<i className="fa-regular fa-pen-to-square" onClick={() => handleEdit(index)}></i></td>
              <td>{item.age || 'N/A'}</td>
              <td><i className="fa-solid fa-trash" onClick={() => handleDelete(index)} ></i></td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditModalOpen && selectedItemIndex !== null && (
        <Edit
          item={data[selectedItemIndex]}
          onSave={handleSaveEdit}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Tab;
