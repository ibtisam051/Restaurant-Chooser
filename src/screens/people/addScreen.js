import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import { validateName, validatePhone, validateEmail } from "./validators";

const AddScreen = ({ navigation }) => {
    const [person, setPerson] = useState({
        name: "",
        phone: "",
        email: "",
        key: `p_${Date.now()}`,
        errors: {},
    });

    const setField = (field, value) => {
        setPerson((prev) => ({
            ...prev,
            [field]: value,
            errors: {
                ...prev.errors,
                [field]: null,
            },
        }));
    };

    const validateAllFields = () => {
        const { name, phone, email } = person;
        const errors = {
            name: validateName(name),
            phone: validatePhone(phone),
            email: validateEmail(email),
        };
        setPerson((prev) => ({
            ...prev,
            errors,
        }));
        return Object.values(errors).every((error) => error === null);
    };

    const savePerson = async () => {
        if (validateAllFields()) {
            try {
                const existingData = await AsyncStorage.getItem("people");
                const people = existingData ? JSON.parse(existingData) : [];
                people.push(person);
                await AsyncStorage.setItem("people", JSON.stringify(people));
                Toast.show({
                    type: "success",
                    position: "bottom",
                    visibilityTime: 3000,
                    text1: "Person Added",
                    text2: "The person has been added successfully.",
                });
                navigation.navigate("PeopleList");
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    visibilityTime: 3000,
                    text1: "Error",
                    text2: "Failed to save the person.",
                });
            }
        }
    };

    return (
        <ScrollView>
            <View style={styles.AddScreenInnerContainer}>
                <View style={styles.addScreenFormContainer}>
                    <CustomTextInput
                        label="Name"
                        value={person.name}
                        onChangeText={(text) => setField("name", text)}
                        error={person.errors.name}
                    />
                    <CustomTextInput
                        label="Phone"
                        value={person.phone}
                        onChangeText={(text) => setField("phone", text)}
                        error={person.errors.phone}
                    />
                    <CustomTextInput
                        label="Email"
                        value={person.email}
                        onChangeText={(text) => setField("email", text)}
                        error={person.errors.email}
                    />
                    <CustomButton title="Save Person" onPress={savePerson} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    AddScreenInnerContainer: {
        flex: 1,
        padding: 20,
    },
    addScreenFormContainer: {
        marginBottom: 20,
    },
});

export default AddScreen;