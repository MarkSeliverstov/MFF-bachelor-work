import fetch from 'node-fetch'
import { serverURL } from '../configuration'
import { InstanceModel } from '../model'

const modelUrl = () => serverURL() + '/model'
const annotationsUrl = () => serverURL() + '/annotations'
const cmpItemsUrl = () => modelUrl() + '/complition-items'
const goodKey = '123456789'
// const wrong_key = '1234567890'

export async function getModel(): Promise<InstanceModel | null> {
  try {
    const res = await fetch(modelUrl(), {
      method: 'GET',
    })

    if (!res.ok) {
      throw new Error(`Error ${res.status}, message: ${res.statusText}`)
    }

    const data: InstanceModel = await res.json()
    // console.info('Response from server:', data);
    return data
  } catch (exc) {
    console.log(`Error fetching model via ${modelUrl()}:`)
    return null
  }
}

export function saveModel(model: any): void {
  const reqEntity = {
    authorizedKey: goodKey,
    model: model,
  }
  fetch(modelUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqEntity),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`)
      }
      console.log('Model was succesfully saved in DB')
    })
    .catch(() => {
      console.log('Seerror fetching model')
    })
}

export function getCmpFromServer(currLine: string): string[] {
  fetch(cmpItemsUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(currLine),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`)
      }
      console.log('HELLO')
      res.json().then((items) => {
        console.log(`Received ${items.length} cmp items from server`)
        return items
      })
    })
    .catch(() => {
      console.log('Server Error when fetching CMP items')
    })
  return []
}

export async function getCmpFromServerAsync(currLine: string): Promise<string[]> {
  try {
    const res = await fetch(cmpItemsUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currLine),
    })

    if (!res.ok) {
      throw new Error(`Server responded with status: ${res.status}`)
    }

    const items = await res.json()
    console.log(`Received ${items.length} cmp items from server`)
    return items
  } catch (exc) {
    console.log('Server Error when fetching CMP items')
    throw exc // Rethrow or handle as needed
  }
}

export async function getAnnotations(): Promise<any> {
  try {
    const res = await fetch(annotationsUrl(), {
      method: 'GET',
    })

    if (!res.ok) {
      throw new Error(`Error ${res.status}, message: ${res.statusText}`)
    }

    const data: any = await res.json()
    // console.info('Response from server:', data);
    return data
  } catch (exc) {
    console.log(`Error fetching model via ${modelUrl()}:`)
    return null
  }
}

export function saveAnnotations(annotations: any): void {
  const reqEntity = {
    authorizedKey: goodKey,
    annotations: annotations,
  }
  fetch(annotationsUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqEntity),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`)
      }
      console.log('Annotations were succesfully saved in DB')
    })
    .catch(() => {
      console.log('Seerror fetching model')
    })
}
