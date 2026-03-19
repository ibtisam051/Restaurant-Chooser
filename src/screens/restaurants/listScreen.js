import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton';
import Toast from 'react-native-toast-message';

const ListScreen = ({ navigation }) => {
    const [restaurants, setRestaurants] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchRestaurants = async () => {
                const data = await AsyncStorage.getItem('restaurants');
                if (data) {
                    setRestaurants(JSON.parse(data));
                }
            };

            fetchRestaurants();
        }, [])
    );

    const deleteRestaurant = async (id) => {
        Alert.alert(
            'Delete Restaurant',
            'Are you sure you want to delete this restaurant?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        const updatedRestaurants = restaurants.filter((r) => r.key !== id);
                        setRestaurants(updatedRestaurants);
                        await AsyncStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
                        Toast.show({
                            type: 'success',
                            position: 'bottom',
                            visibilityTime: 2000,
                            text1: 'Restaurant deleted successfully'
                        });
                    }
                }
            ]
        );
    };
    return (
        <View style={styles.container}>
            <CustomButton title="Add Restaurant" onPress={() => navigation.navigate('RestaurantsAdd')} />
            <FlatList
                data={restaurants}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <View style={styles.restaurantItem}>
                        <Text style={styles.text}>{item.name}</Text>
                        <CustomButton title="Delete" onPress={() => deleteRestaurant(item.key)}
                        buttonStyle={styles.deleteButton}
                        />
                        </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    restaurantItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    text: {
        fontSize: 18,
    },
    deleteButton: {
        backgroundColor: 'red',
    }
});
export default ListScreen;