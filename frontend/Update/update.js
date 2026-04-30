async function updatId(event) {
    event.preventDefault();
    const form =document.getElementById("form");
    const input=document.getElementById("inputupdate").value.trim();
    const btn=document.getElementById("btn");
    const name=document.getElementById("name").value.trim();
    const price= document.getElementById("price").value.trim();
    const stock=document.getElementById("stock").value.trim();
    const updateint=parseInt(input,10);

    let dadosform;
    if(!isNaN(updateint)){
        dadosform = {
            id_update: updateint,
            price:Number(price),
            stock:Number(stock)
        };
    }else{
        alert("Insira um Id válido para busca!")
        return;
    }
    try{
        const url = `http://127.0.0.1:8002/products/${updateint}`;
        const response=await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosform)
        });
        if(response.ok){
            alert("Id atualizado com sucesso!")
            console.log("Teste...")
            form.reset();
        }
        else{
           alert("Falha na requisição: ID não encontrado.")
        }
    }catch(error){
        console.error("Erro na conexao com o Servidor",error)
    }
};