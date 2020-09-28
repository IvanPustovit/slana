import { useCallback, useContext, useState } from "react";

const MyContext = React.createContext();

export const useMyContext = () => {
  return useContext(MyContext);
};

export const MyContextProvider = ({ children }) => {
  const [userIdSession, setUserIdSession] = useState(null);
  const [cartContent, setCartContent] = useState([]);

  const setUserId = (ctx) => {
    setUserIdSession(ctx);
  };

  const setCartCnx = (ctx) => {
    setCartContent((prev) => {
      const n = prev.find(
        (el) =>
          el.color === ctx.color && el.size === ctx.size && el.name === ctx.name
      );
      if (n) {
        const index = prev.indexOf(n);
        prev[index] = { ...n, amountInCart: n.amountInCart + 1 };
        return prev;
      }
      prev.push(ctx);
      return prev;
    });
  };
  console.log(cartContent);

  const setAmount = (e, index) => {
    console.log(cartContent);
    console.log(index);
    const ev = e.target.textContent;
    setCartContent((prev) => {
      switch (ev) {
        case "add":
          prev[index] = {
            ...prev[index],
            amountInCart: prev[index].amountInCart + 1,
          };
          // listCart[index] = storage[index];
          // setStor(STOREGE_CART, listCart);
          // totalOrder();
          return prev;

        case "remove":
          if (prev[index].amountInCart === 1) {
            prev.splice(index, 1);
          } else {
            prev[index] = {
              ...prev[index],
              amountInCart: prev[index].amountInCart - 1,
            };
            // listCart[index] = storage[index];
          }
          // totalOrder();
          return prev;

        default:
          return;
      }
    });
  };
  return (
    <MyContext.Provider
      value={{ userIdSession, setUserId, cartContent, setCartCnx, setAmount }}
    >
      {children}
    </MyContext.Provider>
  );
};
