import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const cartData = useSelector((store) => store.cartItems.carts);
  return (
    <div className="w-screen fixed z-50 bg-black py-[1%] px-[4%] flex justify-between items-center ">
      <div
        className="flex justify-center items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <h1 className="text-2xl text-white font-semibold">Fooooody</h1>
        <span>
          <img className="w-[30px]" src="/images/Face-tongue.png" alt="image" />
        </span>
      </div>

      <div className="cursor-pointer" onClick={()=> navigate("/cart")}>
        <Badge badgeContent={cartData.length} color="primary">
          <ShoppingCartIcon className="text-white" />
        </Badge>
      </div>
    </div>
  );
}

export default Header;
