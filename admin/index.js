const token = localStorage.getItem("token");

fetch(`http://127.0.0.1:8080/login/?token=${token}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Login failed");
        }
    })
    .catch(error => {
        const errorMessage = document.createElement("div");
        let leftTime = 5;
        setInterval(() => {
            errorMessage.textContent = `Something went wrong... Redirecting to login in ${leftTime} seconds.`;
            leftTime--;
            if (leftTime === 0) {
                window.location.replace("http://127.0.0.1/frontendProjects/portfolio/admin/login.html");
            }
        }, 1000)
        document.body.appendChild(errorMessage);

    });
