import { createContext, useState } from 'react';

export const CategoriesContext = createContext({
  categoriesMap: {}
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  const value = { categoriesMap, setCategoriesMap };
  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};
