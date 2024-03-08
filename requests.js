fetch("127.0.0.1:8080/login/ip");

const requestData = {
    username: 'admin',
    password: 'admin'
};

const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData)
};

const url = new URL('http://127.0.0.1:8080/login/');
url.searchParams.append('username', 'admin');
url.searchParams.append('password', 'admin');
function test() {
    fetch("http://127.0.0.1:8080/login/", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response:', data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}