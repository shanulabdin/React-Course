import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';
import { useSearchParams } from 'react-router';

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const getHomeData = async () => {
      // if (search) {
      //   const response = await axios.get(`/api/products?search=${search}`);
      //   setProducts(response.data);
      // } else {
      //   const response = await axios.get('/api/products');
      //   setProducts(response.data);
      // }
      
      const urlPath = search ? `api/products?search=${search}` : '/api/products';
      const response = await axios.get(urlPath);
      setProducts(response.data);
    };

    getHomeData();
  }, [search]);


  return (
    <>
      <Header cart={cart} />

      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}