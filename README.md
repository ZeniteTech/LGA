# 🚀 LeadGen Automation (LGA) — Frontend

![Status](https://img.shields.io/badge/status-em_desenvolvimento-orange)

O **LeadGen Automation (LGA)** é uma aplicação voltada para a automação da prospecção ativa de clientes (SDR Automatizado). O sistema permite extrair dados de empresas locais em tempo real via **Google Places API**, visualizar e gerenciar esses leads através de uma interface interativa e utilizar **Inteligência Artificial (Claude AI)** para a geração automática de propostas comerciais personalizadas e análise de *score* de fechamento.

Esta aplicação frontend conecta-se a uma **API backend em Java**, que centraliza as regras de negócio, a orquestração de chamadas e o controle de acesso e persistência no banco de dados.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** Streamlit / Python
- **Backend / Persistência:** API REST em Java / Spring Boot
- **Banco de Dados:** PostgreSQL (Neon.tech)
- **Integrações Externas:** Google Places API & Claude AI (Anthropic)

---

## 📐 Arquitetura do Sistema

```text
[ Usuário ] 
    │
    ▼
[ Frontend Streamlit (LGA) ]
    │
    ▼
[ Backend Java API (LGA_API) ]
    ├──► Google Places API (Extração de Leads em Tempo Real)
    ├──► Claude AI (Análise de Perfil & Propostas Personalizadas)
    └──► Neon PostgreSQL (Persistência & Gestão de Dados)
```

1. **Extração de Leads:** A aplicação solicita buscas de empresas locais via API do Google Places através da API Java.

2. **Processamento com IA:** Os dados coletados são enviados ao Claude AI para gerar propostas comerciais inteligentes e calcular o score de propensão de fechamento.

3. **Persistência Centralizada:** As informações e históricos de prospecção são gerenciados pela LGA_API (Java) e armazenados em banco relacional PostgreSQL (Neon).

## 🚀 Como Iniciar a Aplicação

**1. Clonar o Repositório**
   ```bash
   git clone https://github.com/GOLDOLA007/LGA.git
   cd LGA
   ```
**2. Installe o npm e rode a aplicação**
   ```bash
   npm install
   npm run dev
   ```

## 📌 Funcionalidades Principais
🔍 **Prospecção Ativa:** Busca parametrizada por segmento e localização.

🤖 **Enriquecimento com IA:** Geração automática de propostas customizadas e pontuação de leads.

📊 **Gestão de Leads:** Interface visual para acompanhar o funil de vendas sem dependência de plataformas externas como o Notion.

🔒 Integração Segura: Comunicação estruturada via DTOs/REST com a LGA_API em Java.

## 🤝 Repositórios Relacionados
**Backend (API Java):** [LGA_API](https://github.com/ZeniteTech/LGA_API)
