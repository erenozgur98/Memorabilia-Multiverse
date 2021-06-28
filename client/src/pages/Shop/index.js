import React, { useEffect, useState } from 'react';
import Card from '../../components/Card'; //TODO update Card
import { Box } from 'rebass';

import './style.css';
import API from '../../utils/API.js';
import ToggleContainer from '../../components/Toggle-Container';
import { useParams } from 'react-router-dom';

function Shop() {
  const [franchise, setFranchise] = useState(0);
  const [itemList, setItemList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      API.getOneFranchise(id)
        .then((list) => {
          setItemList(list.data);
          setFranchise(parseInt(id))
        });
    } else {
      API.getAll()
        .then((list) => {
          setItemList(list.data);
          setFranchise("0")
        });
    }
  }, [id]);
  return (
    <div className="containers">
      <ToggleContainer className="tog" franchiseSelected={franchise} />
      <Box>
        <div className="shop">
          {itemList.map((item, i) => (
            <Card className="item" key={i} {...item} />
          ))}

        </div>
      </Box>
    </div>
  );
}

export default Shop;
