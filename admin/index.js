const token = localStorage.getItem("token");

fetch(`http://127.0.0.1:8080/login/?token=${token}`)
    .then(response => {
        if (!response.ok) {
            throw new Error("Login failed");
        }
    })
    .catch(error => {
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "Something went wrong... Redirecting to login in 5 seconds.";
        document.body.appendChild(errorMessage);
        setTimeout(() => {
            window.location.replace("http://127.0.0.1/frontendProjects/portfolio/admin/login.html");
        }, 5000);
    });
