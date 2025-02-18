import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";

const PeopleContext = createContext();

export const PeopleProvider = ({ children }) => {
    const [people, setPeople] = useState([]);

    const STORAGE_KEY = "people";

    // Load people from AsyncStorage
    useEffect(() => {
        const loadPeople = async () => {
            const savedPeople = await AsyncStorage.getItem(STORAGE_KEY);
            if (savedPeople) setPeople(JSON.parse(savedPeople));
            console.log("Loaded people:", savedPeople);
        };
        loadPeople();
    }, []);

    const addPerson = async (name, dob) => {
        const newPerson = {
            id: randomUUID(),
            name,
            dob,
            ideas: [],
        };
        const updatedPeople = [...people, newPerson];
        console.log("Updated people after adding:", updatedPeople);
        setPeople(updatedPeople);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
    };

    const deletePerson = async (id) => {
        const updatedPeople = people.filter((person) => person.id !== id);
        setPeople(updatedPeople);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
    };

    const saveIdea = async (personId, idea) => {
        const updatedPeople = people.map((person) => {
            if (person.id === personId) {
                return {
                    ...person,
                    ideas: [...person.ideas, idea],
                };
            }
            return person;
        });
        setPeople(updatedPeople);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
    };

    const getIdeaForPerson = async (personId) => {
        try {
            const person = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
            return person.filter((person) => person.id === personId)[0].ideas;
        } catch (error) {
            console.error("Failed to fetch ideas", error);
            return [];
        }
    };

    const deleteIdea = async (ideaId, personId) => {
        try {
            const ideas = await getIdeaForPerson(personId);
            console.log("checkpoint 1, ideas", ideas);
            const updatedIdeas = ideas.filter((idea) => idea.id !== ideaId);
            console.log("checkpoint 2", updatedIdeas);
            const updatedPeople = people.map((person) => {
                if (person.id === personId) {
                    return {
                        ...person,
                        ideas: updatedIdeas,
                    };
                }
                return person;
            });
            setPeople(updatedPeople);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
        } catch (error) {
            console.error("Failed to delete idea", error);
        }
    };

    return (
        <PeopleContext.Provider value={{ people, addPerson, deletePerson, saveIdea, deleteIdea }}>
            {children}
        </PeopleContext.Provider>
    );
};

export default PeopleContext;









// import React, { createContext, useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { randomUUID } from "expo-crypto";


// const PeopleContext = createContext();

// export const PeopleProvider = ({ children }) => {
//     const [people, setPeople] = useState([]);

//     const STORAGE_KEY = "people";

//     // Load people from AsyncStorage
//     useEffect(() => {
//         const loadPeople = async () => {
//             const savedPeople = await AsyncStorage.getItem(STORAGE_KEY);
//             if (savedPeople) setPeople(JSON.parse(savedPeople));
//         };
//         loadPeople();
//         console.log(people);
//     }, []);


//     const addPerson = async (name, dob) => {
//         const newPerson = {
//             id: randomUUID(),
//             name,
//             dob,
//             ideas: [],
//         };
//         const updatedPeople = [...people, newPerson];
//         console.log(updatedPeople);
//         setPeople(updatedPeople);
//         await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
//     };


//     // add function to delete person

//     const deletePerson = async (id) => {
//         const updatedPeople = people.filter((person) => person.id !== id);
//         setPeople(updatedPeople);
//         await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
//     }

//     // add function to save idea

//     const saveIdea = async (personId, idea) => {
//         const updatedPeople = people.map((person) => {
//             if (person.id === personId) {
//                 return {
//                     ...person,
//                     ideas: [...person.ideas, idea],
//                 };
//             }
//             return person;
//         });
//         setPeople(updatedPeople);
//         await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
//     }

//     // define getIdeaForPerson function

//     const getIdeaForPerson = async (personId) => {
//         try {
//             const person = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
//             return person.filter((person) => person.id === personId)[0].ideas;
//         } catch (error) {
//             console.error("Failed to fetch ideas", error);
//             return [];
//         }
//     };


//     // add function to delete idea

//     const deleteIdea = async (ideaId, personId) => {
//         try {
//             const ideas = await getIdeaForPerson(personId);
//             console.log("checkpoint 1, ideas", ideas);
//             const updatedIdeas = ideas.filter((idea) => idea.id !== ideaId);
//             console.log("checkpoint 2", updatedIdeas);
//             const updatedPeople = people.map((person) => {
//                 if (person.id === personId) {
//                     return {
//                         ...person,
//                         ideas: updatedIdeas,
//                     };
//                 }
//                 return person;
//             });
//             setPeople(updatedPeople);

//             await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPeople));
//         } catch (error) {
//             console.error("Failed to delete idea", error);
//         }
//     };

//     return (
//         <PeopleContext.Provider value={{ people, addPerson, deletePerson, saveIdea, deleteIdea }}>
//             {children}
//         </PeopleContext.Provider>
//     );

// };

// export default PeopleContext;
