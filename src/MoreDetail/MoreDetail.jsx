import React, { useEffect, useState } from 'react';
import { Request } from '../utils/Request';
import { Link, useParams } from 'react-router-dom';

export default function MoreDetail() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const query = useParams();
  const [inputNew, setInputNew] = useState('');

  const getData = async () => {
    const { data } = await Request.get(
      '/checklist/' + query.id + '/item/' + query.itemId
    );
    setData(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await Request.post('/checklist/' + query.id + '/item', {
        itemName: inputNew,
      });
      setInputNew('');
      await getData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteChecklist = async (e) => {
    try {
      await Request.delete('/checklist/' + e);
      await getData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <h3>Get Checklist Item API Data</h3>
        <div>
          <input
            type="text"
            placeholder="Add Item"
            onChange={(e) => setInputNew(e.target.value)}
          />
          <button onClick={handleAdd}>Add Item</button>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>{data.name}</p>
              <input
                type="checkbox"
                defaultChecked={data.itemCompletionStatus}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
