
async function createProduct(event) {
  event.preventDefault();

  const form= document.querySelector("form");
  const msg= document.getElementById("msg");

  const name=document.getElementById("name").value.trim()
  const price=document.getElementById("price").value.trim()
  const stock=document.getElementById("stock").value.trim()
  //Pega os dados do form do html
  const dados={
    name,
    price: Number(price),
    stock: Number(stock)
  };

  if(!dados.name || isNaN(dados.price)){
    alert("Preencha os campos")
    return;
  }
  try{
    const url="http://127.0.0.1:8000/products";
    const resp= await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });
    if(resp.ok){
      alert("Criado com sucesso o produto")
      console.log("teste teste")
      console.log("Teste natan api")
      form.reset();
    }
    else{
      alert("Error servidor: " + resp.status)
    }
  } catch (error){
    error= "Falha na conexao com servidor.";
    console.error(error);
  }
};
