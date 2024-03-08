const requestData = {
    username: 'admin',
    password: 'admin'
};

// 构建请求
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
            // 在这里处理响应数据
            console.log('Response:', data);
        })
        .catch(error => {
            // 处理错误
            console.error('There was an error!', error);
        });
}
