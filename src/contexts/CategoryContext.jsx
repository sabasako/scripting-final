import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("WOMEN"); // WOMEN || MEN || KIDS

  const changeCategory = (newCategory) => {
    setCategory(newCategory);
    navigate("/");
  };

  return (
    <CategoryContext.Provider value={{ category, changeCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
