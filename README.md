# LeadGen Automation (LGA)

Este projeto automatiza a prospecção ativa de clientes (SDR Automatizado) para a nossa software house. Ele extrai dados de empresas locais em tempo real, organiza e centraliza essas informações no Notion e utiliza Inteligência Artificial para gerar propostas comerciais personalizadas e scores de fechamento.

<h2>Fluxograma do Processo</h2>

```text
                          (II)
        API Google Places -> Claude -> Notion
         |  (I)
         v
        Notion
```

- **Cenário (I):**

  - **API do Google Places**: Salva os dados brutos das empresas no Notion.
  - **Notion**: Recebe e organiza os dados enviados da API Google Places, servindo como um banco de dados e uma plataforma de gerenciamento de informações.

## Como Iniciar a Aplicação

**Acesse o link abaixo:**  
https://leadgenautomation.streamlit.app/
