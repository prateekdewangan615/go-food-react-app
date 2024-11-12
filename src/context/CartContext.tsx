import { createContext, ReactNode, useState } from "react";
import { IProducts } from "../models/IProducts";

interface ICartContext{
  myCart: IProducts[];
  setMyCart: React.Dispatch<React.SetStateAction<IProducts[]>>;
}
export const CartContext = createContext<ICartContext | undefined>({myCart:[],setMyCart:()=>{}});

export const CartContextProvider:React.FC<{children: ReactNode}> = ({children}) =>{
  const [myCart, setMyCart] = useState<IProducts[]>([]);

  const dataToBeSupplied = {
    myCart: myCart,
    setMyCart: setMyCart, 
  }

  return (
    <CartContext.Provider value={dataToBeSupplied}>
      {children}
    </CartContext.Provider>
  );
}
