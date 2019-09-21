import { Alert } from "react-native";
import Permissions from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";

export async function getPosition(onSucess, onFail) {
  Permissions.request("location", { type: "always" }).then(() => {
    Permissions.check("location", { type: "always" }).then(response => {
      if (response === "authorized") {
        Geolocation.getCurrentPosition(
          position => onSucess(position),
          error => onFail(error),
          { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
        );
      } else {
        onFail({ message: "Permissão" });
        Alert.alert(
          "Erro",
          "Precisamos da sua permissão para utilizar a localização"
        );
      }
    });
  });
}
export async function watchPosition(onSucess, onFail) {
  console.log("sadasdasdas");
  Permissions.request("location", { type: "always" }).then(() => {
    Permissions.check("location", { type: "always" }).then(response => {
      if (response === "authorized") {
        Geolocation.watchPosition(
          position => onSucess(position),
          error => onFail(error),
          { enableHighAccuracy: false, interval: 5000, distanceFilter: 0 }
        );
      } else {
        onFail({ message: "Permissão" });
        Alert.alert(
          "Erro",
          "Precisamos da sua permissão para utilizar a localização"
        );
      }
    });
  });
}

export function clearWatches() {
  Geolocation.stopObserving();
}
