import React, { useEffect, useState } from 'react';
import { Request } from '../utils/Request';
import { Link, useParams } from 'react-router-dom';

export default function TestTwo() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const query = useParams();
  const [inputNew, setInputNew] = useState('');

  console.log(data);

  const getData = async () => {
    const { data } = await Request.get('/checklist/' + query.id + '/item');
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
            {data.map((item) => (
              <div
                style={{
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Link to={`/detail/${query.id}/item/${item.id}`}>
                  {item.name}
                </Link>
                <input
                  type="checkbox"
                  defaultChecked={item.itemCompletionStatus}
                  disabled={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
