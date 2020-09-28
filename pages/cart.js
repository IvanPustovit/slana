import CartForm from "../components/Cart/CartForm";
import CartItem from "../components/Cart/CartItem";
import Footer from "../components/Footer";
import HeaderApp from "../components/Header";
import { MyContextProvider, useMyContext } from "../helpers/context";

import dynamic from "next/dynamic";

const DynComp = dynamic(() => import("../components/Cart/CartItem.js"));

function cart() {
  const listCart = useMyContext().cartContent;
  console.log(listCart);
  return (
    <>
      <HeaderApp />
      <div className="container">
        {" "}
        {!listCart.lenght && <p>Ваша корзина пуста</p>}
        {listCart && (
          <ul className="list-cart">
            {listCart.map((el, index) => (
              <DynComp {...el} key={index} index={index} />
            ))}
          </ul>
        )}
      </div>
      <CartForm />
      <Footer />
    </>
  );
}

export default cart;
