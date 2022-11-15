import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Request } from '../utils/Request';

export default function Home() {
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [inputNew, setInputNew] = useState('');

  const getData = async () => {
    const { data } = await Request.get('/checklist');
    setData(data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await Request.post('/checklist', {
        name: inputNew,
      });

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
        <h3>Get Item Data</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Add Item"
            onChange={(e) => setInputNew(e.target.value)}
          />
          <button type="button" onClick={handleAdd}>
            Add New
          </button>
        </div>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data.map((item) => (
          <div key={item.id} style={{ textAlign: 'left', marginTop: '1rem' }}>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                borderBottom: '1px solid lightgray',
              }}
            >
              <h5>{item.name}</h5>
              <input
                type={'checkbox'}
                defaultChecked={item.checklistCompletionStatus}
              />

              <button onClick={() => navigate(`/detail/${item.id}`)}>
                Detail
              </button>

              <button onClick={() => handleDeleteChecklist(item.id)}>
                Delete
              </button>
            </div>
            {item.items !== null &&
              item.items.map((v) => (
                <div
                  key={v.id}
                  style={{
                    paddingLeft: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <p>{v.name}</p>
                  <input
                    type={'checkbox'}
                    defaultChecked={v.itemCompletionStatus}
                  />
                </div>
              ))}
          </div>
        ))
      )}
    </div>
  );
}
