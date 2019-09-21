import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import { watchPosition } from "../config/geolocation";
import api from "../config/api";

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      isAtivo: false,
      isOnline: false,
      zootec: false,
      sentido: false
    };
  }
  geo_success = () => {
    //console.log();
  };
  isAtivoSet = () => {
    const isAtivo = !this.state.isAtivo;

    this.setState({ isAtivo });
  };

  zootecSet = () => {
    const zootec = !this.state.zootec;
    this.setState({ zootec });
  };
  updateBage = position => {
    const { isAtivo, zootec, sentido } = this.state;
    const { latitude, longitude } = position.coords;
    api.put("/api/bages", {
      bage: {
        latitude,
        longitude,
        one_signal: "wwewe",
        rodando: isAtivo,
        sentido: sentido,
        zootec: zootec
      }
    });
  };
  watchPosition = async () => {
    await watchPosition(this.updateBage, error => console.log(error));
  };

  componentDidMount() {
    this.watchPosition();
  }
  renderIconSentido = sentido =>
    sentido ? (
      <Icon name="long-arrow-left" type="font-awesome" size={42} />
    ) : (
      <Icon name="long-arrow-right" type="font-awesome" size={42} />
    );

  render() {
    const { isAtivo, sentido, zootec } = this.state;
    return (
      <View style={{ flex: 1, padding: 10, alignItems: "center" }}>
        <TouchableOpacity
          style={{
            margin: 10,
            backgroundColor: isAtivo ? "green" : "red",
            justifyContent: "center",
            height: 50,
            width: 200,
            alignItems: "center"
          }}
          onPress={this.isAtivoSet}
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
            onPress={() => this.setState({ sentido: !sentido })}
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
          onPress={this.zootecSet}
        >
          <Text>Zootecnia</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
