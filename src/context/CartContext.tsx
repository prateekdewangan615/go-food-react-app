import { createContext, ReactNode, useState } from "react";
import { IProduct } from "../models/IProduct";

interface ICartContext{
  myCart: IProduct[];
  setMyCart: React.Dispatch<React.SetStateAction<IProduct[]>>;
}
export const CartContext = createContext<ICartContext | undefined>({myCart:[],setMyCart:()=>{}});

export const CartContextProvider:React.FC<{children: ReactNode}> = ({children}) =>{
  const [myCart, setMyCart] = useState<IProduct[]>([]);
  console.log(" inside context",myCart);

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