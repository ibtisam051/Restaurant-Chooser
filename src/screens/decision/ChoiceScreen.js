import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import CustomButton from "../../components/CustomButton";

const getRandom = (min, max) => {
  const low = Math.ceil(min);
  const high = Math.floor(max);
  return Math.floor(Math.random() * (high - low + 1)) + low;
};

const ChoiceScreen = ({ navigation, route }) => {
  const initialParticipants = route.params?.participants || [];
  const initialRestaurants = route.params?.restaurants || [];
  const [participants, setParticipants] = useState(initialParticipants);
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [chosenRestaurant, setChosenRestaurant] = useState(null);
  const [selectedVisible, setSelectedVisible] = useState(false);
  const [vetoVisible, setVetoVisible] = useState(false);

  const stillCanVeto = useMemo(
    () => participants.some((person) => person.vetoed === "no"),
    [participants]
  );

  const selectRandomRestaurant = () => {
    if (!restaurants.length) {
      Alert.alert(
        "No restaurants left",
        "There are no restaurants available to choose from. Please start again."
      );
      return;
    }

    const randomIndex = getRandom(0, restaurants.length - 1);
    setChosenRestaurant(restaurants[randomIndex]);
    setSelectedVisible(true);
  };

  const handleAccept = () => {
    if (!chosenRestaurant) {
      return;
    }
    setSelectedVisible(false);
    navigation.navigate("PostChoice", { chosenRestaurant });
  };

  const handleVetoPress = () => {
    setSelectedVisible(false);
    setVetoVisible(true);
  };

  const handleVetoBy = (person) => {
    const updatedParticipants = participants.map((p) =>
      p.key === person.key ? { ...p, vetoed: "yes" } : p
    );

    const updatedRestaurants = restaurants.filter(
      (restaurant) => restaurant.key !== chosenRestaurant.key
    );

    setParticipants(updatedParticipants);
    setRestaurants(updatedRestaurants);
    setVetoVisible(false);
    setChosenRestaurant(null);

    if (updatedRestaurants.length === 0) {
      Alert.alert(
        "All restaurants are gone",
        "Everyone has used their veto or all options have been removed. Start again from the beginning.",
        [{ text: "OK", onPress: () => navigation.popToTop() }]
      );
      return;
    }

    if (updatedRestaurants.length === 1) {
      navigation.replace("PostChoice", { chosenRestaurant: updatedRestaurants[0] });
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Choice Screen</Text>
      <Text style={styles.description}>
        Participants can veto one choice before the final restaurant is confirmed.
      </Text>
      <FlatList
        style={styles.choiceScreenListContainer}
        data={participants.filter(Boolean)}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.choiceScreenListItem}>
            <Text style={styles.choiceScreenListItemName}>{item.name || `${item.firstName} ${item.lastName}`}</Text>
            <Text style={styles.vetoStatus}>Vetoed: {item.vetoed || "no"}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No participants selected.</Text>}
      />

      <CustomButton
        title="Randomly Choose"
        width="94%"
        onPress={selectRandomRestaurant}
      />

      <Modal visible={selectedVisible} animationType="slide" transparent={false}>
        {chosenRestaurant ? (
          <View style={styles.selectedContainer}>
            <View style={styles.selectedInnerContainer}>
              <Text style={styles.selectedName}>{chosenRestaurant.name}</Text>
              <View style={styles.selectedDetails}>
                <Text style={styles.selectedDetailsLine}>
                  This is a {"★".repeat(Number(chosenRestaurant.rating) || 0)} star restaurant
                </Text>
                <Text style={styles.selectedDetailsLine}>{chosenRestaurant.cuisine} restaurant</Text>
                <Text style={styles.selectedDetailsLine}>
                  with a price rating of {"$".repeat(Number(chosenRestaurant.price) || 0)}
                </Text>
                <Text style={styles.selectedDetailsLine}>
                  that {chosenRestaurant.delivery === "Yes" ? "DOES" : "DOES NOT"} deliver
                </Text>
              </View>

              <CustomButton title="Accept" width="94%" onPress={handleAccept} />
              <CustomButton
                title={stillCanVeto ? "Veto" : "No veto left"}
                width="94%"
                onPress={handleVetoPress}
                disabled={!stillCanVeto}
              />
              <CustomButton
                title="Back"
                width="94%"
                onPress={() => setSelectedVisible(false)}
                buttonStyle={{ backgroundColor: "gray" }}
              />
            </View>
          </View>
        ) : (
          <View style={styles.selectedContainer}>
            <Text>No restaurant selected.</Text>
          </View>
        )}
      </Modal>

      <Modal visible={vetoVisible} animationType="slide" transparent={false}>
        <View style={styles.vetoContainer}>
          <View style={styles.vetoContainerInner}>
            <Text style={styles.vetoHeadline}>Who is vetoing?</Text>
            <ScrollView style={styles.vetoScrollViewContainer}>
              {participants
                .filter((participant) => participant.vetoed === "no")
                .map((participant) => (
                  <TouchableOpacity
                    key={participant.key}
                    style={styles.vetoParticipantContainer}
                    onPress={() => handleVetoBy(participant)}
                  >
                    <Text style={styles.vetoParticipantName}>{participant.name || `${participant.firstName} ${participant.lastName}`}</Text>
                  </TouchableOpacity>
                ))}
              {participants.filter((participant) => participant.vetoed === "no").length === 0 && (
                <Text style={styles.emptyText}>No one can veto anymore.</Text>
              )}
            </ScrollView>
            <View style={styles.vetoButtonContainer}>
              <CustomButton
                title="Never Mind"
                width="94%"
                onPress={() => {
                  setVetoVisible(false);
                  setSelectedVisible(true);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 20,
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headline: {
    fontSize: 30,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
    paddingHorizontal: 16,
  },
  choiceScreenListContainer: {
    width: "94%",
    maxHeight: 240,
  },
  choiceScreenListItem: {
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 4,
    borderBottomWidth: 2,
    borderColor: "#e0e0e0",
    alignItems: "center",
    paddingVertical: 10,
  },
  choiceScreenListItemName: {
    flex: 1,
    fontSize: 16,
  },
  vetoStatus: {
    fontSize: 14,
    color: "#555",
  },
  emptyText: {
    textAlign: "center",
    color: "#555",
    marginTop: 20,
    fontSize: 16,
  },
  selectedContainer: {
    flex: 1,
    justifyContent: "center",
  },
  selectedInnerContainer: {
    alignItems: "center",
    padding: 20,
  },
  selectedName: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  selectedDetails: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  selectedDetailsLine: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  vetoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  vetoContainerInner: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: 20,
  },
  vetoHeadline: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  vetoScrollViewContainer: {
    width: "94%",
    maxHeight: "50%",
  },
  vetoParticipantContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  vetoParticipantName: {
    fontSize: 24,
  },
  vetoButtonContainer: {
    width: "100%",
    alignItems: "center",
    paddingTop: 40,
  },
});

export default ChoiceScreen;
