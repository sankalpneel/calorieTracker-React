import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'


const Entry = ({ entryData, setChangeIngredient, deleteSingleEntry, setChangeEntry }) => {
    return (
        <Card>
            <Row>
                <Col>Dish:{entryData != undefined && entryData.dish}</Col>
                <Col>Ingredients:{entryData != undefined && entryData.ingredients}</Col>
                <Col>Calories:{entryData != undefined && entryData.calories}</Col>
                <Col>Fat:{entryData != undefined && entryData.fat}</Col>

                <Col><Button onClick={() => deleteSingleEntry(entryData._id)}> Delete entry</Button></Col>
                <Col><Button onClick={() => changeIngredient()}> Change ingredients</Button></Col>
                <Col><Button onClick={() => changeEntry()}> Change entry</Button></Col>

            </Row>
        </Card>
    )

    function changeIngredient() {
        setChangeIngredient(
            {
                "change": true,
                "id": entryData._id
            }
        )
    }

    function changeEntry() {
        setChangeEntry(
            {
                "change": true,
                "id": entryData._id
            }
        )
    }
}


export default Entry