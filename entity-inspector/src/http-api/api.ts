import fetch from 'node-fetch';
import { serverURL } from '../configuration';

const modelURL = `${serverURL}/model`;

export function getModel() {
    fetch(modelURL, { 
        method: 'GET'
    }).then(res => {
        if (!res.ok) {
            throw new Error(`Error ${res.status}, message: ${res.statusText}`);
        }
        res.json().then(data => {
            console.info('Response from server:', data);
            return data;
        });
    }).catch(exc => {
        console.error('Error fetching model:', exc);
        throw exc;
    });
}


export function saveModel(model: string) {
    fetch(modelURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(model)
    }).then( res => {
        if (!res.ok) {
            throw new Error(`Server responded with status: ${res.status}`);
        }
        console.log("Model was succesfully saved in DB");
    }).catch( exc => {
        console.error('Error fetching model:', exc);
        throw exc;
    });
}
