const saveInfo = (btn) => {
    localStorage.setItem("endpoint", btn.getAttribute("id"));
}

function reverse(s){
    return s.split("-").reverse().join("/");
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
                            class="button" 
                            onclick=saveInfo(this)
                            id="${item.ten}" 
                        >
                            <a href="./ky-hoc.html">${item.ten}</a>
                        </button>
                    </li>`;
        });
        document.querySelector("#main").innerHTML = render.join('');
    });
}

const getKyHoc = () => {
    const paths = localStorage.getItem("endpoint").split("*");
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${paths[0]}/ky-hocs`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        let render = data.map((item, index) => {
            return `<li>
                        <button 
                            class="button" 
                            onclick="saveInfo(this)" 
                            id="${item.namHoc.ten}*${item.kyHoc.ten.split(" ").join("-")}">
                            <a href="./nien-khoa.html">${item.kyHoc.ten.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</a>
                        </button>
                    </li>`;
        });
        document.querySelector("#main").innerHTML = render.join("");
    });
}

const getNienKhoa = () => {
    let paths = localStorage.getItem("endpoint").trim().split("*");
    if(paths.length>2){
        paths = paths.slice(0,2);
        localStorage.setItem("endpoint", paths.join("*"));
    }
    console.log(paths);
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${paths[0]}/ky-hocs/${paths[1]}/nien-khoas`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.length !== 0) {
            let render = data.map((item, index) => {
             return `<li>
                        <button 
                            class="button"
                            onclick="saveInfo(this)" 
                            id="${localStorage.getItem("endpoint")}*${item.ten}">
                            <a href="./nganh-hoc.html">${item.ten.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</a>
                        </button>
                    </li>`;
             });
             document.querySelector("#main").innerHTML = render.join(''); 
         }else{
             document.querySelector("#error").innerHTML = "Hiện tại chưa có dữ liệu"; 
         }
    });
}

const getNganhHoc = () => {
    let paths = localStorage.getItem("endpoint").split("*");
    if(paths.length>3){
        paths = paths.slice(0,3);
        localStorage.setItem("endpoint", paths.join("*"));
    }
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${paths[0]}/ky-hocs/${paths[1]}/nien-khoas/${paths[2]}/nganh`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.length !== 0) {
            let render = data.map((item, index) => {
             return `<li>
                        <button 
                            class="button"
                            onclick="saveInfo(this)" 
                            id="${localStorage.getItem("endpoint")}*${item.ten.split(" ").join("-")}">
                            <a href="./mon-hoc.html">${item.ten.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</a>
                        </button>
                    </li>`;
            });
            document.querySelector("#main").innerHTML = render.join(''); 
        }else{
            document.querySelector("#error").innerHTML = "Hiện tại chưa có dữ liệu"; 
        }
    });
}

const getMonHoc = () => {
    let paths = localStorage.getItem("endpoint").split("*");
    if(paths.length>4){
        paths =paths.slice(0,4);
        localStorage.setItem("endpoint", paths.join("*"));
    }
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${paths[0]}/ky-hocs/${paths[1]}/nien-khoas/${paths[2]}/nganh/${paths[3]}/mon-hocs`;

    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.length !== 0) {
            let render = data.map((item, index) => {
             return `<tr>
                        <td>${item.id}</td>
                        <td 
                            onclick="saveInfo(this)" 
                            id="${localStorage.getItem("endpoint")}*${item.ten.split(" ").join("-")}">
                            <a href="./lop-hoc.html">${item.ten.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</a>
                        </td>
                        <td>${item.tyLeDiemCC}</td>
                        <td>${item.tyLeDiemTH}</td>
                        <td>${item.tyLeDiemKT}</td>
                        <td>${item.tyLeDiemBT}</td>
                        <td>${item.tyLeDiemCuoiKy}</td>
                    </tr>`;
            });
            document.querySelector("#main").innerHTML = render.join(''); 
        }else{
            document.querySelector("#error").innerHTML = "Hiện tại chưa có dữ liệu"; 
        }
    });
}

const getLHP = () => {
    let paths = localStorage.getItem("endpoint").split("*");
    if(paths.length>5){
        paths = paths.slice(0,5);
        localStorage.setItem("endpoint", paths.join("*"));
    }
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${paths[0]}/ky-hocs/${paths[1]}/nien-khoas/${paths[2]}/nganh/${paths[3]}/mon-hocs/${paths[4]}/lhps`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.length !== 0) {
            let render = data.map((item, index) => {
             return `<tr>
                        <td>${index+1}</td>
                        <td onclick="saveInfo(this)" id="${localStorage.getItem("endpoint")}*${item.id}">
                            <a href="./ket-qua.html">${item.nienKhoaNganhNamHocKyHocMonHoc.monHoc.ten.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</a>
                        </td>
                        <td>${item.giaoVien.nguoiDung.name.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</td>
                        <td>${item.phongHoc.ten}</td>
                        <td>${item.listKetQua.length}</td>
                        <td>${reverse(item.batDau.toLocaleString('en-CA').slice(0, 10))}</td>
                        <td>${reverse(item.ketThuc.toLocaleString('en-CA').slice(0, 10))}</td>
                    </tr>`;
            });
            document.querySelector("#main").innerHTML = render.join(''); 
        }else{
            document.querySelector("#error").innerHTML = "Hiện tại chưa có dữ liệu"; 
        }
    });
}

function getKetQuaLHP() {
    let paths = localStorage.getItem("endpoint").split("*");
    if(paths.length > 6){
        paths = paths.slice(0,6);
        localStorage.setItem("endpoint", paths.join("*"));
    }
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${paths[0]}/ky-hocs/${paths[1]}/nien-khoas/${paths[2]}/nganh/${paths[3]}/mon-hocs/${paths[4]}/lhps/${paths[5]}/ket-quas`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.length !== 0) {
            let render = data.map((item, index) => {
                return document.querySelector("#main").innerHTML = 
                        `<tr>
                            <td>${index+1}</td>
                            <td>${item.nameSinhVien.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</td>
                            <td>${item.maSinhVien}</td>
                            <td>${item.diemCC}</td>
                            <td>${item.diemTH}</td>
                            <td>${item.diemKT}</td>
                            <td>${item.diemBT}</td>
                            <td>${item.diemCuoiKy}</td>
                            <td>${item.diemHe4 || "None"}</td>
                            <td>${item.diemHe10 || "None"}</td>
                            <td>${item.diemChu || "None"}</td>
                        </tr>`
            })
            document.querySelector("#main").innerHTML = render.join(''); 
        }else{
            document.querySelector("#error").innerHTML = "Hiện tại chưa có dữ liệu"; 
        }
    })
}

