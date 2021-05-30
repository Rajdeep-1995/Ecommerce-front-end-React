import React from "react";
import TypingEffect from "../components/cards/TypingEffect";
import BestSellers from "../components/home/BestSellers";
import NewArrivals from "../components/home/NewArrivals";

const Home = () => {
  return (
    <>
      <div className="jumbotron text-danger h1 text-center font-weight-bold">
        <TypingEffect
          text={[
            "Best Summer Deals!",
            "Up to 50% Discount on Electronics items",
            "Latest Arrivals",
          ]}
        />
      </div>
      <h4 className="jumbotron text-center display-4 mt-5 mb-5 p-3">
        New Arrivals
      </h4>
      <NewArrivals />
      <br />
      <br />
      <h4 className="jumbotron text-center display-4 mt-5 mb-5 p-3">
        Best Sellers
      </h4>
      <BestSellers />
    </>
  );
};

export default Home;
