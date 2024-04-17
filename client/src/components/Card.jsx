import React from "react";

function Card({ item, sendtoCart }) {
  return (
    <div className="card group relative rounded-md w-[18rem] h-[23rem] border  border-slate-400/10 hover:shadow-xl duration-500 ease-in-out hover:shadow-white/10">
      <img
        className="w-full h-[70%] object-cover rounded-t-md"
        src={item.imgdata}
        alt="No image"
      />

      <div className="card-body h-[30%] px-2 content-center">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-lg text-white font-semibold">{item.dish}</h1>
          <p className="bg-green-500 rounded-full px-2 text-white text-xs">
            {item.rating}&nbsp;★
          </p>
        </div>

        <div className="flex justify-between items-center mb-2 text-indigo-400">
          <p className="text-sm">{item.address}</p>
          <p className="text-sm">{item.price}Rs.</p>
        </div>

        <div className="flex justify-between items-center mb-1 text-indigo-400">
          <img className="w-[18px]" src={item.arrimg} alt="image" />
          <img className="w-[45px]" src={item.delimg} alt="image" />
        </div>

        {/* <div>
          <hr className="mb-2" />
          <div className="flex justify-between items-center">
            <img className="w-[15px]" src={item.arrimg} alt="image" />
            <button
              type="button"
              onClick={() => sendtoCart(item)}
              className="px-4 bg-red-500 rounded-md"
            >
              Add&nbsp;to&nbsp;Cart
            </button>
            <img className="w-[18px]" src={item.delimg} alt="image" />
          </div>
        </div> */}
      </div>

      {/* group-hover effect */}
      <div className="absolute hidden top-[10rem] left-[5rem] group-hover:flex animate-bounce transition-all ease-in-out duration-1000">
        <button
          type="button"
          onClick={() => sendtoCart(item)}
          className="text-sm px-6 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700 duration-200 ease-in-out"
        >
          Add&nbsp;to&nbsp;Cart
        </button>
      </div>
    </div>
  );
}

export default Card;
