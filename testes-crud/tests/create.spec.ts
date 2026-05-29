import { test, expect, Page } from "@playwright/test";

const createUrl = 'http://localhost:8001/create.html';

async function preencherECriarProduto(page: Page, url: string) {
    // 1. Configura o listener do dialog ANTES de interagir com o botão que o dispara
    page.once("dialog", async dialog => {
        expect(dialog.message()).toBe("Criado com sucesso o produto");
        await dialog.accept();
    });

    // 2. Navega e preenche os campos
    await page.goto(url);
    await page.locator("#name").fill("Shorts Quiksilver");
    await page.locator("#price").fill("200");
    await page.locator("#stock").fill("200");

    // 3. Clica no botão (o dialog vai abrir aqui e o listener acima vai capturar)
    await page.getByRole("button", { name: "Criar" }).click();
}

test('Deve criar um produto com sucesso', async ({ page }) => {
    await preencherECriarProduto(page, createUrl);
});