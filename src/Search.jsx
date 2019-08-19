import React from "react";
import { Button, Select, DatePicker } from "antd";
import CountrySelect from "./CountrySelect";
import CitySelect from "./CitySelect";
import moment from "moment";

const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

export default class Search extends React.Component {
  state = {
    country: null,
    city: null,
    cityName: null,
    dateRange: null
  };

  render() {
    const style = {
      marginRight: 10
    };
    return (
      <div>
        <span style={style}>
          <CountrySelect
            onSelect={value => this.setState({ country: value, city: null })}
          />
        </span>
        <span style={style}>
          <CitySelect
            countryId={this.state.country}
            onSelect={(id, name) => this.setState({ city: id, cityName: name })}
            allowedCities={this.props.cities}
          />
        </span>
        <RangePicker
          format={"YYYY-MM-DD"}
          style={style}
          disabled={!this.state.city}
          onChange={(dates, dateStrings) => {
            this.setState({ dateRange: dateStrings });
          }}
          disabledDate={date => {
            return moment().isAfter(date);
          }}
        />
        <Button
          type="primary"
          disabled={!this.state.city || !this.state.dateRange}
          onClick={() => {
            this.props.onSearch(this.state);
          }}
        >
          Vyhledat
        </Button>
      </div>
    );
  }
}
