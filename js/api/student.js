const saveInfo = (btn) => {
    localStorage.setItem("endpoint2", btn.getAttribute("id"));
}

const getNamHoc = () => {
    const APIUrl = `http://localhost:8080/api/v1/sinh-vien/${JSON.parse(localStorage.getItem("userInfor")).id}/nam-hocs`;
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
    let paths = localStorage.getItem("endpoint2").split("*");
    if(paths.length>1){
        paths = paths.slice(0,1);
        localStorage.setItem("endpoint", paths.join("*"));
    }
    const APIUrl = `http://localhost:8080/api/v1/sinh-vien/${JSON.parse(localStorage.getItem("userInfor")).id}/nam-hocs/${paths[0]}/ky-hocs`;
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
                            <a href="./mon-hoc.html">${item.kyHoc.ten}</a>
                        </button>
                    </li>`;
        });
        document.querySelector("#main").innerHTML = render.join("");
    }).catch((error) => console.error('Error: ', error));
}

const getMonHoc = () => {
    let paths = localStorage.getItem("endpoint2").split("*");
    if(paths.length>2){
        paths = paths.slice(0,2);
        localStorage.setItem("endpoint", paths.join("*"));
    }
    const APIUrl = `http://localhost:8080/api/v1/sinh-vien/${JSON.parse(localStorage.getItem("userInfor")).id}/nam-hocs/${paths[0]}/ky-hocs/${paths[1]}/mon-hoc`;

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
                            id="${localStorage.getItem("endpoint2")}*${item.ten.split(" ").join("-")}">
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
    let paths = localStorage.getItem("endpoint2").split("*");
    if(paths.length>3){
        paths = paths.slice(0,3);
        localStorage.setItem("endpoint", paths.join("*"));
    }
    const APIUrl = `http://localhost:8080/api/v1/sinh-vien/${JSON.parse(localStorage.getItem("userInfor")).id}/nam-hocs/${paths[0]}/ky-hocs/${paths[1]}/mon-hoc/${paths[2]}/ket-quas`;
    console.log(APIUrl);
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
