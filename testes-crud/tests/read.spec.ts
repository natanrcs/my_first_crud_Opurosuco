import{test,expect,Page} from "@playwright/test";
const readUrl="http://localhost:8001/read.html";
async function listarProduto(page:Page,readUrl:string) {
    await page.goto(readUrl);
    await expect(page.getByText("List Products: ")).toBeVisible();
    await page.getByRole("button",{name: "Listar"}).click();
    await expect(page.getByText("Shorts Oakley")).toBeVisible();
    await expect(page.getByText("Preço: 200")).toBeVisible();
    await expect(page.getByText("Estoque: 200")).toBeVisible();
    await page.getByRole("button",{name:"Zerar"}).click();
};
test("Deve Validar e mostrar o primeiro produto", async ({page})=> {
    await listarProduto(page,readUrl);
});