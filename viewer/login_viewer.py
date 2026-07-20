import streamlit as st
import os
from dotenv import load_dotenv
import time
from viewer.theme import apply_dark_theme

load_dotenv(override = True)

def login():
    apply_dark_theme()
    senha=os.getenv("LOGIN_LGA")
    if "logado" not in st.session_state:
        st.session_state.logado = False

    if st.session_state.logado:
        return True

    st.title("ZenithTech - LGA")
    st.subheader("Login de Acesso")
    input_senha = st.text_input("Informe a senha de acesso", type="password", key="senha_login")
    botao_envio = st.button("Entrar")

    if botao_envio:
        if input_senha == senha:
            st.session_state.logado = True
            st.success("Senha correta! Aguarde...")
            time.sleep(1)
            st.rerun()
        else:
            st.error("Senha incorreta.")

    return False
    
