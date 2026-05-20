import{test,expect,Page} from "@playwright/test";

const readUrl="http://localhost:8001/read.html";
async function listarProduto(page:Page,readUrl:string) {
    await page.goto(readUrl);
    await page.getByTitle("List Product").isVisible();
    await page.getByText("Camiseta Nike Teste");
    await expect(page.getByText("Camiseta Nike Teste").first()).toBeVisible();
};
test("Deve Validar e mostrar o primeiro produto", async ({page})=> {
    listarProduto(page,readUrl);
});