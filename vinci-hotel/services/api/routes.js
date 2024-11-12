const APIPort = 8080

const baseUrl = `http://localhost:${APIPort}`

const roomsUrl = `${baseUrl}/rooms`
const reservationsUrl = `${baseUrl}/reservations`
const servicesUrl = `${baseUrl}/services`
const financeUrl = `${baseUrl}/finance`

export {roomsUrl, reservationsUrl, servicesUrl, financeUrl}
