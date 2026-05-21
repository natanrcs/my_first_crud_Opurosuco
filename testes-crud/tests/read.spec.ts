import{test,expect,Page} from "@playwright/test";

const readUrl="http://localhost:8001/read.html";
async function listarProduto(page:Page,readUrl:string) {
    await page.goto(readUrl);
    await page.getByRole("heading",{name: "List Products:"}).isVisible();
    await page.getByRole("button",{name:"Listar"}).click();
    expect(page.getByTitle("Teste Teste")).toBeVisible();
    expect(page.getByText("Preço: 10")).toBeVisible();
    expect(page.getByText("Estoque: 10")).toBeVisible();
    await page.getByRole("button",{name: "Zerar"}).click();
};
test("Deve Validar e mostrar o primeiro produto", async ({page})=> {
    await listarProduto(page,readUrl);
});