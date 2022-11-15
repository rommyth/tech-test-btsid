import React, { useEffect, useState } from 'react';
import { Request } from '../utils/Request';
import { Link, useParams } from 'react-router-dom';

export default function MoreDetail() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const query = useParams();
  const [inputNew, setInputNew] = useState('');
  const [isPopup, setIsPopup] = useState(false);

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

  const handleCheck = async (e) => {
    try {
      await Request.put('/checklist/' + query.id + '/item/' + query.itemId);
      await getData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRename = async (e) => {
    try {
      await Request.put(
        '/checklist/' + query.id + '/item/rename/' + query.itemId,
        {
          itemName: inputNew,
        }
      );
      setIsPopup(false);
      await getData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    try {
      await Request.delete('/checklist/' + query.id + '/item/' + query.itemId);
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
          <>
            {data && (
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <input
                    type="checkbox"
                    defaultChecked={data.itemCompletionStatus}
                    onChange={(e) => handleCheck(e)}
                  />
                  <p>{data.name}</p>
                  <button onClick={handleDelete}>Delete</button>
                  <button type="button" onClick={() => setIsPopup(!isPopup)}>
                    Rename
                  </button>

                  {isPopup && (
                    <div>
                      <input
                        type="text"
                        placeholder="New Name"
                        onChange={(e) => setInputNew(e.target.value)}
                      />
                      <button onClick={() => handleRename()}>Submit</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
