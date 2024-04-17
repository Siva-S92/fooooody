import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToCart,
  EmptyCart,
  ReduceQuantity,
  RemoveFromCart,
} from "../redux/features/cartSlice";
import { message } from "antd";
import { loadStripe } from "@stripe/stripe-js";

function CartDetails() {
  const [totalprice, setTotalPrice] = useState(0);
  const [totalquantiy, setTotalQuantity] = useState(0);
  const cartArray = useSelector((store) => store.cartItems.carts);
  const dispatch = useDispatch();

  const total = () => {
    let totalprice = 0;
    cartArray.map((ele, ind) => {
      totalprice = ele.price * ele.qnty + totalprice;
    });
    setTotalPrice(totalprice);
  };

  const countQuantity = () => {
    let totalquantity = 0;
    cartArray.map((ele, ind) => {
      totalquantity = ele.qnty + totalquantity;
    });
    setTotalQuantity(totalquantity);
  };

  useEffect(() => {
    total();
  }, [total]);

  useEffect(() => {
    countQuantity();
  }, [countQuantity]);

  const handleIncrement = (element) => {
    dispatch(AddToCart(element));
  };

  const handleDecrement = (element) => {
    dispatch(ReduceQuantity(element));
  };

  const handleRemoveItem = (element) => {
    dispatch(RemoveFromCart(element));
    message.success("The Item Removed From Your Cart", [2.5]);
  };

  const handleEmptyCart = () => {
    dispatch(EmptyCart());
    message.success("Now your cart is empty", [2.5]);
  };

  //payment integration
  const makePayment = async () => {
    try {
      const stipe = await loadStripe(
        "pk_test_51OyuooSDWWAfZmz9YVDL0VavmuWuYKjoAT9K5nhV7JmxhE3ezgTn7JdfbvCZIcu9gVAnt8TiderBiIHpCjShA4VC001T2MpBWB"
      );
      const body = {
        products: cartArray,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetch(
        "http://localhost:7000/api/create-checkout-session",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body),
        }
      );
      const session = await response.json();
      console.log("session:", session);
      const result = stipe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log((await result).error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <section className="overflow-x-auto text-indigo-400">
        <div className="card w-[640px] md:w-3/4 mx-auto bg-black/5 rounded-lg border-2 shadow-lg">
          <div className="card-header w-full bg-black/65 py-3 flex justify-between items-center text-xl text-white font-semibold px-4 rounded-t-lg">
            <span>
              Cart&nbsp;Calculation
              {cartArray.length > 0 ? `(${cartArray.length})` : ""}
            </span>
            {cartArray.length > 0 && (
              <button
                type="button"
                onClick={handleEmptyCart}
                className="flex items-center bg-red-500 px-3 py-1 rounded-md"
              >
                <DeleteIcon />
                Empty&nbsp;Cart
              </button>
            )}
          </div>

          <div className="w-full px-2">
            <div className="card-body w-full">
              {cartArray.length == 0 ? (
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td>
                        <div className="w-full flex flex-col justify-center items-center py-36 gap-3 text-slate-400">
                          <ShoppingCartIcon sx={{ fontSize: 70 }} />
                          <span>Your cart is empty</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <th className="">Action</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th className="text-right">
                        <span>Total&nbsp;Amount</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartArray.length > 0 &&
                      cartArray.map((element, index) => (
                        <tr key={index}>
                          <td className="text-center">
                            <button
                              onClick={() => handleRemoveItem(element.id)}
                              type="button"
                              className="p-1 bg-red-300 text-white"
                            >
                              <DeleteIcon />
                            </button>
                          </td>
                          <td>
                            <div className="flex justify-center">
                              <img
                                className="w-[50px] h-[40px] object-cover rounded"
                                src={element.imgdata}
                                alt="image"
                              />
                            </div>
                          </td>
                          <td className="text-center">{element.dish}</td>
                          <td className="text-center">{element.price}</td>
                          <td>
                            <div className="flex justify-center items-center">
                              <span className="border-2 rounded flex justify-center items-center">
                                <button
                                  type="button"
                                  onClick={
                                    element.qnty > 1
                                      ? () => handleDecrement(element)
                                      : () => handleRemoveItem(element.id)
                                  }
                                  className="bg-slate-400 rounded-sm px-1 border"
                                >
                                  <RemoveIcon className="text-red-500"/>
                                </button>

                                <input
                                  type="text"
                                  className="w-[60px] text-xl text-center"
                                  disabled
                                  value={element.qnty}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleIncrement(element)}
                                  className="bg-slate-400 rounded-sm px-1 border"
                                >
                                  <AddIcon className="text-red-500"/>
                                </button>
                              </span>
                            </div>
                          </td>
                          <td className="text-end">
                            {element.qnty * element.price}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>&nbsp;</th>
                      <th colSpan={2}>&nbsp;</th>
                      <th className="text-end">
                        <div className="flex items-center justify-end">
                          <span className="mx-2">Items&nbsp;in&nbsp;Cart:</span>
                          <span className="text-red-500">{totalquantiy}</span>
                        </div>
                      </th>
                      <th className="text-end">
                        <div className="flex items-center justify-end">
                          <span className="mx-2">Total&nbsp;Price: </span>
                          <span className="text-red-500">{totalprice}</span>
                        </div>
                      </th>
                      <th className="text-end">
                        <button
                          type="button"
                          onClick={makePayment}
                          className="ml-2 md:ml-0 my-1 rounded bg-green-500 text-black px-4 py-1"
                        >
                          check&nbsp;out
                        </button>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CartDetails;
