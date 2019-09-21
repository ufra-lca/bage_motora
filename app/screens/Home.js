import React, { PureComponent } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import SwitchToggle from "react-native-switch-toggle";
import { Icon, Text, Button } from "react-native-elements";
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
  renderTextSentido() {
    const { sentido } = this.state;
    return sentido ? "Indo para o Prédio" : "Indo para o Portão";
  }
  renderTextZootec() {
    const { zootec } = this.state;
    return zootec ? "Vai para Zootecnia" : " Não Vai para Zootecnia";
  }
  render() {
    const { rodando, sentido, zootec } = this.state;
    return (
      <View
        style={{
          flex: 1,
          padding: 10,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: rodando ? "green" : "red" }} h2>
            Rodando
          </Text>
          <SwitchToggle
            switchOn={rodando}
            onPress={this.switchRodando}
            backgroundColorOn={"green"}
            circleColorOn={"white"}
            circleColorOff={"red"}
            containerStyle={{
              marginTop: 16,
              width: 300,
              borderRadius: 60,
              padding: 5,
              height: 100
            }}
            circleStyle={{ width: 90, height: 90, borderRadius: 45 }}
            duration={300}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: "100%"
          }}
        >
          <Text style={{ color: rodando ? "green" : "red" }} h2>
            {this.renderTextSentido()}
          </Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Icon
              name="gate"
              type="material-community"
              size={32}
              color="black"
            />
            <SwitchToggle
              switchOn={sentido}
              onPress={this.switchSentido}
              backgroundColorOn={"black"}
              backgroundColorOff={"green"}
              circleColorOn={"green"}
              circleColorOff={"black"}
              containerStyle={{
                marginTop: 16,
                width: 160,
                borderRadius: 30,
                padding: 5,
                height: 60
              }}
              circleStyle={{ width: 50, height: 50, borderRadius: 25 }}
              duration={300}
            />

            <Icon
              name="home-city"
              type="material-community"
              size={32}
              color="green"
            />
          </View>
          <Text style={{ color: rodando ? "green" : "red" }} h2>
            {this.renderTextZootec()}
          </Text>
          <SwitchToggle
            switchOn={zootec}
            onPress={this.switchZootec}
            backgroundColorOn={"green"}
            circleColorOn={"white"}
            circleColorOff={"red"}
            containerStyle={{
              marginTop: 16,
              width: 160,
              borderRadius: 30,
              padding: 5,
              height: 60
            }}
            circleStyle={{ width: 50, height: 50, borderRadius: 25 }}
            duration={300}
          />
        </View>
      </View>
    );
  }
}
