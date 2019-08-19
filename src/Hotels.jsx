import React from "react";
import Hotel from "./Hotel";
import { Spin } from "antd";
import { Query } from "react-apollo";
import { netError } from "./netError";
import gql from "graphql-tag";

export default ({ cityId, dateFrom, dateTo }) => {
  return (
    <Query
      query={gql`
      query availableHotels(
        $cityId: String!
        $dateFrom: Date!
        $dateTo: Date!
      ) {
        allAvailableHotels(
          search: {
            cityId: $cityId
            checkin: $dateFrom
            checkout: $dateTo
            roomsConfiguration: { adultsCount: 1 }
          }
        ) {
          edges {
            node {
              id
              hotel {
                name
                address {
                  street
                  city
                  zip
                }
                rating {
                  stars
                }
                mainPhoto {
                  lowResUrl
                }
              }
            }
          }
        }
      }
    `}
      variables={{
        cityId,
        dateFrom,
        dateTo
      }}
    >
      {({ data, error, loading }) => {
        if (loading) {
          return <Spin />;
        } else {
          if (error) {
            netError();
            console.error(error);
            return null;
          } else {
            const hotels = data.allAvailableHotels.edges.map(edge => edge.node);
            return hotels.map(hotel => (
              <Hotel key={hotel.id} hotel={hotel.hotel} />
            ));
          }
        }
      }}
    </Query>
  );
};
