import {test,expect,Page} from "@playwright/test";
const createUrl = 'http://localhost:8001/create.html';
async function criarProduto(page:Page,
    createUrl: string
) {
    page.on("dialog",async dialog =>{
        expect(dialog.message()).toBe("Criado com sucesso o produto");
        await dialog.accept();

    });
    await page.goto(createUrl)
    await page.locator("#name").fill("Shorts Quiksilver");
    await page.locator("#price").fill("200");
    await page.locator("#stock").fill("200");
    await page.getByRole("button",{name:"Criar"}).click();
}
test('Deve criar um produto com sucesso', async ({page})=> {
    await criarProduto(page,createUrl);
});
