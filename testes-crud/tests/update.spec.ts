import{test,expect,Page} from "@playwright/test";
const updateUrl="http://localhost:8001/update.html";
async function updateProduto(page:Page,updateUrl:string){
    await page.goto(updateUrl);
    await page.locator("#productId").fill("1");
    await page.getByPlaceholder("Novo nome do produto").fill("Natan testando");
    await page.locator("#price").fill("100");
    await page.locator("#stock").fill("1");
    await page.getByText("Atualizar").click();
    await expect(page.getByText("Produto atualizado com sucesso")).toBeVisible();
};
test("Atualizar um Produto na pagina",async ({page}) =>{
    await updateProduto(page,updateUrl);
});