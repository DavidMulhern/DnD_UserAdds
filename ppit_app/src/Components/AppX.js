import React, { useState, useEffect } from 'react'
// Importing components.
import List from './List/List'
import store from '../utils/store'
import Whiteboard from './WhiteBoard/WhiteBoard'
// Import the API.
import StoreApi from '../utils/storeApi'
// Import UUID
import { v4 as uuid } from 'uuid'
// Components
import InputContainer from './Input/InputContainer'
// Styling
import { makeStyles } from '@material-ui/styles'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
// CSS
import '../modals/modalDesign.css';
import { Button } from 'reactstrap'
// jwt decode imported
import jwt_decode from "jwt-decode";
// Importing a history hook.
import { useHistory } from 'react-router-dom';
// Global variable only used client side.
var current

// The below component holds the Side menu and button components.
const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: "100vh",
        overflowY: 'auto',
    },
    rButton: {
        marginTop: '2%',
        marginLeft: '2%'
    },
}));

export default function AppX() {
    // Adding state.
    const [data, setData] = useState(store)
    const [clean, setClean] = useState(store)
    // Styling var.
    const classes = useStyle();
    // Using history to determine where user came from.
    const history = useHistory()
    // Performing a check on user and token(s) when component mounts.
    useEffect(() => {
        // Getting token from local storage.
        const token = localStorage.getItem('token')
        if(token){
            // If found, decode.
            const user = jwt_decode(token)
            // If the user does not exist, remove the token.
            if(!user){
                localStorage.removeItem('token')
                history.replace('/login')
            }
        }
    }, []) 

    // Function to add more cards. Need to use UUID for this
    const addMoreCards = (title, listId) => {
        // Generate a unique ID 
        const newCardId = uuid();
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
        setData(newState)
        current = newState
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
        setData(newState)
        current = newState
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
        current = newState
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
            setData(newState)
            current = newState
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
            setData(newState)
            current = newState
        }
    };

    //Method to Delete a card from the local data
    const listDelete = (listId) => {
        var listCount = data.listIds.length
        //Parse all existing lists/columns
        for (var i = 0; i < listCount; i++) {
            //If the correct one is found, remove it
            if (data.listIds[i] == listId) {
                data.listIds.splice(i, 1)
                const newState = {
                    ...data
                };
                setData(newState)
                current = newState
            }
        }
    }

    //Method to Delete a card from the local data
    const cardDelete = (e, cardId, listId) => {
        var cardArray = data.lists[listId].cards
        //Parse cards array
        for (var i = 0; i < cardArray.length; i++) {
            //If required card is found, remove it
            if (cardArray[i].id == cardId) {
                cardArray.splice(i, 1)
                const newState = {
                    ...data
                };
                setData(newState)
                current = newState
            }
        }
    }

    //Method to update the content within a card from the local data
    const cardUpdate = (obj, index, cardId, listId) => {
        var cardArray = data.lists[listId].cards
        //Prase cards array of a specified column
        for (var i = 0; i < cardArray.length; i++) {
            //If the correct one is found, update its contents
            if (cardArray[i].id == cardId) {
                cardArray[i].title = obj
                const newState = {
                    ...data
                };
                setData(newState)
                current = newState
            }
        }
    }


    // ------------------------------------------ NEW 14.04 ---------------------------------------------------------------------

    //On screen button, dont think it really does anything anymore
    const resetBoard = () => {
        setData(clean);
        window.location.reload(false);
    }
    
    async function loadBoard() {
        const req = await fetch('http://localhost:8080/api/quote', {
        // Include this in the header
        headers: {
            'x-access-token': localStorage.getItem('token'),
        },
    })
    const data = await req.json()
        // Populate the quote variable if the data status returns 'ok'.
        if(data.status === 'ok'){
            // setQuote(data.quote)
            let obj = JSON.parse(data.quote)
            setData(obj);
            current = obj
        }
        else{
            alert(data.error)
        }
    }
    
        // Update quote function. Update the backend.
        async function updateBoard(){
            // Stringify the current board. Ready to send to DB
            var boardDetails = JSON.stringify(current)
            // event.preventDefault()
            const req = await fetch('http://localhost:8080/api/quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token'),
                },
                // Stringify the body for the post. JSON.stringify()
                body: JSON.stringify({
                    quote: boardDetails,
                }),
            })
            const data = await req.json()
            // Populate the quote variable if the data status returns 'ok'.
            if(data.status === 'ok'){
                setData(current)
            }
            else{
                alert(data.error)
            }
        }

        const whiteBoard = () => {
            setModal(!modal);
        }

        const [modal, setModal] = useState(false);

        //toggle represents the button to activate the Task Popup Modal
        const toggle = () => {
            console.log("change modal")
            setModal(!modal);
        }
    // ------------------------------------------ NEW 14.04 ---------------------------------------------------------------------


    return (
        // Provider allows us to pass values between components without having to pass props through every level of the tree! *Neat*
        <StoreApi.Provider value={{ addMoreCards, addMoreLists, updateListTitle }}>
            <div >
                <Button onClick={updateBoard} className={classes.rButton}>Save Table</Button>
                <Button onClick={loadBoard} className={classes.rButton}>Load Table</Button>
                <Button onClick={resetBoard} className={classes.rButton}>Reset Board</Button>
                <Button onClick={whiteBoard} className={classes.rButton}>WhiteBoard</Button>
                <Whiteboard modal={modal} toggle={toggle} />
            </div>
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
                                return <List list={list} key={listId} index={index} listDelete={listDelete} cardDelete={cardDelete} cardUpdate={cardUpdate} />
                            })}
                            <InputContainer type="list" />
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </StoreApi.Provider>
    )
}