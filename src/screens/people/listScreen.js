import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/CustomButton';
import Toast from 'react-native-toast-message';

const ListScreen = ({ navigation }) => {
    const [people, setPeople] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchPeople = async () => {
                const data = await AsyncStorage.getItem('people');
                if (data) {
                    setPeople(JSON.parse(data));
                }
            };

            fetchPeople();
        }, [])
    );

    const deletePerson = async (id) => {
        Alert.alert(
            'Delete Person',
            'Are you sure you want to delete this person?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: async () => {
                        const updatedPeople = people.filter((p) => p.key !== id);
                        setPeople(updatedPeople);
                        await AsyncStorage.setItem('people', JSON.stringify(updatedPeople));
                        Toast.show({
                            type: 'success',
                            position: 'bottom',
                            visibilityTime: 2000,
                            text1: 'Person deleted successfully'
                        });
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <CustomButton title="Add Person" onPress={() => navigation.navigate('PeopleAdd')} />
            <FlatList
                data={people}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <View style={styles.personItem}>
                        <Text style={styles.text}>{item.name}</Text>
                        <CustomButton title="Delete" onPress={() => deletePerson(item.key)}
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
    personItem: {
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