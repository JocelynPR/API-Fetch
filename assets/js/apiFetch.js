let mostrar = "https://reqres.in/api/users?delay=3";

let llave = "datosUsuario";


function solicitud(url,pagina) {
    if(datosGuardados(pagina)) {
        solicitarDatos();
    } else {
        datosA(url,pagina);
    };
};


function solicitarDatos(){
    let datosLocales=localStorage.getItem(llave);
    let datosUsuario=JSON.parse(datosLocales);
    localStorage.setItem(llave,JSON.stringify({ userArray:datosUsuario.userArray, time:Date.now()}));
    mostrarDatos(datosUsuario.userArray);
};


function datosA(url,pagina){
    fetch(url)
    .then(responseIsJSON =>{return responseIsJSON.json()})
    .then(dataJSON =>{ 
        return mostrarDatos(dataJSON.data);
    })
    .catch(error => {console.log('Error de Solicitud', error);});        
};


function datosGuardados(pagina){
    let datosLocales = localStorage.getItem(llave);
    if(datosLocales != null){
        let datosUsuario = JSON.parse(datosLocales);
        let tiempo = Date.now();
        let tiempoLimite = 1 * 30 * 1000 + datosUsuario.time; 
        if(tiempo < tiempoLimite){
            return true;
        };
        localStorage.removeItem("datosUsuario");
    };
    return false;
};

function mostrarDatos(arrUsers){
    let tablaUsuarios=document.getElementById("tablaUsuarios");
    for(let user of arrUsers){
    let tabla = document.createElement("tr");
    tabla.innerHTML=`
        <td class="id">${user.id}</td>
        <td class="nombre">${user.first_name} ${user.last_name}</td>
        <td class="email">${user.email}</td>
        <td class="avatar"><image class="photoIm" src="${user.avatar}"/></td>
        `;
    tablaUsuarios.appendChild(tabla);
    }   
};


let unoPagina=document.getElementById("mostrar");
unoPagina.addEventListener('click',()=>{document.getElementById("botones").innerText="Cargando..."
setTimeout(
            function (){
              document.getElementById('botones').innerText = ""
            },
            3000 
            )
;solicitud(mostrar,1);});



function Datos(){
 
};


