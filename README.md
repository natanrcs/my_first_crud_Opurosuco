É com muita alegria,dedicação e felicidade que eu apresento um dos ritos de passagem dos Desenvolvedores O Famoso Crud.
Fui desafiado a criar o famoso crud onde as expectativas era entender e aplicar meus conhecimentos com base no que eu já sabia e confesso que foi bastante dahora e desafiador pra mim hehehe. Vendo a linguiça feita tenho a sensação de dever cumprido e acima de tudo obtive o melhor entendimento de como as coisas funcionam por baixo do capô,desde a criaçao da api,conectar front com back até as coisas mais simples e conseguir ter a visao do todo e codar o sistema é foda e gratificante demais,ta o simples bem feito o puro suco da coisa toda hehe.

# FOCO: MICROSSERVICOS
O projeto evoluiu para a arquitetura de microsservicos. O objetivo agora e entender na pratica como sistemas reais sao divididos em servicos independentes,cada um com sua responsabilidade,rodando de forma isolada e se comunicando entre si.

Cada microsservico tem sua propria pasta,seus proprios arquivos e sobe de forma independente via Docker. Isso e o puro suco de como funciona em producao.

# SERVICOS
- backend (porta 8000): CRUD de produtos
- user-service (porta 8002): CRUD de usuarios

# CRUD DE PRODUTOS
O projeto foi criado pra praticar a integração do front+back+banco de dados+docker e ter visão do sistema todo.
oque eu sei pra desenvolver a linguiça:
no back usei o python/fastapi
no front usei html,css e js o puro suco sem framework
no banco usei o postgres
e o docker para orquestrar a parada toda hehe. tive o prazer de aprender os fundamentos manuais depois fazer o compose e basta esse comando docker compose up para subir a linguiça toda.

# Estrutura de pasta
A raiz project contem as pastas de cada microsservico (backend, user-service), o frontend e os arquivos de orquestracao do docker.

# Para rodar o projeto basta:
clone o projeto: git clone https://github.com/natanrcs/my_first_crud_Opurosuco.git
entre na pasta: cd my_first_crud_Opurosuco
suba os conteiners: docker compose up --build e pronto crie,liste,atualize e delete os produtos e usuarios.

Projeto criado para aprendizado 🚀

