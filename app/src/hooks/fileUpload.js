

const apiUrl = process.env.API_URL

const formData = new FormData();
formData.append('file', yourFile); // from <input type="file" />

fetch(`http://${apiUrl}/upload-xlsx`, {
    method: 'POST',
    body: formData,
})
    .then(res => res.json())
    .then(data => console.log(data));
