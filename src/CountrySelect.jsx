import React from "react";
import { Spin, Select } from "antd";
import { Query } from "react-apollo";
import { netError } from "./netError";
import gql from "graphql-tag";
const Option = Select.Option;

export default ({ onSelect }) => (
  <Query
    query={gql`
      query allCountries {
        allLocations(options: { locationType: country }) {
          edges {
            node {
              locationId
              name
            }
          }
        }
      }
    `}
  >
    {({ data, error, loading }) => {
      if (loading) {
        return <Spin />;
      } else {
        if (error) {
          netError();
          console.err(error);
          return null;
        } else {
          const countries = data.allLocations.edges.map(edge => edge.node);
          countries.sort((country1, country2) => {
            return country1.name.localeCompare(country2.name);
          });
          return (
            <Select
              style={{ width: 120 }}
              onChange={(value, option) => {
                onSelect(option.key);
              }}
              placeholder="country"
              showSearch={true}
            >
              {countries.map(country => (
                <Option key={country.locationId} value={country.name}>
                  {country.name}
                </Option>
              ))}
            </Select>
          );
        }
      }
    }}
  </Query>
);
