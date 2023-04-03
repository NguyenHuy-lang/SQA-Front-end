const saveInfo = (btn) => {
    localStorage.setItem("endpoint", btn.getAttribute("id"));
}

const getNamHoc = () => {
    const APIUrl = "http://localhost:8080/api/v1/admin/nam-hocs";
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        let render = data.map((item, index) => {
            return `<li >
                        <button 
                            id="${item.ten}" 
                            onclick=saveInfo(this)
                        >
                            <a href="./ky-hoc.html">${item.ten}</a>
                        </button>
                    </li>`;
        });
        document.querySelector("#main").innerHTML = render.join('');
    });
}

const getKyHoc = () => {
    const path = localStorage.getItem("endpoint")
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${path.trim()}/ky-hocs`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        let render = data.map((item, index) => {
            return `<li>
                        <button onclick="saveInfo(this)" id="${item.kyHoc.ten.split(" ").join("-")}*${item.namHoc.ten}">
                            <a href="./nien-khoa.html">${item.kyHoc.ten}</a>
                        </button>
                    </li>`;
        });
        document.querySelector("#main").innerHTML = render.join("");
    });
}

const getNienKhoa = () => {
    const paths = localStorage.getItem("endpoint").trim().split("*");
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${paths[1]}/ky-hocs/${paths[0]}/nien-khoas`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        let render = data.map((item, index) => {
            return `<li>
                        <button onclick="saveInfo(this)" id=${item.ten}*${localStorage.getItem("endpoint")}>
                            <a href="./nganh-hoc.html">${item.ten}</a>
                        </button>
                    </li>`;
        });
        document.querySelector("#main").innerHTML = render.join("");
    });
}

const getNganhHoc = () => {
    const paths = localStorage.getItem("endpoint").split("*");
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${paths[2]}/ky-hocs/${paths[1]}/nien-khoas/${paths[0]}/nganh`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        let render = data.map((item, index) => {
            return `<li>
                        <button onclick="saveInfo(this)" id="${item.ten.split(" ").join("-")}*${localStorage.getItem("endpoint")}">
                            <a href="./mon-hoc.html">${item.ten}</a>
                        </button>
                    </li>`;
        });
        document.querySelector("#main").innerHTML = render.join("");
    });
}

const getMonHoc = () => {
    const paths = localStorage.getItem("endpoint").split("*");
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${paths[3]}/ky-hocs/${paths[2]}/nien-khoas/${paths[1]}/nganh/${paths[0]}/mon-hocs`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        let render = data.map((item, index) => {
            return `<tr>
                        <td>${item.id}</td>
                        <td onclick="saveInfo(this)" id="${item.ten.split(" ").join("-")}*${localStorage.getItem("endpoint")}">
                            <a href="./lop-hoc.html">${item.ten.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</a>
                        </td>
                        <td>${item.tyLeDiemCC}</td>
                        <td>${item.tyLeDiemTH}</td>
                        <td>${item.tyLeDiemKT}</td>
                        <td>${item.tyLeDiemBT}</td>
                        <td>${item.tyLeDiemCuoiKy}</td>
                    </tr>`;
        });
        document.querySelector("#main").innerHTML = render.join("");
    });
}

const getLHP = () => {
    const paths = localStorage.getItem("endpoint").split("*");
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${paths[4]}/ky-hocs/${paths[3]}/nien-khoas/${paths[2]}/nganh/${paths[1]}/mon-hocs/${paths[0]}/lhps`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        let render = data.map((item, index) => {
            return `<tr>
                        <td onclick="saveInfo(this)" id="${item.ten.split(" ").join("-")}*${localStorage.getItem("endpoint")}">
                            <a href="./lop-hoc.html">${item.ten}</a>
                        </td>
                        <td>${item.tyLeDiemCC}</td>
                        <td>${item.tyLeDiemTH}</td>
                        <td>${item.tyLeDiemKT}</td>
                        <td>${item.tyLeDiemBT}</td>
                        <td>${item.tyLeDiemCuoiKy}</td>
                    </tr>`;
        });
        document.querySelector("#main").innerHTML = render.join("");
    });
}