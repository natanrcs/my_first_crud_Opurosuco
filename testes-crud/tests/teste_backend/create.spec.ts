import{test,expect, request} from "@playwright/test";

test("Cadastrar produto via API BACKEND", async ({request}) => {
    const response= await request.post("http://localhost:8001/products");
    const dadosInserido={
        name: "Blusa de Frio teste",price: 299,stok:20
    }
    expect(response.status()).toBe("201");
    const corpodaResposta= await response.json();
    expect(corpodaResposta.name).toBe("Blusa de frio teste");
    expect(corpodaResposta.id).toBeDefined();
});