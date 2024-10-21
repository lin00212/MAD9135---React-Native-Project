import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PeopleScreen from "./screens/PeopleScreen";
import AddPersonScreen from "./screens/AddPersonScreen";
import IdeaScreen from "./screens/IdeaScreen";
import AddIdeaScreen from "./screens/AddIdeaScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="People"
                    component={PeopleScreen}
                    options={({ navigation }) => ({
                        headerRight: () => (
                            <Button
                                title="Add Person"
                                onPress={() => navigation.navigate("Add Person")}
                                color="#2196F3"
                            />
                        ),
                    })}
                />
                <Stack.Screen name="Add Person" component={AddPersonScreen} />
                <Stack.Screen
                    name="Idea"
                    component={IdeaScreen}
                    options={({ navigation, route }) => ({
                        headerRight: () => (
                            <Button
                                title="Add Idea"
                                onPress={() => navigation.navigate("Add Idea", { personId: route.params.personId })}
                                color="#2196F3"
                            />
                        ),
                    })}
                />
                <Stack.Screen name="Add Idea" component={AddIdeaScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

