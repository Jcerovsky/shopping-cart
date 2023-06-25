import React, { useContext, useEffect, useState } from 'react';
import IndividualList from './IndividualList';
import '../App.css';
import { AppContext } from '../AppContext';

function ShoppingList() {
  const { allLists } = useContext(AppContext)!;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(allLists.length === 0);
  }, [allLists]);

  if (isLoading) {
    return (
      <p mT="8" textAlign="center">
        Nothing to see here...
      </p>
    );
  }

  return (
    <div className="list">
      <ul>
        {allLists.map(list => (
          <IndividualList list={list} key={list.id} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
