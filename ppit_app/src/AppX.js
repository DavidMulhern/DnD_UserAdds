import React, { useState } from 'react'
// Importing components.
import List from './Components/List/List'
import store from './utils/store'
// Import the API.
import StoreApi from './utils/storeApi'
// Import UUID
import {v4 as uuid} from 'uuid'
// Components
import InputContainer from './Components/Input/InputContainer'
// Styling
import { makeStyles } from '@material-ui/styles'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const useStyle = makeStyles((theme) =>({
    root:{
        display: 'flex',
        minHeight: "100vh",
        overflowY: 'auto',
    },
}));

export default function AppX() {
    // Adding state.
    const [data, setData] = useState(store)
    // Styling var.
    const classes = useStyle();
    // Function to add more cards. Need to use UUID for this
    const addMoreCards = ( title, listId ) => {
        // Generate a unique ID 
        const newCardId = uuid();
        // Create a new card
        const newCard = {
            id:newCardId,
            title,
        };
        // Getting all lists from the state then the current list id of the one being worked on.
        const list = data.lists[listId];
        // Get whole list and append new card with spread operator.
        list.cards = [...list.cards,newCard]
        // Update the state.
        const newState = {
            ...data,
            lists:{
                ...data.lists,
                [listId]: list,
            },
        };
        setData(newState);
    };

    // Function to add more lists.
    const addMoreLists = (title) => {
        // Generate a unique list ID.
        const newListId = uuid();
        // New List var.
        const newList = {
            id:newListId,
            title,
            cards:[],
        };
        const newState = {
            listIds:[...data.listIds,newListId],
            lists:{
                ...data.lists,
                [newListId]:newList
            },
        };
        setData(newState);
    };

    // Function to change title.
    const updateListTitle = (title, listId) => {
        // Getting the list id of list text being altered.
        const list = data.lists[listId];
        list.title = title;

        // Update state.
        const newState = {
            ...data,
            lists:{
                ...data.lists,
                [listId]:list,
            },
        };
        setData(newState);
    }

    const onDragEnd = (result) => {
        // {where to, from where, ID}
        const {destination, source, draggableId, type } = result;

        // Move was not fully executed
        if(!destination)
        {
            return;
        }
        // Invalid drop
        if (type === 'list')
        {
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
        if(source.droppableId === destination.droppableId)
        {
            // Moving to new locations
            sourceList.cards.splice(source.index, 1);
            destinationList.cards.splice(destination.index, 0, draggingCard)
            // Update the state. ******** POTENTIALLY, HERE FOR A STATE UPDATE ON DB ********
            const newState ={
                ...data,
                lists:{
                    ...data.lists,
                    [sourceList.id]:destinationList,
                },
            };
            setData(newState);
        }
        // A move has happened into a different column.
        else
        {
            sourceList.cards.splice(source.index,1);
            destinationList.cards.splice(destination.index,0,draggingCard)
            // Update state.
            const newState ={
                ...data,
                lists:{
                    ...data.lists,
                    [sourceList.id]: sourceList,
                    [destinationList.id]: destinationList,
                },
            };
            setData(newState);
        }
    };

    return(
        // Provider allows us to pass values between components without having to pass props through every level of the tree! *Neat*
        <StoreApi.Provider value={{ addMoreCards, addMoreLists, updateListTitle }}>
            {/* Using react DnD. Declare this area and drag and drop */}
            {/*onDragEnd is an event that will call a function, we need to note changes once dragged to state*/}
            <DragDropContext onDragEnd={onDragEnd}>
                {/* Making the whole column droppable */}
                <Droppable droppableId='app' type="list" direction='horizontal'>
                    {(provided)=>(
                        <div className={classes.root} ref={provided.innerRef} {...provided.droppableProps}>
                            {/* Mapping through the store.js file, and retrieving the list by their id's, one at a time into list array */}
                            {data.listIds.map((listId, index)=> {
                                const list = data.lists[listId]
                                return <List list={list} key={listId} index={index}/>
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