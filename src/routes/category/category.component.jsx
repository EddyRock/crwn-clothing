import { useParams } from 'react-router';
import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';

import Spinner from '../../components/spinner/spinner.compoentn.jsx';

import {
  selectCategoriesMap,
  selectCategoriesIsLoading
} from '../../store/categories/category.selector.js';

import ProductCard from '../../components/product-card/product-card.component';
import { CategoryContainer, CategoryTitle } from './category.style.jsx';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category] ?? []);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
