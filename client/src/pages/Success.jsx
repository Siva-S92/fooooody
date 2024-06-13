import React from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-screen h-screen grid place-content-center">
        <div className="w-[500px] h-[200px] bg-white rounded-lg text-3xl font-semibold text-green-500 text-center content-center">
          Payment Done Successfully✔
        </div>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-gray-400 rounded-lg px-8 py-1 font-semibold w-fit mx-auto mt-5"
        >
          Go to Home Page
        </button>
      </div>
    </>
  );
}

export default Success;
