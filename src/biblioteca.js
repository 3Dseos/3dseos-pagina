import { app } from './firebase'
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

//Init services
const db = getFirestore();
//collection ref
let collectionName = 'productos';
const colRef = collection(db, collectionName);

// Obtiene el contenedor de productos
const productContainer = document.getElementById("product-container");

getDocs(colRef)
    .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            const producto = doc.data();

            // Obtén la primera imagen del array (puedes cambiar el índice según tus necesidades)
            const imagen = producto.imagenes[0];

            const cardHtml = `
                <div class="card">
                    <div class="fixed-card">
                        <img src="${imagen}" class="img-container" alt="${producto.nombre}">
                        <div class="description">
                            <span class="title">${producto.nombre}</span> 
                            <button class="leer-btn" data-product="${producto.id}">Leer mas</button>
                        </div>
                    </div>
                </div>
            `;

            // Agrega la tarjeta al contenedor de productos
            productContainer.innerHTML += cardHtml;

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
        });
    })
    .catch(err => {
        console.log(err.message);
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


//---------------------Subir JSON a la base de datos----------------------
//Init services
const jsonPath = "json/productos.json";

async function leerYProcesarJson() {
    try {
        
        const response = await fetch(jsonPath); 
        const data = await response.json();
        //------DEBUG--------
        // console.log(data);
        // for (const p of data) {
        //   console.log(p);
        // }
        //-------------------
        data.forEach(p => {
            //delete p.id; //Quita el id del objeto para no subirlo a la db
            console.log(p);
            //addDoc(collection(db, collectionName), p)
        });
    } catch (error) {
        console.log(`Se produjo un error: ${error.message}`);
    }
}

const subirJsonBtn = document.querySelector('#SubirJson');
subirJsonBtn.addEventListener('click', () => console.log("Sin efecto. Modificar el codigo para subirlo."));


//getDocs(collection(db, collectionName))
//    .then((snapshot) => {
//        // console.log(snapshot);
//        let arr = [];
//        snapshot.docs.forEach((doc) => {
//            arr.push({ ...doc.data(), id: doc.id })
//        });
//        console.log(arr);
//    })
//    .catch(err => {
//        console.log(err.message);
//    })