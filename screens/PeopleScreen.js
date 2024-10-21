import { useContext } from "react";
import {
    Button,
    FlatList,
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Swipeable, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import PeopleContext from "../PeopleContext";

export default function PeopleScreen() {
    const { people, deletePerson } = useContext(PeopleContext);
    const navigation = useNavigation();
    // add a render function to delete person
    const renderRightActions = (id) => (
        <TouchableOpacity
            onPress={() => deletePerson(id)}
            style={styles.deleteButton}
        >
            <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
    );

    // add a renderItem function to delete person
    const renderItem = ({ item }) => (
        <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <View style={styles.itemContainer}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <View style={{ flexDirection: "column" }}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.dob}>{item.dob}</Text>
                    </View>

                    <View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Idea", { personId: item.id })} // Corrected parameter name
                        >
                            <Image
                                source={require("../assets/TransmutationCircle.jpg")}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Swipeable>
    );

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={people}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        paddingHorizontal: 16,
    },
    itemContainer: {
        backgroundColor: "#fff",
        padding: 16,
        marginVertical: 8, // Space between each item
        // borderRadius: 8, // Rounded corners for items
        shadowColor: "#000", // Shadow for some elevation effect
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3, // Elevation for Android
    },
    name: {
        fontSize: 18, // Larger font size for name
        fontWeight: "bold", // Bold for emphasis
        color: "#333", // Darker color for contrast
    },
    dob: {
        fontSize: 14, // Smaller font for date of birth
        color: "#777", // Light gray for secondary info
        marginTop: 4, // Spacing between name and DOB
    },
    buttonContainer: {
        marginVertical: 16, // Space around the button
    },
    deleteButton: {
        backgroundColor: "#f23",
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        height: "82%",
        marginVertical: 8, // Space between each item
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        shadowColor: "#000", // Shadow for some elevation effect
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Elevation for Android
    },
    deleteText: {
        color: "#fff",
        fontWeight: "bold",
    },
    image: {
        width: 50, // Adjust the size as needed
        height: 50,
        borderRadius: 25, // Optional for circular images
    },
});


