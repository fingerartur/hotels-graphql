import React from "react";
import { Spin, Select } from "antd";
import { Query } from "react-apollo";
import { netError } from "./netError";
import gql from "graphql-tag";
const Option = Select.Option;

const findCity = (city, allowedCities) => {
  return allowedCities.find(allowedCity => allowedCity.name === city.name);
};
const isAmong = (city, allowedCities) => {
  const result = findCity(city, allowedCities);
  return result !== undefined;
};
const idFor = (city, allowedCities) => {
  return findCity({ name: city }, allowedCities).id;
};

export default ({ countryId, onSelect, allowedCities }) => (
  <React.Fragment>
    {countryId ? (
      <Query
        query={gql`
          query citiesInCountry($countryId: String!) {
            allSubLocations(id: $countryId, options: { locationType: city }) {
              edges {
                node {
                  locationId
                  name
                }
              }
            }
          }
        `}
        variables={{ countryId }}
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
              const cities = data.allSubLocations.edges.map(edge => edge.node);
              cities.sort((city1, city2) => {
                return city1.name.localeCompare(city2.name);
              });
              return (
                <Select
                  style={{ width: 120 }}
                  onChange={cityName => {
                    const id = idFor(cityName, allowedCities);
                    onSelect(id, cityName);
                  }}
                  placeholder="city"
                  showSearch={true}
                >
                  {cities.map(city => (
                    <Option
                      key={city.locationId}
                      value={city.name}
                      disabled={!isAmong(city, allowedCities)}
                    >
                      {city.name}
                    </Option>
                  ))}
                </Select>
              );
            }
          }
        }}
      </Query>
    ) : (
      <Select style={{ width: 120 }} placeholder="city" disabled={true} />
    )}
  </React.Fragment>
);
