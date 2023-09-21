const productForm = document.getElementById("product-form");
const productName = document.getElementById("product-name");
const idproduct = document.getElementById("id");
const descriptionproduct = document.getElementById("description");
const productList = document.getElementById("product-list");

let editingProductId = null; // Aqui solo declaramos la variable 

productForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const id = idproduct.value;
    const name = productName.value;
    const description = descriptionproduct.value;

    if (id && name && description) {
        if (editingProductId !== null) {
            // Aqui lo que hacemos es que si se está editando, actualizamos el producto existente
            editProduct(editingProductId, id, name, description);
            editingProductId = null; // Solo limpiamos el ID de edición
        } else {
            // Por otro lado aqui si no se está editando, lo que hacemos es agregar un nuevo producto
            addProduct(id, name, description);
        }

        productName.value = "";
        descriptionproduct.value = "";
        idproduct.value = ""; // Limpiamos el campo de ID
    }
});

function addProduct(id, name, description) {
    const li = createProductListItem(id, name, description);

    productList.appendChild(li);
}

function createProductListItem(id, name, description) {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>ID: ${id} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nombre: ${name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Descripción: ${description}</span>
        <button class="edit-btn" data-id="${id}">Editar</button>
        <button class="delete-btn" data-id="${id}">Eliminar</button>
    `;

    li.querySelector(`.delete-btn[data-id="${id}"]`).addEventListener("click", function () {
        deleteProduct(id);
    });

    li.querySelector(`.edit-btn[data-id="${id}"]`).addEventListener("click", function () {
        // Al dar clic en el botón de "Editar", llenamos el formulario con los datos del producto
        idproduct.value = id;
        productName.value = name;
        descriptionproduct.value = description;
        editingProductId = id; // Solo Establecemos el ID del producto que se está editando
    });

    return li;
}
function deleteProduct(id) {
    const productListItem = document.querySelector(`.delete-btn[data-id="${id}"]`).closest("li");
    if (productListItem) {
        productList.removeChild(productListItem);
    }
}



function editProduct(edit, id, name, description) {
    // Aqui solo Actualizamos el elemento de la lista con los nuevos valores
    const productInfo = document.querySelector(`.edit-btn[data-id="${edit}"]`).previousElementSibling;
    productInfo.textContent = `ID: ${id} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Nombre: ${name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Descripción: ${description}`;
    deleteProduct(edit);
    addProduct(id, name, description);

}