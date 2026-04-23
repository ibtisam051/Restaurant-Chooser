import React, { useState } from "react";
import { View, StyleSheet, Image, Alert, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../../components/CustomButton";

const decisionImage = Platform.select({
  ios: require("../../../assets/its-decision-time.ios.png"),
  android: require("../../../assets/its-decision-time.android.png"),
});

const DecisionTimeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    try {
      setLoading(true);
      const peopleData = await AsyncStorage.getItem("people");
      const restaurantsData = await AsyncStorage.getItem("restaurants");
      const people = peopleData ? JSON.parse(peopleData) : [];
      const restaurants = restaurantsData ? JSON.parse(restaurantsData) : [];

      if (!people.length || !restaurants.length) {
        Alert.alert(
          "That ain't gonna work, chief",
          "Please add people and restaurants before starting the decision flow."
        );
        return;
      }

      navigation.navigate("WhosGoing");
    } catch (error) {
      Alert.alert("Something went wrong", "Unable to read saved data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={decisionImage} style={styles.image} resizeMode="contain" />
      </View>
      <CustomButton title="Start Decision" onPress={handleStart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 40,
  },
  image: {
    width: 260,
    height: 260,
  },
});

export default DecisionTimeScreen;
