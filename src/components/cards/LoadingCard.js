import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Card } from "antd";

const LoadingCard = ({ count }) => {
  let loadinState = [];
  for (let i = 0; i < count; i++) {
    loadinState.push(
      <Card className="col-md-4 p-3">
        <Skeleton animation="wave" variant="rect" width={150} height={130} />
        <Skeleton animation="wave" width="60%" />
        <Skeleton animation="wave" width="80%" />
        <Skeleton animation="wave" width="80%" />
        <Skeleton animation="wave" width="80%" />
        <Skeleton animation="wave" width="80%" />
        <Skeleton animation="wave" width="80%" />
        <Skeleton animation="wave" width="80%" />
      </Card>
    );
  }
  return <div className="row p-2">{loadinState}</div>;
};

export default LoadingCard;
