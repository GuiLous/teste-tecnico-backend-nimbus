## Teste técnico para Backend da Nimbus
    Aplicação back-end para o desafio técnico da Nimbus.

## Pré-requisitos

- Necessário ter instalado `docker` e `docker compose` para o `setup` do banco de dados. Links úteis para ajudar na instalação abaixo:
    - Ubuntu: https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt
    - Windows: https://docs.docker.com/desktop/install/windows-install/
  

## Instalação

```bash
# Clone o repositório
git clone https://github.com/GuiLous/teste-tecnico-backend-nimbus.git

# Acesse a pasta do projeto
cd teste-tecnico-backend-nimbus

# Instale as dependências
npm install

# Setup do banco de dados
npm run db-setup #Linux
npm run db-setup-win #Windows

# Execute a aplicação
npm run start

# O servidor inciará na porta:3333 - acesse http://localhost:3333
```

# Observação
O `postgres` roda por padrão na porta `5432`. Garanta que a porta não esteja sendo usada por outro processo.


