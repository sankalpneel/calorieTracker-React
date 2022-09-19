import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Container, Modal } from 'react-bootstrap';
import Entry from './single-entry.component'

const Entries = () => {

    const [entries, setEntries] = useState([])
    const [refreshData, setRefreshData] = useState(false)
    const [changeEntry, setChangeEntry] = useState({ "change": false, "id": 0 })
    const [changeIngredient, setChangeIngredient] = useState({ "change": false, "id": 0 })
    const [newIngredientName, setNewIngredientName] = useState("")
    const [addNewEntry, setAddNewEntry] = useState(false)
    const [newEntry, setNewEntry] = useState({ "dish": "", "ingredients": "", "calories": "0", "fat": 0 })

    const HOSTURL = "http://localhost:8000"

    useEffect(() => {
        getAllEntries();
    }, [])

    if (refreshData) {
        setRefreshData(false);
        getAllEntries();
    }

    return (
        <div>
            <Container>
                <Button onClick={() => setAddNewEntry(true)}>Add Meal</Button>
            </Container>
            <Container>
                {entries != null && entries.map((entry, i) => (
                    <Entry entryData={entry} deleteSingleEntry={deleteSingleEntry} setChangeIngredient={setChangeIngredient} setChangeEntry={setChangeEntry} />
                ))}
            </Container>

            <Modal show={addNewEntry} onHide={() => setAddNewEntry(false)} centred>
                <Modal.Header closeButton>
                    <Modal.Title>Add Calorie Entry</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group>
                        <Form.Label>dish</Form.Label>
                        <Form.Control onChange={(event) => { newEntry.dish = event.target.value }}></Form.Control>

                        <Form.Label>ingredient</Form.Label>
                        <Form.Control onChange={(event) => { newEntry.ingredients = event.target.value }}></Form.Control>

                        <Form.Label>calories</Form.Label>
                        <Form.Control onChange={(event) => { newEntry.calories = event.target.value }}></Form.Control>

                        <Form.Label>fat</Form.Label>
                        <Form.Control onChange={(event) => { newEntry.fat = event.target.value }}></Form.Control>

                    </Form.Group>
                    <Button onClick={() => {
                        console.log(newEntry)
                        addSingleEntry()
                    }}>Add</Button>
                    <Button onClick={() => setAddNewEntry(false)}>Cancel</Button>

                </Modal.Body>

            </Modal>

            <Modal show={changeIngredient.change} onHide={() => setChangeIngredient({ "change": false, "id": 0 })} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Ingredients</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>new ingredient</Form.Label>
                        <Form.Control onChange={(event) => { setNewIngredientName(event.target.value) }}></Form.Control>
                    </Form.Group>
                    <Button onClick={() => changeIngredientForEntry()}>Change</Button>
                    <Button onClick={() => setChangeIngredient({ "change": false, "id": 0 })}>Cancel</Button>

                </Modal.Body>
            </Modal>


            <Modal show={changeEntry.change} onHide={() => setChangeEntry({ "change": false, "id": 0 })} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Dish</Form.Label>
                        <Form.Control onChange={(event) => { newEntry.dish = event.target.value }}></Form.Control>

                        <Form.Label>Ingredients</Form.Label>
                        <Form.Control onChange={(event) => { newEntry.ingredients = event.target.value }}></Form.Control>

                        <Form.Label>calories</Form.Label>
                        <Form.Control onChange={(event) => { newEntry.calories = event.target.value }}></Form.Control>

                        <Form.Label>fat</Form.Label>
                        <Form.Control type="number" onChange={(event) => { newEntry.fat = parseFloat(event.target.value) }}></Form.Control>
                    </Form.Group>
                    <Button onClick={() => changeSingleEntry()}>Change</Button>
                    <Button onClick={() => setChangeEntry({ change: false, "id": 0 })}>Cancel</Button>
                </Modal.Body>
            </Modal>
        </div >
    )




    function changeIngredientForEntry() {
        changeIngredient.change = false
        var url = HOSTURL + "/ingredient/update/" + changeIngredient.id
        console.log(newIngredientName)
        axios.put(url, {
            "ingredients": newIngredientName
        }).then(response => {
            console.log(response.status)
            if (response.status == 200) {
                setRefreshData(true)
            }
        })
    }


    function changeSingleEntry() {
        changeEntry.change = false;
        console.log(newEntry)
        var url = HOSTURL + "/entry/update/" + changeEntry.id
        axios.put(url, newEntry)
            .then(response => {
                if (response.status == 200) {
                    setRefreshData(true)
                }
            })
    }


    function addSingleEntry() {
        //console.log(newEntry)
        setAddNewEntry(false)
        var url = HOSTURL + "/entry/create"
        axios.post(url, {
            "ingredients": newEntry.ingredients,
            "dish": newEntry.dish,
            "calories": newEntry.calories,
            "fat": parseFloat(newEntry.fat)
        }).then(response => {
            if (response.status == 200) {
                setRefreshData(true)
            }
        })
    }


    function deleteSingleEntry(id) {
        var url = HOSTURL + "/entry/delete/" + id
        axios.delete(url, {

        }).then(response => {
            if (response.status == 200) {
                setRefreshData(true)
            }
        })
    }


    function getAllEntries() {
        var url = HOSTURL + "/entries"
        axios.get(url, {
            responseType: 'json'
        }).then(response => {
            if (response.status == 200) {
                setEntries(response.data)
            }
        })
    }
}

export default Entries