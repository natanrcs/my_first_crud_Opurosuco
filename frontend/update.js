async function updateProduct(event) {
    event.preventDefault();
    const form =document.getElementById("form");
    const input=document.getElementById("productId").value.trim();
    const btn=document.getElementById("btn");
    const name=document.getElementById("name").value.trim();
    const price= document.getElementById("price").value.trim();
    const stock=document.getElementById("stock").value.trim();
    const updateint=parseInt(input,10);

    //const updateid = parseInt(input,10);
    if(!name || price === "" || stock === ""){
        alert("Preencha todos os campos abaixo!");
        return;
    }

    const dadosform= {
        name,
        price:Number(price),
        stock:Number(stock)
    };
    try{
        const url = `http://127.0.0.1:8000/products/${updateint}`;
        const response=await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosform)
        });
        if(response.ok){
            alert("Id atualizado com sucesso!")
            form.reset();
        }
        else{
           alert("Falha na requisição: ID não encontrado.")
        }
    }catch(error){
        console.error("Erro na conexao com o Servidor",error)
    }
};