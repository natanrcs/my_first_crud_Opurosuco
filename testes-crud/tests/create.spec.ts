import {test,expect,Page} from "@playwright/test";
const createUrl = 'http://localhost:8001/create.html';
async function criarProduto(page:Page,
    createUrl: string
) {
    await page.goto(createUrl)
    await page.locator("#name").fill("Camiseta Nike Teste");
    await page.locator("#price").fill("150");
    await page.locator("#stock").fill("5");
    await page.getByRole("button",{name:"Criar"}).click({force: true});
    await expect(
        page.getByText("Criado com sucesso o produto")
    ).toBeVisible();
}
test('Deve criar um produto com sucesso', async ({page})=> {
    await criarProduto(page,createUrl);
});
