import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getCategoriesAndDocuments
} from './utils/firebase/firebase.utils';

import { setCurrentUser } from './store/user/user.action';
import { setCategoriesMap } from './store/categories/category.action';

import { Routes, Route } from 'react-router';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authication from './routes/authication/authication.component';
import Checkout from './routes/checkout/checkout.component';
import Shop from './routes/shop/shop.component';

const App = () => {
  const dispatch = useDispatch();

  const onHandleUser = () => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  };
  const onHandleCategories = () => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      dispatch(setCategoriesMap(categoryMap));
    };
    getCategoriesMap();
  };

  useEffect(() => {
    onHandleUser();
    onHandleCategories();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
