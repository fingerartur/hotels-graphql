import React from "react";
import { Card, Row, Col, Rate } from "antd";

export default ({ hotel }) => {
  return (
    <Row style={{ marginTop: 10 }}>
      <Col span={16}>
        <h1>{hotel.name}</h1>
        <Rate value={hotel.rating.stars} />
      </Col>
      <Col span={8} style={{ float: "right" }}>
        <Card
          cover={<img src={hotel.mainPhoto.lowResUrl} />}
          style={{ width: 180 }}
        >
          <p>{hotel.address.street}</p>
          <p>{hotel.address.city}</p>
          <p>{hotel.address.zip}</p>
        </Card>
      </Col>
    </Row>
  );
};
