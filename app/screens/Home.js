import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { watchPosition, clearWatches } from "../config/geolocation";
import api from "../config/api";

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rodando: false,
      zootec: false,
      sentido: false
    };
  }
  switchRodando = () => {
    const rodando = !this.state.rodando;
    this.setState({ rodando });
  };
  switchZootec = () => {
    const zootec = !this.state.zootec;
    this.setState({ zootec });
  };
  switchSentido = () => {
    const sentido = !this.state.sentido;
    this.setState({ sentido });
  };

  updateBage = position => {
    const { rodando, zootec, sentido } = this.state;
    const { latitude, longitude } = position.coords;
    api
      .put("/api/bages", {
        bage: {
          latitude,
          longitude,
          one_signal: "wwewe",
          rodando,
          sentido,
          zootec
        }
      })
      .catch(() => {});
  };
  watchPosition = async () => {
    await watchPosition(this.updateBage, () => {});
  };

  componentDidMount() {
    this.watchPosition();
  }
  componentWillUnmount() {
    clearWatches();
  }
  renderIconSentido = sentido =>
    sentido ? (
      <Icon name="long-arrow-left" type="font-awesome" size={42} />
    ) : (
      <Icon name="long-arrow-right" type="font-awesome" size={42} />
    );

  render() {
    const { rodando, sentido, zootec } = this.state;
    return (
      <View style={{ flex: 1, padding: 10, alignItems: "center" }}>
        <TouchableOpacity
          style={{
            margin: 10,
            backgroundColor: rodando ? "green" : "red",
            justifyContent: "center",
            height: 50,
            width: 200,
            alignItems: "center"
          }}
          onPress={this.switchRodando}
        >
          <Text>Rodando</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Icon
            name="home-city"
            type="material-community"
            size={32}
            color="gray"
          />
          <TouchableOpacity
            style={{
              marginVertical: 10,
              width: 200
            }}
            onPress={this.switchSentido}
          >
            {this.renderIconSentido(sentido)}
          </TouchableOpacity>
          <Icon name="gate" type="material-community" size={32} color="gray" />
        </View>
        <TouchableOpacity
          style={{
            margin: 10,
            backgroundColor: zootec ? "green" : "red",
            justifyContent: "center",
            height: 50,
            width: 200,
            alignItems: "center"
          }}
          onPress={this.switchZootec}
        >
          <Text>Zootecnia</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
