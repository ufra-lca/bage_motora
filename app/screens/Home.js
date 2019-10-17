import React, { PureComponent } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import SwitchToggle from "react-native-switch-toggle";
import { Icon, Text, Button } from "react-native-elements";
import { watchPosition, clearWatches } from "../config/geolocation";
import api from "../config/api";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

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
    const { rodando } = this.state;

    if (rodando) {
      const zootec = !this.state.zootec;
      this.setState({ zootec });
    }
  };
  switchSentido = () => {
    const { rodando } = this.state;
    if (rodando) {
      const sentido = !this.state.sentido;
      this.setState({ sentido });
    }
  };

  updateBage = position => {
    const { rodando, zootec, sentido } = this.state;
    const { userId } = this.props;
    const { latitude, longitude } = position.coords;
    api
      .put("/api/bages", {
        bage: {
          latitude,
          longitude,
          one_signal: userId,
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
      <Icon
        name="long-arrow-right"
        type="font-awesome"
        size={42}
        color={"green"}
      />
    ) : (
      <Icon
        name="long-arrow-left"
        type="font-awesome"
        size={42}
        color="green"
      />
    );
  renderTextRodando() {
    const { rodando } = this.state;
    return rodando ? "Rodando" : "Parado";
  }
  renderTextSentido() {
    const { sentido } = this.state;
    return sentido ? "Indo para o Prédio" : "Indo para o Portão";
  }
  renderTextZootec() {
    const { zootec } = this.state;
    return zootec ? "Passa em Zootecnia" : " Não passa Zootecnia";
  }
  render() {
    const { rodando, sentido, zootec } = this.state;
    const opacity = rodando ? 1 : 0;
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
          <Text style={{ color: rodando ? "green" : "red" }} h1>
            {this.renderTextRodando()}
          </Text>
          <SwitchToggle
            switchOn={rodando}
            onPress={this.switchRodando}
            backgroundColorOn={"green"}
            circleColorOn={"white"}
            circleColorOff={"red"}
            containerStyle={{
              marginTop: 16,
              width: wp("90%"),
              borderRadius: 60,
              padding: 5,
              height: hp("17%")
            }}
            circleStyle={{
              width: wp("25%"),
              height: wp("25%"),
              borderRadius: wp("15%")
            }}
            duration={300}
          />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            opacity
          }}
        >
          <Text style={{ color: rodando ? "green" : "red" }} h2>
            {this.renderTextSentido()}
          </Text>
          {this.renderIconSentido(sentido)}
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
              color="green"
            />
            <SwitchToggle
              switchOn={sentido}
              onPress={this.switchSentido}
              backgroundColorOn={"green"}
              backgroundColorOff={"green"}
              circleColorOn={"white"}
              circleColorOff={"white"}
              containerStyle={{
                marginTop: 16,
                width: wp("60%"),
                borderRadius: 30,
                padding: 5,
                height: hp("10%")
              }}
              circleStyle={{
                width: wp("14%"),
                height: wp("14%"),
                borderRadius: wp("7.5%")
              }}
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
