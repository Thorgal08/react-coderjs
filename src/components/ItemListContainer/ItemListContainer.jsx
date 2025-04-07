import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore'; // Importar funciones necesarias de Firestore
import { useParams } from 'react-router-dom'; // Importar useParams para obtener el parámetro de la URL
import db from '../../firebaseConfig';
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.modules.css'; // Importar estilos personalizados si es necesario
import { CartContext } from '../../context/CartContext';

const ItemListContainer = ({ titulo }) => {
  const { categoryId } = useParams(); // Obtener el parámetro de categoría desde la URL
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const collectionRef = collection(db, 'items'); // Referencia a la colección 'items'
        let q;

        if (categoryId) {
          // Si hay un categoryId, filtrar por categoría
          q = query(collectionRef, where('category', '==', categoryId));
        } else {
          // Si no hay categoryId, obtener todos los productos
          q = collectionRef;
        }

        const querySnapshot = await getDocs(q); // Ejecutar la consulta
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(items);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [categoryId]); // Ejecutar el efecto cuando cambie el categoryId

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div>
      <h1>{titulo}</h1>
      <ItemList productos={productos} />
    </div>
  );
};

export default ItemListContainer;