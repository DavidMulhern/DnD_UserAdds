import React, { Fragment, useState, useEffect } from 'react'
// Importing components.
import List from './List/List'
import store from '../utils/store'
// Import the API.
import StoreApi from '../utils/storeApi'
// Import UUID
import { v4 as uuid } from 'uuid'
// Components
import InputContainer from './Input/InputContainer'
// Styling
import { makeStyles } from '@material-ui/styles'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
//HTTP 
import axios from 'axios';


// The below component holds the Side menu and button components.
const useStyle = makeStyles((theme) => ({
    root: {
        // background: 'linear-gradient(to right, pink, pink)',
        display: 'flex',
        minHeight: "100vh",
        overflowY: 'auto',
    },
    rButton: {
        marginTop: '30%'
    },
}));

export default function AppX() {
    // Adding state.
    const [data, setData] = useState(store)


    //Use effect called every time there is a change to state. Performs GET for all cards and lists
    //on MongoDB when called. References only the most recent document in MongoDB
    useEffect(() => {
        //console.log("Use Effect Triggeredd")

        axios.get('http://localhost:8080/api/dnd')
            .then((response) => {
                //console.log(response.data[0].dndContent)
                setData(response.data[0].dndContent);
            })
            .catch(() => {
            });
    }, [data])



    // Styling var.
    const classes = useStyle();
    // Function to add more cards. Need to use UUID for this
    const addMoreCards = (title, listId) => {
        // Generate a unique ID 
        const newCardId = uuid();
        console.log('New card Id: ', newCardId)
        // Create a new card
        const newCard = {
            id: newCardId,
            title,
        };
        // Getting all lists from the state then the current list id of the one being worked on.
        const list = data.lists[listId];
        // Get whole list and append new card with spread operator.
        list.cards = [...list.cards, newCard]
        // Update the state.
        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: list,
            },
        };
       PostToDB(newState)
    };


    // Function to add more lists.
    const addMoreLists = (title) => {
        // Generate a unique list ID.
        const newListId = uuid();
        // New List var.
        const newList = {
            id: newListId,
            title,
            cards: [],
        };
        const newState = {
            listIds: [...data.listIds, newListId],
            lists: {
                ...data.lists,
                [newListId]: newList
            },
        };
        PostToDB(newState)
    };

    // Function to change list title.
    const updateListTitle = (title, listId) => {
        // Getting the list id of list text being altered.
        const list = data.lists[listId];
        list.title = title;

        // Update state.
        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: list,
            },
        };
        setData(newState);
        PostToDB(data);
    }

    //Function to handle drag and drop logic
    const onDragEnd = (result) => {
        // {where to, from where, ID}
        const { destination, source, draggableId, type } = result;

        // Move was not fully executed
        if (!destination) {
            return;
        }
        // Invalid drop
        if (type === 'list') {
            // Change list ID when swapping columns.
            const newListIds = data.listIds;
            newListIds.splice(source.index, 1);
            newListIds.splice(destination.index, 0, draggableId);
            console.log("push")
            return;
        }

        // Geting current state of list and what card is being moved.
        const sourceList = data.lists[source.droppableId];
        const destinationList = data.lists[destination.droppableId];
        const draggingCard = sourceList.cards.filter((card) => card.id === draggableId)[0];

        // A move happened in the same column
        if (source.droppableId === destination.droppableId) {
            // Moving to new locations
            sourceList.cards.splice(source.index, 1);
            destinationList.cards.splice(destination.index, 0, draggingCard)
            // Update the state. ******** POTENTIALLY, HERE FOR A STATE UPDATE ON DB ********
            const newState = {
                ...data,
                lists: {
                    ...data.lists,
                    [sourceList.id]: destinationList,
                },
            };
            PostToDB(newState);
        }

        // A move has happened into a different column.
        else {
            sourceList.cards.splice(source.index, 1);
            destinationList.cards.splice(destination.index, 0, draggingCard)
            // Update state.
            const newState = {
                ...data,
                lists: {
                    ...data.lists,
                    [sourceList.id]: sourceList,
                    [destinationList.id]: destinationList,
                },
            };
            PostToDB(newState);
        }

        
        
    };

    //On screen button, dont think it really does anything anymore
    const resetBoard = () => {
        console.log("reset pressed!");
        setData(data);
        window.location.reload(false);
    }

    //POST method being called in other methods on this page. Used to push changes up to the database
    function PostToDB(newState) {
        axios({
            url: 'http://localhost:8080/api/dnd',
            method: 'POST',
            data: newState
        })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<On screen button being used for testing related to persistance >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const checkConsole = () => {
        axios({
            url: 'http://localhost:8080/testing',
            method: 'GET'

        })
            .then((response) => {
                console.log('AppX / checkConsole() / .then()');

                console.log(response.data.length)


            })
            .catch(() => {
                console.log('AppX / checkConsole() / .catch() ERROR ERROR');
            });
    }
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<On screen button being used for testing related to persistance >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    return (
        // Provider allows us to pass values between components without having to pass props through every level of the tree! *Neat*
        <StoreApi.Provider value={{ addMoreCards, addMoreLists, updateListTitle }}>
            {/* Using react DnD. Declare this area and drag and drop */}
            {/*onDragEnd is an event that will call a function, we need to note changes once dragged to state*/}
            <DragDropContext onDragEnd={onDragEnd}>
                {/* Making the whole column droppable */}
                <Droppable droppableId='app' type="list" direction='horizontal'>
                    {(provided) => (
                        <div className={classes.root} ref={provided.innerRef} {...provided.droppableProps}
                        >
                            {/* Mapping through the store.js file, and retrieving the list by their id's, one at a time into list array */}
                            {data.listIds.map((listId, index) => {
                                const list = data.lists[listId]
                                return <List list={list} key={listId} index={index} />
                            })}
                            <InputContainer type="list" />
                            {provided.placeholder}
                            {<div className={classes.rButton}>
                                <button onClick={resetBoard}>Reset Board</button>
                            </div>}
                            {<div className={classes.rButton}>
                                <button onClick={checkConsole}>Check Console</button>
                            </div>}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </StoreApi.Provider>
    )
}