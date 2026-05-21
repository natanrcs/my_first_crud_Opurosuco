import {test,expect, Page} from "@playwright/test";
const deleteUrl="http://localhost:8001/delete.html";

async function deleteProduto(page:Page,deleteUrl:string) {
    page.on("dialog", async dialog => {
        expect(dialog.message()).toBe("Id excluido com sucesso!");
        await dialog.accept();
    })
    await page.goto(deleteUrl);
    await page.getByPlaceholder("Digite um ID:").fill("3");
    await page.getByRole("button",{name:"Delete"}).click({force:true});
};

test.only("Deve deletar um produto", async ({page})=> {
    await deleteProduto(page,deleteUrl);
});