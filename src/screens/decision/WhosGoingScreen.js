import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  BackHandler,
  Platform,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
import CustomButton from "../../components/CustomButton";

const WhosGoingScreen = ({ navigation }) => {
  const [people, setPeople] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const data = await AsyncStorage.getItem("people");
      const parsedPeople = data ? JSON.parse(data) : [];
      setPeople(parsedPeople);
      setSelected(parsedPeople.map(() => false));
    };

    fetchPeople();
  }, []);

  useEffect(() => {
    const onBackPress = () => {
      Alert.alert(
        "Leave decision flow?",
        "Are you sure you want to leave the decision flow?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Yes", onPress: () => navigation.navigate("DecisionTime") },
        ]
      );
      return true;
    };

    const backSubscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => backSubscription.remove();
  }, [navigation]);

  const toggleSelection = (index) => {
    const updatedSelected = [...selected];
    updatedSelected[index] = !updatedSelected[index];
    setSelected(updatedSelected);
  };

  const handleNext = () => {
    const selectedParticipants = people
      .map((person, index) => (selected[index] ? { ...person, vetoed: "no" } : null))
      .filter(Boolean);

    if (selectedParticipants.length === 0) {
      Alert.alert("No one selected", "Please choose at least one person to continue.");
      return;
    }

    navigation.navigate("PreFilters", { participants: selectedParticipants });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Who's Going?</Text>
      <Text style={styles.description}>Select the people who are joining this meal.</Text>
      <FlatList
        data={people}
        keyExtractor={(item) => item.key}
        style={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => toggleSelection(index)} style={styles.personRow}>
            <Checkbox
              value={selected[index]}
              onValueChange={() => toggleSelection(index)}
              color={Platform.OS === "ios" ? "#007AFF" : undefined}
            />
            <View style={styles.personInfo}>
              <Text style={styles.personText}>{item.name}</Text>
              {item.relationship ? <Text style={styles.personSubText}>{item.relationship}</Text> : null}
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No people saved yet.</Text>}
      />
      <CustomButton title="Next" onPress={handleNext} width="94%" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headline: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  list: {
    flex: 1,
    marginBottom: 20,
  },
  personRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  personInfo: {
    marginLeft: 12,
  },
  personText: {
    fontSize: 18,
  },
  personSubText: {
    color: "#666",
  },
  separator: {
    height: 10,
  },
  emptyText: {
    textAlign: "center",
    color: "#555",
    marginTop: 40,
    fontSize: 16,
  },
});

export default WhosGoingScreen;
