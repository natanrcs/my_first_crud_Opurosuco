import {test,expect, Page} from "@playwright/test"
const deleteUrl="http://localhost:8001/delete.html";

async function deleteProduto(page:Page,deleteUrl:string) {
    await page.goto(deleteUrl);
    await page.getByPlaceholder("Digite um ID:").fill("1");
    await page.getByRole("button",{name:"Delete"}).click({force:true});
    await expect(page.getByText("Id excluido com sucesso")).toBeVisible();  
};

test("Deve deletar um produto", async ({page})=> {
    await deleteProduto(page,deleteUrl);
});