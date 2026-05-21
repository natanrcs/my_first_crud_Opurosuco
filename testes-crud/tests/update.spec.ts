import{test,expect,Page} from "@playwright/test";
const updateUrl="http://localhost:8001/update.html";
async function updateProduto(page:Page,updateUrl:string){
    
};
test("Atualizar um Produto na pagina",async ({page}) =>{
    await updateProduto(page,updateUrl);
});