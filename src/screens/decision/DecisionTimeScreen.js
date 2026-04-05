import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Platform } from "react-native";
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
      <Text style={styles.headline}>Decision Time</Text>
      <Text style={styles.description}>
        Tap the food image to start the restaurant choosing process.
      </Text>
      <TouchableOpacity onPress={handleStart} activeOpacity={0.8} style={styles.imageContainer}>
        <Image source={decisionImage} style={styles.image} resizeMode="contain" />
      </TouchableOpacity>
      <CustomButton title="Start" onPress={handleStart} disabled={loading} width="94%" />
      <Text style={styles.tip}>
        The app checks whether you have saved people and restaurants before continuing.
      </Text>
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
  headline: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 260,
    height: 260,
  },
  tip: {
    marginTop: 14,
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});

export default DecisionTimeScreen;
