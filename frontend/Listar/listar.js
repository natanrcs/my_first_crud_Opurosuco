const container = document.getElementById("containerProduto");
const button = document.getElementById("button");
const buttonZ=document.getElementById("zerarContainer");
async function listarProdutos() {
  try {
    const response = await fetch("http://127.0.0.1:8002/products");
    const produtos = await response.json();

    container.innerHTML = "";

    produtos.forEach(produto => {
      const div = document.createElement("div");
      div.classList.add("produto");

      div.innerHTML = `
        <strong>${produto.name}</strong>
        <p>Preço: ${produto.price}</p>
        <p>Estoque: ${produto.stock}</p>
      `;

      container.appendChild(div);
    });

  } catch (error) {
    console.log("Erro:", error);
  }
}
button.addEventListener("click", listarProdutos);

function apagarConteiner(){
    buttonZ.addEventListener("click",()=>{
        console.log("Teste .....")
        container.innerHTML = "";
    });
};
apagarConteiner();