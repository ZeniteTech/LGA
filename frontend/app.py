from frontend.pages import buscar_empresas
import streamlit as st
from frontend.pages.login import login
from frontend.pages.buscar_empresas import buscar_empresas

def main():
    if login():
        buscar_empresas()


if __name__ == "__main__":
    main()
