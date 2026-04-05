import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomButton from "../../components/CustomButton";

const PostChoiceScreen = ({ navigation, route }) => {
  const chosenRestaurant = route.params?.chosenRestaurant;

  if (!chosenRestaurant) {
    return (
      <View style={styles.container}>
        <Text style={styles.headline}>No restaurant selected.</Text>
        <CustomButton title="Start Over" onPress={() => navigation.popToTop()} width="94%" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headline}>Enjoy your meal!</Text>
      <View style={styles.detailsBox}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{chosenRestaurant.name}</Text>

        <Text style={styles.label}>Cuisine:</Text>
        <Text style={styles.value}>{chosenRestaurant.cuisine}</Text>

        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>{"$".repeat(Number(chosenRestaurant.price) || 0)}</Text>

        <Text style={styles.label}>Rating:</Text>
        <Text style={styles.value}>{"★".repeat(Number(chosenRestaurant.rating) || 0)}</Text>

        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{chosenRestaurant.phone}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{chosenRestaurant.address}</Text>

        <Text style={styles.label}>Website:</Text>
        <Text style={styles.value}>{chosenRestaurant.website}</Text>

        <Text style={styles.label}>Delivery:</Text>
        <Text style={styles.value}>{chosenRestaurant.delivery === "Yes" ? "Yes" : "No"}</Text>
      </View>
      <CustomButton title="All Done" onPress={() => navigation.popToTop()} width="94%" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headline: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  detailsBox: {
    width: "94%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    marginTop: 4,
  },
});

export default PostChoiceScreen;
