import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    TextInput,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useNavigation, useRoute } from "@react-navigation/native";
import { randomUUID } from "expo-crypto";
import PeopleContext from "../PeopleContext";

export default function AddIdeaScreen() {
    const [hasPermission, requestPermission] = useCameraPermissions();
    const [cameraRef, setCameraRef] = useState(null);
    const [facing, setFacing] = useState("back");
    const [photo, setPhoto] = useState(null);
    const [text, setText] = useState("");
    const { saveIdea } = useContext(PeopleContext);
    const navigation = useNavigation();
    const route = useRoute();
    const personId = route.params?.personId; // Get the person's ID from the route params

    // Request camera permission
    if (hasPermission === null) {
        return <View />;
    }

    // If permission is not granted
    if (!hasPermission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>Need camera permission</Text>
                <TouchableOpacity
                    style={styles.permissionButton}
                    onPress={requestPermission}
                >
                    <Text style={styles.permissionText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Function to take a picture and handle the photo URI
    const takePicture = async () => {
        if (cameraRef) {
            const data = await cameraRef.takePictureAsync();
            setPhoto(data.uri); // Set the photo URI to display
        }
    };

    function toggleCameraFacing() {
        setFacing((current) => (current === "back" ? "front" : "back"));
    }

    // Save the idea and navigate back to the person's ideas
    const saveIdeaAndNavigate = async () => {
        if (text && photo) {
            const idea = {
                id: randomUUID(),
                text,
                image: photo,
                width: 500,
                height: 500,
            };
            await saveIdea(personId, idea);
            navigation.navigate("Idea", { personId, newIdea: idea });
        } else {
            Alert.alert("Please add a text and a photo first!");
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.container}>
                    {!photo ? (
                        <CameraView
                            style={styles.camera}
                            facing={facing}
                            ref={(ref) => setCameraRef(ref)}
                        >
                            <View style={styles.cameraContainer}>
                                <TouchableOpacity
                                    style={styles.flipButton}
                                    onPress={toggleCameraFacing}
                                >
                                    <Text style={styles.captureText}> Flip </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.captureButton}
                                    onPress={takePicture}
                                >
                                    <Text style={styles.captureText}> Take Picture </Text>
                                </TouchableOpacity>
                            </View>
                        </CameraView>
                    ) : (
                        // If a photo is taken, display the preview
                        <View style={styles.previewContainer}>
                            <Image source={{ uri: photo }} style={styles.imagePreview} />

                            <TextInput
                                style={styles.input}
                                placeholder="Enter your idea"
                                value={text}
                                onChangeText={setText}
                            />
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.retakeButton}
                                    onPress={() => setPhoto(null)}
                                >
                                    <Text style={styles.retakeText}> Retake </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.saveButton}
                                    onPress={saveIdeaAndNavigate}
                                >
                                    <Text style={styles.saveText}> Save </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => navigation.navigate("Idea", { personId })}
                                >
                                    <Text style={styles.cancelText}> Cancel </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        padding: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    cameraContainer: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 20,
    },
    camera: {
        flex: 1,
    },
    message: {
        fontSize: 18,
        color: "#333",
        marginBottom: 20,
        textAlign: "center",
    },
    permissionButton: {
        backgroundColor: "blue",
        padding: 10,
        margin: 20,
        borderRadius: 10,
    },
    permissionText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
    },
    flipButton: {
        alignSelf: "flex-end",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
    },
    flipText: {
        fontSize: 18,
        color: "black",
    },
    captureButton: {
        alignSelf: "flex-end",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
    },
    captureText: {
        fontSize: 18,
        color: "black",
    },
    retakeButton: {
        alignSelf: "flex-end",
        alignItems: "center",
        backgroundColor: "#2196F3",
        borderRadius: 10,
        padding: 15,
        marginBottom: 30,
        marginHorizontal: 10,
    },
    retakeText: {
        color: "white",
        fontSize: 18,
    },
    saveButton: {
        alignSelf: "flex-end",
        alignItems: "center",
        backgroundColor: "#4CAF50",
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 30,
    },
    saveText: {
        color: "white",
        fontSize: 18,
    },
    cancelButton: {
        alignSelf: "flex-end",
        alignItems: "center",
        backgroundColor: "red",
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 10,
        marginBottom: 30,
    },
    cancelText: {
        color: "white",
        fontSize: 18,
    },
    previewContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imagePreview: {
        width: "100%",
        height: "40%",
        resizeMode: "contain",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        width: "80%",
        borderRadius: 10,
        backgroundColor: "#fff",
    },
});