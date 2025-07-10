

//The is roughly the code that will sex xlsx files to backend

const formData = new FormData();
formData.append('file', yourFile); // from <input type="file" />

fetch('http://localhost:3000/upload-xlsx', {
    method: 'POST',
    body: formData,
})
    .then(res => res.json())
    .then(data => console.log(data));
