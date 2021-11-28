import React, {useState} from 'react';
import {Col, Row, Form, FormGroup, Input, Label, Container, Button} from 'reactstrap';
import Result from './Result.js';

const Weather = () => {
    const baseUrl = "https://api.weatherapi.com/v1/current.json?";

    const [data, setData] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [location, setLocation] = useState('');

    const getWeather = () => {
        const params = new URLSearchParams({
            q: location,
            key: apiKey
        });
        fetch(baseUrl + params)
            .then(response => response.json())
            .then(data => {
                console.log("out", data);
                setData(data);
                document.getElementById("result").style.display="block";
            })
            .catch(error => alert("Error " + error));
    }

    return (
        <div>
            <Container>
                <Row className="mt-5">
                    <Col xs="6">
                        <Form>
                            <FormGroup>
                                <Label for="apiKey">
                                    weatherapi.com key:
                                </Label>
                                <Input
                                    id="apiKey"
                                    name="apiKey"
                                    type="text"
                                    onChange={e => setApiKey(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="location">
                                    Location:
                                </Label>
                                <Input
                                    id="location"
                                    name="location"
                                    type="text"
                                    onChange={e => setLocation(e.target.value)}
                                />
                            </FormGroup>
                            <Button 
                                color="primary"
                                id="btnGo"
                                onClick={getWeather}
                            >
                                Go!
                            </Button>
                        </Form>
                    </Col>
                    <Col>
                        {data !== '' && <Result data={data}/>}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Weather;