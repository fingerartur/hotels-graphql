import React from "react";
import Search from "./Search";
import Hotels from "./Hotels";
import { Layout } from "antd";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import gql from "graphql-tag";
const Content = Layout.Content;

const apollClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://graphql.kiwi.com/"
  }),
  cache: new InMemoryCache()
});

export default class App extends React.Component {
  state = {
    hotelCities: [],
    cityId: "aG90ZWxDaXR5Oi01NTMxNzM",
    dateRange: ["2018-09-11", "2018-09-21"]
  };

  componentDidMount() {
    this.loadHotelCities();
  }

  loadHotelCities = async () => {
    const data = await apollClient.query({
      query: gql`{
        hotelCities {
          edges {
            node {
              id
              name
            }
          }
        }
      }`
    });
    const hotelCities = data.data.hotelCities.edges.map(edge => edge.node);
    this.setState({ hotelCities });
    console.log("Loaded cities with hotels in them: ", hotelCities);

    // netError();
  };

  handleSearch = state => {
    this.setState({
      cityId: state.city,
      dateRange: state.dateRange
    });
    console.log("Searching hotels for: ", state);
  };

  render() {
    return (
      <ApolloProvider client={apollClient}>
        <Layout>
          <Content style={{ width: "80%", margin: "2em auto 0 auto" }}>
            <Search
              cities={this.state.hotelCities}
              onSearch={this.handleSearch}
            />
            {this.state.cityId && this.state.dateRange ? (
              <Hotels
                cityId={this.state.cityId}
                dateFrom={this.state.dateRange[0]}
                dateTo={this.state.dateRange[1]}
              />
            ) : null}
          </Content>
        </Layout>
      </ApolloProvider>
    );
  }
}
