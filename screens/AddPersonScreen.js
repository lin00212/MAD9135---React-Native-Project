import React, { useContext, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import PeopleContext from "../PeopleContext";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import DatePicker from "react-native-modern-datepicker";


export default function AddPersonScreen() {
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");

    // const [selectedDate, setSelectedDate] = useState("");

    const { addPerson } = useContext(PeopleContext);
    const navigation = useNavigation();




    const savePerson = () => {
        if (name && dob) {
            addPerson(name, dob);
            navigation.goBack();
        }
    };
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <DatePicker
                    onSelectedChange={(selectedDate) => {
                        // Update the dob state when a date is selected, sort it to match the format
                        setDob(selectedDate.replace(/\//g, "-"));
                    }}
                    options={{
                        backgroundColor: "#f8f8f8",
                        textHeaderColor: "#3f51b5",
                        textDefaultColor: "#333",
                        selectedTextColor: "#f8f8f8",
                        mainColor: "#3f32b2", //arrows
                        textSecondaryColor: "#333", //day of week text color
                        borderColor: "#f8f8f8",
                    }}
                    style={{
                        marginBottom: 16, // Adds space below the date picker
                    }}
                    selected={dob} // Bind the dob state to the DatePicker
                    maximumDate={new Date().toISOString().split("T")[0]} // Max date is today's date
                    mode="calendar"
                />



                <View style={styles.buttonContainer}>


                    <Button title="Save" onPress={savePerson} />
                    <View style={styles.buttonSpacing} />
                    <Button title="Cancel" onPress={() => navigation.goBack()} />
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f8f8f8",
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
        backgroundColor: "#fff",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttonSpacing: {
        width: 16,
    },
});

