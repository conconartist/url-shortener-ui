export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const postUrl = (long_url, title) => {
  const data = {long_url: long_url, title: title}
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then((data) => {
    console.log('Success:', data)
  
  })
  .catch((error) => {
    console.log('Error:', data)
  })
}
