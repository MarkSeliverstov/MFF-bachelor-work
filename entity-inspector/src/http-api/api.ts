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

interface RequestEntity{
    authorizedKey: string;
    model: InstanceModel
}

const good_key = "123456789";
const wrong_key = "1234567890";


export function saveModel(model: InstanceModel) {
    const reqEntity: RequestEntity = {
        authorizedKey: good_key,
        model: model
    };
    fetch(sourceDefinitionURL(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqEntity) 
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
