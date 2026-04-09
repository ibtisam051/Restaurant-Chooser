import React, {useState} from "react";
import {View, Text, StyleSheet, ScrollView,Alert,Platform} from "react-native";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import CustomButton from "../../components/CustomButton";
import CustomTextInput from "../../components/CustomTextInput";
import {validateAddress, validateName, validatePhone, validateWebsite} from "./validators";

const AddScreen = ({navigation}) => {
    const [restaurant, setRestaurant] = useState({
        name: "",
        cuisine: "",
        price: "",
        rating: "",
        phone: "",
        address: "",
        website: "",
        delivery: "",
        key: `r_${Date.now()}`,
        errors:{},
    });

    const setField = (field, value) => {
        setRestaurant((prev) => ({
            ...prev,
            [field]: value,
            errors: {
                ...prev.errors,
                [field]: null,
            },
        }));
    };

    const validateAllFields = () => {
        const {name, address, phone, website, cuisine, price, rating, delivery} = restaurant;
        const errors = {
            name: validateName(name),
            address: validateAddress(address),
            phone: validatePhone(phone),
            website: validateWebsite(website),
            cuisine: cuisine ? null : "Cuisine is required",
            price: price ? null : "Price is required",
            rating: rating ? null : "Rating is required",
            delivery: delivery ? null : "Delivery option is required",
        };
        setRestaurant((prev) => ({
            ...prev,
            errors,
        }));
        return Object.values(errors).every((error) => error === null);
    };

    const saveRestaurant = async () => {
        if (validateAllFields()) {
            try {
                const existingData = await AsyncStorage.getItem("restaurants");
                const restaurants = existingData ? JSON.parse(existingData) : [];
                restaurants.push(restaurant);
                await AsyncStorage.setItem("restaurants", JSON.stringify(restaurants));
                Toast.show({
                    type: "success",
                    position: "bottom",
                    visibilityTime: 3000,
                    text1: "Restaurant Added",
                    text2: "The restaurant has been added successfully.",
                });
                navigation.navigate("RestaurantsList");
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    visibilityTime: 3000,
                    text1: "Error",
                    text2: "Failed to save the restaurant.",
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
                    value={restaurant.name}
                    onChangeText={(text) => setField("name", text)}
                    error={restaurant.errors.name}
                />
                <Text style={styles.fieldlabel}>Cuisine</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={restaurant.cuisine}
                        onValueChange={(value) => setField("cuisine", value)}
                        style={[styles.picker,restaurant.errors.cuisine ? {borderColor: "red"}:{}]}
                    >
                        <Picker.Item label="" value="" />
                        <Picker.Item label="American" value="American" />
                        <Picker.Item label="Chinese" value="Chinese" />
                        <Picker.Item label="Italian" value="Italian" />
                        <Picker.Item label="Mexican" value="Mexican" />
                        <Picker.Item label="Other" value="Other" />
                    </Picker>
                </View>
                {restaurant.errors.cuisine && <Text style={{color: "red", marginLeft: 10, marginBottom: 10}}>{restaurant.errors.cuisine}</Text>}

                <Text style={styles.fieldlabel}>Price</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={restaurant.price}
                        onValueChange={(value) => setField("price", value)}
                        style={[styles.picker,restaurant.errors.price ? {borderColor: "red"}:{}]}
                    >
                        <Picker.Item label="" value="" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                    </Picker>
                </View>
                {restaurant.errors.price && <Text style={{color: "red", marginLeft: 10, marginBottom: 10}}>{restaurant.errors.price}</Text>}
                <Text style={styles.fieldlabel}>Rating</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={restaurant.rating}
                        onValueChange={(value) => setField("rating", value)}
                        style={[styles.picker,restaurant.errors.rating ? {borderColor: "red"}:{}]}
                    >
                        <Picker.Item label="" value="" />
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                        <Picker.Item label="3" value="3" />
                        <Picker.Item label="4" value="4" />
                        <Picker.Item label="5" value="5" />
                    </Picker>
                </View>
                {restaurant.errors.rating && <Text style={{color: "red", marginLeft: 10, marginBottom: 10}}>{restaurant.errors.rating}</Text>}
                <CustomTextInput
                    label="Phone"
                    value={restaurant.phone}
                    onChangeText={(text) => setField("phone", text)}
                    error={restaurant.errors.phone}
                    keyboardType="phone-pad"
                />
                <CustomTextInput
                    label="Address"
                    maxLength={50}
                    value={restaurant.address}
                    onChangeText={(text) => setField("address", text)}
                    error={restaurant.errors.address}
                />
                <CustomTextInput
                    label="Website"
                    maxLength={50}
                    value={restaurant.website}
                    onChangeText={(text) => setField("website", text)}
                    error={restaurant.errors.website}
                    keyboardType="url"
                    autoCapitalize="none"
                />
                <Text style={styles.fieldlabel}>Delivery</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={restaurant.delivery}
                        onValueChange={(value) => setField("delivery", value)}
                        style={[styles.picker,restaurant.errors.delivery ? {borderColor: "red"}:{}]}
                    >
                        <Picker.Item label="" value="" />
                        <Picker.Item label="Yes" value="Yes" />
                        <Picker.Item label="No" value="No" />
                    </Picker>
                </View>
                {restaurant.errors.delivery && <Text style={{color: "red", marginLeft: 10, marginBottom: 10}}>{restaurant.errors.delivery}</Text>}   
                
                <View style={styles.addScreenButtonContainer}>
                    <CustomButton title="Cancel" onPress={() => navigation.goBack()} buttonStyle={styles.cancelButton} />
                    <CustomButton title="Save" onPress={saveRestaurant} buttonStyle={styles.saveButton} />
                </View>
            </View>
        </View>
    </ScrollView>
);
}

const styles = StyleSheet.create({
    AddScreenInnerContainer: {
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
        width: "100%",
    },
    addScreenFormContainer: {width: "96%"},
    fieldlabel: {
        marginLeft: 10,
    },
    pickerContainer: {
        ...Platform.select({
            ios: {},
            android: {
                width: "96%",
                borderRadius: 8,
                borderColor: "#c0c0c0",
                borderWidth: 2,
                marginLeft: 10,
                marginBottom: 20,
                marginTop: 4,
            },
        }),
    },
    picker: {
        ...Platform.select({
            ios: {
                width: "96%",
                borderRadius: 8,
                borderColor: "#c0c0c0",
                borderWidth: 2,
                marginLeft: 10,
                marginBottom: 20,
                marginTop: 4,
            },
            android: {},
        }),
    },
    addScreenButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        gap: 12,
    },
    cancelButton: {
        backgroundColor: "gray",
        flex: 1,
    },
    saveButton: {
        backgroundColor: "green",
        flex: 1,
    },
});
    
export default AddScreen;