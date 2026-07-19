# LeadGen Automation (LGA)

Este projeto automatiza a prospecção ativa de clientes (SDR Automatizado) para a nossa software house. Ele extrai dados de empresas locais em tempo real, organiza e centraliza essas informações no Notion e utiliza Inteligência Artificial para gerar propostas comerciais personalizadas e scores de fechamento.

<h2>Fluxograma do Processo</h2>

```text
                          (II)
        API Google Places -> Claude -> neonDataBase
         |  (I)
         v
        neonDataBase
```

- **Cenário (I):**

  - **API do Google Places**: Salva os dados brutos das empresas no Notion.
  - **Notion**: Recebe e organiza os dados enviados da API Google Places, servindo como um banco de dados e uma plataforma de gerenciamento de informações.

## Como Iniciar a Aplicação

- ### Pré-requisitos
  Antes de começar, você vai precisar do [Git](https://git-scm.com/install/) e do [Python](https://www.python.org/downloads/) instalados em sua máquina.

- ### Passo a Passo

1. **Clone o repositório:**

   > **Branch main:**
     ```bash
     git clone https://github.com/ZeniteTech/LGA
     ```

    > **Branch develop:**
    ```base
    git clone https://github.com/ZeniteTech/LGA -b develop --single-branch
    ```
2. **Instale as dependências:**
   ```bash
    pip install streamlit
   ```

4. **Entre no diretório do projeto:**
   ```bash
   cd LGA
   ```
5. **Execute o programa:**
   
      **Frontend:**
    ```bash
    python -m streamlit run frontend/app.py
    ```
   
      **API:**
      ```bash
      python api/main.py
      
