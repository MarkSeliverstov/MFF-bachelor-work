import fetch from 'node-fetch';
import { sourceDefinitionURL } from '../configuration';
import { InstanceModel } from '../model';

export async function getModel(): Promise<InstanceModel | null> {
    try {
        const res = await fetch(sourceDefinitionURL(), { method: 'GET' });

        if (!res.ok) {
            throw new Error(`Error ${res.status}, message: ${res.statusText}`);
        }

        const data: InstanceModel = await res.json();
        // console.info('Response from server:', data);
        return data;
    } catch (exc) {
        console.error('Error fetching model:', exc);
        return null;
    }
}


export function saveModel(model: InstanceModel) {
    fetch(sourceDefinitionURL(), {
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
