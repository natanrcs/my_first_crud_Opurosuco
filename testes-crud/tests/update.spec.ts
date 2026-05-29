import{test,expect,Page} from "@playwright/test";
const updateUrl="http://localhost:8001/update.html";
async function updateProduto(page:Page,updateUrl:string){
    page.once("dialog", async dialog => {
        expect(dialog.message()).toBe("Id atualizado com sucesso!");
        await dialog.accept();
    })
    await page.goto(updateUrl);
    await page.getByPlaceholder("ID do produto").fill("1");
    await page.getByPlaceholder("Novo nome do produto").fill("Shorts Billabong");
    await page.getByPlaceholder("Novo preço").fill("200");
    await page.getByPlaceholder("Novo estoque").fill("200");
    await page.getByRole("button",{name: "Atualizar"}).click();
};
test("Deve atualizar um produto pelo ID",async ({page}) =>{
    await updateProduto(page,updateUrl);
});