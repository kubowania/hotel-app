const fetch = require('node-fetch')

exports.handler = async function () {
    const query = `
            query {
          hotel_data {
            values {
              id
              name,
              rating
            }
          }
        }
    `

    const url = process.env.ENDPOINT
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-cassandra-token': process.env.ASTRA_TOKEN
        },
        body: JSON.stringify({ query })
    }
    const response = await fetch(url, options)


    try {
        const responseBody = await response.json()
        return {
            statusCode: 200,
            body: JSON.stringify(responseBody)
        }
    } catch (e) {
        console.log(e)
        return {
            statusCode: 500,
            body: JSON.stringify(e)
        }
    }
}

