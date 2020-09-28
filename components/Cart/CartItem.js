import formatMoney from "@jlozovei/format-money";
import { useCallback, useEffect } from "react";
import { useMyContext } from "../../helpers/context";

const CartItem = ({
  name,
  img,
  info,
  color,
  size,
  amountInCart,
  price,
  index,
}) => {
  const { setAmount, cartContent } = useMyContext();
  //   const { name, img, info, color, size, amountInCart, price } = cartContent[
  //     index
  //   ];
  const amountPlus = useCallback(
    (e) => {
      setAmount(e, index);
    },
    [cartContent]
  );

  //   const amountPlus = (e) => {
  //     const storage = getStor(STOREGE_CART);
  //     switch (e.target.textContent) {
  //       case "add":
  //         storage[index] = {
  //           ...storage[index],
  //           amountInCart: storage[index].amountInCart + 1,
  //         };
  //         listCart[index] = storage[index];
  //         setStor(STOREGE_CART, listCart);
  //         totalOrder();
  //         return;

  //       case "remove":
  //         if (listCart[index].amountInCart === 1) {
  //           console.log(listCart);
  //           listCart.splice(index, 1);
  //           setStor(STOREGE_CART, listCart);
  //         } else {
  //           storage[index] = {
  //             ...storage[index],
  //             amountInCart: storage[index].amountInCart - 1,
  //           };
  //           listCart[index] = storage[index];

  //           setStor(STOREGE_CART, listCart);
  //         }
  //         totalOrder();
  //         return;

  //       default:
  //         return;
  //     }
  //   };
  return (
    <>
      <li>
        <div className="col s6 m6">
          <h2 className="header">{name.toUpperCase()}</h2>
          <div className="card horizontal">
            <div className="card-image card-image-cart">
              <img src={img} alt={name} />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <p>{info.toUpperCase()}</p>
                <div>
                  <p className="price-cart-item">
                    Сума: {""}
                    {formatMoney({
                      value: price * amountInCart,
                      currencyCode: "UAH",
                      locale: "UA",
                    })}
                  </p>
                </div>
              </div>
              <div className="card-action card-action-option">
                <p>Колір: {color}</p>
                <p>Розмір: {size}</p>
              </div>
              <div className="card-action">
                <button className="btn-floating ">
                  <i
                    className="material-icons"
                    name="remove"
                    onClick={amountPlus}
                  >
                    remove
                  </i>
                </button>
                <div>
                  <p className="count-order">
                    {cartContent[index].amountInCart}
                  </p>
                </div>
                <button className="btn-floating ">
                  <i className="material-icons" name="add" onClick={amountPlus}>
                    add
                  </i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default CartItem;
