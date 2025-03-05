import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Routes, Route } from 'react-router';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authication from './routes/authication/authication.component';
import Checkout from './routes/checkout/checkout.component';
import Shop from './routes/shop/shop.component';

import { checkUserSession } from './store/user/user.action';

const App = () => {
  const dispatch = useDispatch();

  const onHandleUser = () => {
    dispatch(checkUserSession());
  };

  useEffect(() => {
    onHandleUser();
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
