import re
from service.google_places import buscar_empresas
import streamlit as st

def lga_viewer():
    st.title("LeadGen Automation (LGA)")
    st.subheader("Prospecção Ativa Inteligente")

    # 1. Caixa de texto e Botão de Busca
    query = st.text_input("Digite sua query de busca (ex: Escritórios de Advocacia em Limeira):")
    botao_buscar = st.button("Buscar Leads")

    # Inicializa um estado para guardar os leads entre cliques de botões
    if "leads" not in st.session_state:
        st.session_state.leads = []

    if botao_buscar and query:
        with st.spinner("Buscando no Google Places..."):
            resultado = buscar_empresas(query)
            st.session_state.leads = resultado.get("places", [])

    # 2. Listagem dos resultados com opção de seleção
    if st.session_state.leads:
        st.write(f"### Foram encontrados {len(st.session_state.leads)} leads:")
        
        leads_selecionados = []
        
        for i, empresa in enumerate(st.session_state.leads):
            nome = empresa.get('displayName', {}).get('text', 'Sem Nome')
            site = empresa.get('websiteUri')  # Pegamos bruto para validar abaixo
            telefone = empresa.get('nationalPhoneNumber', 'Sem telefone')
            telefone_whatsapp = "+55" + re.sub(r'\D', '', telefone)  # Remove tudo que não é número para o link do WhatsApp

            # --- CRIAÇÃO DA CAIXINHA (CARD) ---
            # Tudo que for identado dentro deste 'with' ficará na mesma div/card
            with st.container(border=True):
                
                # Cria colunas internas dentro da caixinha
                col_check, col_texto = st.columns([1, 22])

                with col_check:
                    # Centraliza levemente o checkbox adicionando um pequeno espaçamento no topo
                    st.markdown("<div style='padding-top: 10px;'></div>", unsafe_allow_html=True)
                    selecionado = st.checkbox("", key=f"lead_{i}")

                with col_texto:
                    # Formata o link do site ou exibe o alerta em vermelho
                    if site:
                        site_formatado = f"🌐 [{site}]({site})"
                    else:
                        site_formatado = "🌐 <span style='color:#ff4b4b; font-weight:bold;'>Não encontrado</span>"
                    
                    st.markdown(f"""
                    <style>
                       a.link-google:hover{{
                           color:#ff4b4b;
                           text-decoration:none;
                           font-weight:bold;
                       }}

                        a.link-google{{
                            color:white;
                            font-size:19px;
                            font-weight:bold;
                            text-decoration:none;
                        }}             
        
                        a.link-whatsapp:hover{{
                            color:#25D366;
                            text-decoration:none;
                            font-weight:bold;                     
                        }}
                                
                        a.link-whatsapp{{
                            color:white;
                            font-size:17px;
                            font-weight:bold;
                            text-decoration:none;
                        }}
                    </style>
                                              
                    <a class="link-google"
                    href="https://www.google.com/search?q={nome.replace(' ', '+')}"
                    target="_blank">
                    {nome}
                    </a>
                    <br>
                    {site_formatado}  
                    <a class="link-whatsapp" 
                    href="https://web.whatsapp.com/send?phone={telefone_whatsapp}" target="_blank">
                        📞 {telefone}
                    </a>
                    """, unsafe_allow_html=True)

            # Se o usuário marcou o checkbox daquela linha, adiciona na lista
            if selecionado:
                leads_selecionados.append(empresa)

            # Um pequeno espaçamento entre uma caixinha e outra (substituindo a linha antiga)
            st.markdown("<div style='margin-bottom: 10px;'></div>", unsafe_allow_html=True)
