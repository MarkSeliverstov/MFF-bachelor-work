import { useQuasar } from 'quasar'
import Ajv from 'ajv'

export async function fetchData(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    this.error_notify('Failed to fetch data')
  }
}

export function error_notify(message) {
  const $q = useQuasar()
  $q.notify({
    color: 'red',
    message: message,
    position: 'top-right',
    icon: 'error',
    timeout: 2000
  })
}

export function success_notify(message) {
  const $q = useQuasar()
  $q.notify({
    color: 'green',
    message: message,
    position: 'top-right',
    icon: 'check',
    timeout: 1000
  })
}

export function isValidJsonSchema(data, schema) {
  const ajv = new Ajv()
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return ajv.errorsText(valid.errors)
  }
  return null
}
