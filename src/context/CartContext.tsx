import { createContext, ReactNode, useState } from "react";
import { IProduct } from "../models/IProduct";

interface ICartContext {
  myCart: IProduct[];
  setMyCart: React.Dispatch<React.SetStateAction<IProduct[]>>;
  isLoggedIn: boolean;  // Add isLoggedIn to the context interface
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>; // Add setIsLoggedIn to the context interface
}

export const CartContext = createContext<ICartContext | undefined>({
  myCart: [],
  setMyCart: () => {},
  isLoggedIn: false, // Initial default value for isLoggedIn
  setIsLoggedIn: () => {}, // Placeholder for the setIsLoggedIn function
});

export const CartContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [myCart, setMyCart] = useState<IProduct[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // State to track login status

  const dataToBeSupplied = {
    myCart,
    setMyCart,
    isLoggedIn,
    setIsLoggedIn, // Provide setIsLoggedIn to update login status
  };

  return (
    <CartContext.Provider value={dataToBeSupplied}>
      {children}
    </CartContext.Provider>
  );
};
