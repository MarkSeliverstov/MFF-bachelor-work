import { useQuasar } from 'quasar'

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
    timeout: 1000
  })
}
