import { Component } from "react";
import Switch from "react-switch";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

class SwitchExample extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: this.props.checked };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (checked) => {
    this.setState({ checked });
    if (this.props.onChange) {
      this.props.onChange(checked);
    }
  };
  render() {
    const iconStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      fontSize: 14,
      color: "#2cb1ba",
    };
    return (
      <label>
        <span>{this.props.name}</span>
        <Switch
          height={20}
          width={40}
          onColor="#2cb1ba"
          offColor="#2cb1ba"
          onChange={this.handleChange}
          checked={this.state.checked}
          uncheckedHandleIcon={
            <div style={iconStyle}>
              <FaArrowTrendUp />
            </div>
          }
          uncheckedIcon={false}
          checkedHandleIcon={
            <div style={iconStyle}>
              <FaArrowTrendDown />
            </div>
          }
          checkedIcon={false}
        />
      </label>
    );
  }
}
export default SwitchExample;
