import {datos} from "./datos.js";

const objetoAlbum = datos.artistas;

var nav = document.body.firstElementChild.nextElementSibling;

objetoAlbum.forEach(artista => {
    var image = document.createElement("img");
    image.setAttribute("src", "./img/" + artista.imagen);
    image.classList.add("albumPreview");
    image.addEventListener('click', function(){showAlbum(artista.id)});
    nav.appendChild(image);
}); 

if (getCookie("album") != null) {
    showAlbum(getCookie("album"));
}

function showAlbum(id){
    deleteNodes();
    let idAlbum = id;
    let i=0;
    let artista;
    artista = objetoAlbum.find(album => album.id == idAlbum);
    var div = document.createElement("div");
    var image2 = document.createElement("img");
    image2.setAttribute("src", "../../img/" + artista.imagen);
    div.appendChild(image2);
    image2.setAttribute("id", idAlbum);
    var nombreAlbum = document.createElement("h2");
    var nameAlbum = document.createTextNode(artista.album);
    nombreAlbum.appendChild(nameAlbum);
    div.appendChild(nombreAlbum);
    var boton = document.createElement("button");
    boton.setAttribute("id", "fav");
    var texto = document.createTextNode("Añadir a Favoritos");
    boton.appendChild(texto);
    div.appendChild(boton);
    boton.classList.add("albumCardButtons");
    boton.addEventListener('click', añadirFav);
    document.body.children[2].appendChild(div);
    div.classList.add("albumCard");

    if(getCookie("album") == null){
        setCookie("album", id, 24);
    }
    else{
        deleteCookie("album");
        setCookie("album", id, 24)
    }
}

function añadirFav(evento){

    if(localStorage.getItem("albumFavs") == null){
        localStorage.setItem("albumFavs", JSON.stringify({favoritos: []}));
    }
    let favObjeto =JSON.parse(localStorage.getItem("albumFavs"));
    favObjeto.favoritos.push(evento.target.parentNode.firstElementChild.id);
    localStorage.setItem("albumFavs", JSON.stringify(favObjeto));
    evento.target.nodeText = "Eliminar de Favoritos";
    evento.target.removeEventListener('click', añadirFav);
    evento.target.addEventListener('click', eliminarFav);
}

function eliminarFav(){
    alert("Borrando de favoritos");
    evento.target.nodeText = "Añadir de Favoritos";
    evento.target.removeEventListener('click', eliminarFav);
    evento.target.addEventListener('click', añadirFav);
}

function deleteNodes(){
    let main = document.body.children[2];
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}

function deleteCookie(nombre) {
    document.cookie = nombre +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getCookie(name) {
        
    var index = document.cookie.indexOf(name + "=");
    if (index == -1) return null;
    index = document.cookie.indexOf("=", index) + 1;
    var endstr = document.cookie.indexOf(";", index);
    if (endstr == -1)
        endstr = document.cookie.length;
    return decodeURIComponent(document.cookie.substring(index, endstr));
}

function setCookie(name, value, h) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() + h * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expdate.toUTCString()+";";
} 