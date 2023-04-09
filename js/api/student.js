const saveInfo = (btn) => {
    localStorage.setItem("endpoint2", btn.getAttribute("id"));
}

const getNamHoc = () => {
    const APIUrl = "http://localhost:8080/api/v1/sinh-vien/nam-hocs";
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.length !== 0) {
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
        }else{
            document.querySelector("#error").innerHTML = "Hiện tại chưa có dữ liệu"; 
        }
        
    }).catch((error) => console.error('Error: ', error));
}

const getKyHoc = () => {
    const path = localStorage.getItem("endpoint2");
    const APIUrl = `http://localhost:8080/api/v1/sinh-vien/nam-hocs/${path.trim()}/ky-hocs`;
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
                            <a href="./mon-hoc.html">${item.kyHoc.ten}</a>
                        </button>
                    </li>`;
        });
        document.querySelector("#main").innerHTML = render.join("");
    }).catch((error) => console.error('Error: ', error));
}

const getMonHoc = () => {
    const paths = localStorage.getItem("endpoint2").split("*");
    const APIUrl = `http://localhost:8080/api/v1/sinh-vien/nam-hocs/${paths[1]}/ky-hocs/${paths[0]}/mon-hoc`;

    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.length > 0) {
            let render = data.map((item, index) => {
             return `<tr>
                        <td>${item.id}</td>
                        <td 
                            onclick="saveInfo(this)" 
                            id="${item.ten.split(" ").join("-")}*${localStorage.getItem("endpoint2")}">
                            <a href="./ket-qua.html">${item.ten.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</a>
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

const getKetQua = () => {
    const paths = localStorage.getItem("endpoint2").split("*");
    const APIUrl = `http://localhost:8080/api/v1/sinh-vien/nam-hocs/${paths[2]}/ky-hocs/${paths[1]}/mon-hoc/${paths[0]}/ket-quas`;
    fetch(APIUrl, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    })
    .then((response) => response.json())
    .then((data) => {
            return document.querySelector("#main").innerHTML = 
                    `<tr>
                        <td>${data.nameSinhVien.toLowerCase().replace(/(^|\s)\S/g, l => l.toUpperCase())}</td>
                        <td>${data.maSinhVien}</td>
                        <td>${data.diemCC}</td>
                        <td>${data.diemTH}</td>
                        <td>${data.diemKT}</td>
                        <td>${data.diemBT}</td>
                        <td>${data.diemCuoiKy}</td>
                        <td>${data.diemHe4 || "None"}</td>
                        <td>${data.diemHe10 || "None"}</td>
                        <td>${data.diemChu || "None"}</td>
                    </tr>`;
    });
    
}