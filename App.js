import React, { Component } from "react";
import { View, Text } from "react-native";
import Home from "./app/screens/Home";
import OneSignal from "react-native-onesignal";
export default class App extends Component {
  constructor(props) {
    OneSignal.init("YOUR_ONE_SIGNAL_APP_ID");

    OneSignal.addEventListener("ids", device => this.onIds(device));
    super(props);

    this.state = {
      userId: null,
      loading: true
    };
  }

  onIds(device) {
    const { userId } = device;
    this.setState({ loading: false, userId });
  }
  componentWillUnmount() {
    OneSignal.removeEventListener("ids", this.onIds);
  }

  render() {
    const { loading, userId } = this.state;
    if (loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Carregando</Text>
        </View>
      );
    }
    return <Home userId={userId} />;
  }
}
