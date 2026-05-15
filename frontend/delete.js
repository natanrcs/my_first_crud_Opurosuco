async function Deleteid(event) {
    event.preventDefault();
    const form = document.getElementById("form");
    const button = document.getElementById("btn");
    const input = document.getElementById("inputdelete").value.trim()
    const deleteInt = parseInt(input,10);
    let dadosform;

    if(!isNaN(deleteInt)){
        dadosform = {
            id_delete: deleteInt
        };
    }else{
        alert("insira um ID numérico válido.");
        return;
    }
    try{
        const url = `http://127.0.0.1:8000/products/${deleteInt}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        if(response.ok){
            alert("Id excluido com sucesso!");
            console.log("Natan testando e entendendo....")
            form.reset();
        }
        else{
            alert("Falha na requisição: ID não encontrado.")
        }
    }catch (error){
        console.error("Falha na conexao com o servidor", error);

    }
};