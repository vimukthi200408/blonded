const FOLDER_ID = '1vvUspFZ4ai1EnULedBuq7BNu_-TBqwqt'; // Replace with your folder ID
const CLIENT_ID = '270845835208-o1h9h8rl54ar9f88bc5pthn3rorqoilg.apps.googleusercontent.com'; // Replace with your client ID from Google Developer Console

const API_KEY = 'AIzaSyD_8usS9shEG069JA_WsWItNIpQ3fMzAIM'; // Replace with your API key from Google Developer Console    

function initApi() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
        scope: 'https://www.googleapis.com/auth/drive',
    }).then(function() {
        listFiles();
    });
}

function listFiles() {
    gapi.client.drive.files.list({
        q: `'${FOLDER_ID}' in parents and mimeType contains 'image/'`, // Filters to show only images
        fields: 'files(id, name, webContentLink)',
    }).then(function(response) {
        const files = response.result.files;
        if (files && files.length > 0) {
            const gallery = document.getElementById('gallery');
            files.forEach(file => {
                const imgElement = document.createElement('img');
                imgElement.src = file.webContentLink;
                const div = document.createElement('div');
                div.className = 'gallery-item';
                div.appendChild(imgElement);
                gallery.appendChild(div);
            });
        }
    });
}

function handleClientLoad() {
    gapi.load('client:auth2', initApi);
}

handleClientLoad();
