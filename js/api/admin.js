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
                        <button 
                            class="button" 
                            onclick="saveInfo(this)" 
                            id="${item.kyHoc.ten.split(" ").join("-")}*${item.namHoc.ten}">
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
                        <button 
                            class="button"
                            onclick="saveInfo(this)" 
                            id=${item.ten}*${localStorage.getItem("endpoint")}>
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
                        <button 
                            class="button"
                            onclick="saveInfo(this)" 
                            id="${item.ten.split(" ").join("-")}*${localStorage.getItem("endpoint")}">
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
                        <td 
                            onclick="saveInfo(this)" 
                            id="${item.ten.split(" ").join("-")}*${localStorage.getItem("endpoint")}">
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
    document.querySelector("#sub-name").innerHTML = 
        paths[0].split("-").join(" ").toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${paths[4]}/ky-hocs/${paths[3]}/nien-khoas/${paths[2]}/nganh/${paths[1]}/mon-hocs/${paths[0]}/lhps`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        let render = data.map((item, index) => {
            return `<tr>
                        <td>${item.id}</td>
                        <td onclick="saveInfo(this)" id="${item.id}*${localStorage.getItem("endpoint")}">
                            <a href="./ds-sv.html">${item.nienKhoaNganhNamHocKyHocMonHoc.monHoc.ten.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</a>
                        </td>
                        <td>${item.giaoVien.nguoiDung.name.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</td>
                        <td>${item.phongHoc.ten}</td>
                        <td>${item.listKetQua.length}</td>
                        <td>${reverse(item.batDau.toLocaleString('en-CA').slice(0, 10))}</td>
                        <td>${reverse(item.ketThuc.toLocaleString('en-CA').slice(0, 10))}</td>
                    </tr>`;
        });
        document.querySelector("#main").innerHTML = render.join("");
    });
}

const getDSSV = () => {
    const paths = localStorage.getItem("endpoint").split("*");
    // document.querySelector("#sub-name").innerHTML = paths[0].split("-").join(" ").toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase());
    const APIUrl = `http://localhost:8080/api/v1/admin/nam-hocs/${paths[5]}/ky-hocs/${paths[4]}/nien-khoas/${paths[3]}/nganh/${paths[2]}/mon-hocs/${paths[1]}/lhps/${paths[0]}/sinh-viens`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        let render = data.map((item, index) => {
            return `<tr>
                        <td>${item.id}</td>
                        <td>${item.nguoiDung.name.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</td>
                        <td>${item.maSinhVien}</td>
                        <td>${item.nguoiDung.gioiTinh.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</td>
                        <td>${item.nguoiDung.soDienThoai}</td>
                        <td>${item.nguoiDung.email}</td>
                        <td>${item.nguoiDung.diaChi.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</td>
                        <td>
                            <button class="edit" onclick="editInfoStudent(this)">Sửa thông tin</button>
                            <button class="delete" id="${item.id}" onclick="showForm(${item.id})">Xoá sinh viên</button>
                        </td>
                        <div class="toggle" id="delete-${item.id}">
                            <div class="form-msg">
                            <h4 class="form-title">Xác nhận xoá sinh viên</h4>
                                <button onclick="deleteStudent(${item.id})" class="submit">Xác nhận</button>
                                <button onclick="showForm(${item.id})" class="submit">Huỷ</button>
                            </div>
                        </div>
                    </tr>`;
        });
        document.querySelector("#main").innerHTML = render.join("");
    });
}