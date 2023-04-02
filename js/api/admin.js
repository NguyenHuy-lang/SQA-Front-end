const getNamHoc = () => {
    fetch('http://localhost:8080/api/v1/admin/nam-hocs', {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

getNamHoc();