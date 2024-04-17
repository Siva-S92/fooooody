import React, { useState } from "react";
import Header from "../components/Header";
import Cardsdata from "../data/CardData";
import { useDispatch } from "react-redux";
import { AddToCart } from "../redux/features/cartSlice";
import Card from "../components/Card";
import {message} from 'antd'


function Home() {
  const [card_data, setCard_data] = useState(Cardsdata)
  const dispatch = useDispatch();

  const sendtoCart = (element) => {
    dispatch(AddToCart(element))
    message.success("Item Added to the cart")
  }
  return (
    <>
      <Header />
      <section className="relative bg-slate-400/5 px-32">
        <p className="text-2xl text-slate-400 font-semibold text-center pb-2">
          These Food is delivered to all over the India
        </p>
        <div className="w-full flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-10 pb-10">
          {card_data &&
            card_data.map((item, index) => (
              <Card key={index} item={item} sendtoCart={sendtoCart}/>
            ))}
        </div>
      </section>
    </>
  );
}

export default Home;
