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



            productName.value = "";
            descriptionproduct.value = "";
            idproduct.value = ""; // Limpiamos el campo de ID
        }
    });

function addProduct(id, name, description) {
    const li = createProductListItem(id, name, description);

    productList.appendChild(li);
}
