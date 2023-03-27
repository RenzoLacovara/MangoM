const addProd = document.getElementById("addProd");
const cartbtn = document.getElementById("cart");
const detailbtn = document.getElementById("detail");
const cart = "641a65adffb628bdcb7416ce";

addProd.addEventListener("click", () => {
  const addProduct = async () => {
    await fetch(`/api/carts/${cart}/products/${addProd.value}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((json) => console.log(json));
  };
  addProduct();
});
cartbtn.addEventListener("click", () => {
  window.location.replace(`/api/carts/${cart}`);
});
detailbtn.addEventListener("click", () => {
  window.location.replace(`/api/products/${detailbtn.value}`);
});
