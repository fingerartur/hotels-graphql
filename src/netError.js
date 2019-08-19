import { notification } from "antd";

export const netError = () => {
  notification.open({
    message: "Error",
    description: "No network connection, make sure you are connected to a wifi."
  });
};
