function login() {
    usernameValue = document.querySelector("#username").value;
    passwordValue = document.querySelector("#password").value;
    params = {
        username: usernameValue,
        password: passwordValue
    }


    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    };
    fetch("http://127.0.0.1:8080/login/", requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("token", data["data"])
            window.location.replace("http://127.0.0.1/frontendProjects/portfolio/admin/index.html")
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}