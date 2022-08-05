import React, { useEffect } from 'react';
import BottomNav from '../../components/bottomNav';
import { Carousel } from '../../components/carousel/Carousel';
import ProductCard from '../../components/product';
import TopBar from '../../components/topBar';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { fetchProducts } from '../../store/productsSlice';
import { AppDispatch } from '../../store/store';
import { Loader } from '../../components/ui/loader/Loader';

export const MainPage = () => {
  const [column, setColumn] = React.useState(false);
  const { data, loading } = useAppSelector((state) => state.products);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const changeView = () => {
    setColumn(!column);
  };

  return (
    <div className="container">
      <div className="mb50">
        <h2 className="f32 mb10">Главная</h2>
        <div className="mb20">
          <Carousel />
        </div>
        <div className="mb20">
          <TopBar column={column} count={data.length} changeView={changeView} />
        </div>
        <div>
          {data.length && !loading ? (
            <div className="products mb50">
              {data.map((product) => (
                <ProductCard key={product.id} column={column} item={product} />
              ))}
            </div>
          ) : loading ? (
            <Loader />
          ) : null}
        </div>
        <BottomNav />
      </div>
    </div>
  );
};
