import { app } from './firebase'
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
//collection reference
const colRef = collection(db, 'productos-test');

document.addEventListener("DOMContentLoaded", async function () {
    try {
        //const response = await fetch("json/productos.json");
        //const data = await response.json();
        getDocs(colRef)
            .then((snapshot) => {
                // Obtiene el contenedor de productos
                const productContainer = document.getElementById("product-container");
                //console.log(snapshot);

                // Itera sobre los datos del JSON y crea las tarjetas
                snapshot.docs.forEach(function (doc) {
                    //console.log(producto.data());
                    const producto = doc.data();
                    //console.log(producto);
                    const cardHtml = `
                <div class="card">
                    <div class="img-container">
                        <img src="${producto.imagenes}" class="card-img-top" alt="${producto.nombre}">
                        <div class="description">
                            <span class="title">${producto.nombre}</span> 
                            <button class="leer-btn" data-product="${producto.id}">Leer mas</button>
                        </div>
                    </div>
                </div>
                `;

                    // Agrega la tarjeta al contenedor de productos
                    productContainer.innerHTML += cardHtml;
                });

                // Obtén los elementos de los botones de leer más
                const leerButtons = document.querySelectorAll('.leer-btn');

                // Maneja el clic en los botones de leer más
                leerButtons.forEach(function (button) {
                    button.addEventListener('click', function (event) {
                        // Obtén el identificador del producto desde el atributo data-product
                        const productId = event.target.getAttribute('data-product');

                        // Redirige al usuario a la página de detalles del producto con el identificador del producto
                        window.location.href = `detallesProducto.html?id=${productId}`;
                    });
                });
            })
            .catch(err => {
                console.log(err.message);
            });



    } catch (error) {
        console.error("Error al cargar los datos del JSON: ", error);
    }
});

// funcioon barra de busqueda
function buscarPorNombre() {
    let input = document.getElementById("searchInput").value;
    /* Limpiamos el input | No case sensitive, No importa tildes */
    input = quitarTildes(input.toLowerCase());

    /* Quitamos lo que no coincide con la busqueda */
    const productContainer = document.getElementById("product-container");
    let productos = Array.from(productContainer.children);
    productos.forEach(p => {
        const productName = p.querySelector(".card-title").textContent;

        if (quitarTildes(productName.toLowerCase()).includes(input))
            p.classList.remove("d-none");
        else
            p.classList.add("d-none");
    });
}

function quitarTildes(str) {
    return str.normalize('NFD')
        .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
        .normalize();
} /* Source: https://es.stackoverflow.com/questions/62031/eliminar-signos-diacr%C3%ADticos-en-javascript-eliminar-tildes-acentos-ortogr%C3%A1ficos */

document.getElementById("applyFiltersBtn").addEventListener("click", buscarPorNombre);