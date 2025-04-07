import React from 'react';
import Item from '../item/item';
import './ItemList.modules.css'; // Importar el CSS

const ItemList = ({ productos }) => {
  return (
    <div className="container mt-4">
      <div className="row">
        {productos?.map((product) => (
          <div key={product.id} className="col-md-4 mb-4"> {/* Usar columnas de Bootstrap */}
            <Item product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;