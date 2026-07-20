import streamlit as st

def apply_dark_theme():
    st.markdown(
        """
        <style>
        :root {
            color-scheme: dark;
        }

        html, body, .stApp, [data-testid="stAppViewContainer"], [data-testid="stMain"], .block-container {
            background-color: #0f172a !important;
            color: #f8fafc !important;
        }

        [data-testid="stHeader"] {
            background: transparent !important;
        }

        [data-testid="stSidebar"] {
            background-color: #111827 !important;
        }

        .stTextInput > div > div > input,
        .stTextArea > div > div > textarea {
            background-color: #111827 !important;
            color: #f8fafc !important;
            border: 1px solid #334155 !important;
        }

        .stButton > button {
            background-color: #2563eb !important;
            color: white !important;
            border: 1px solid #2563eb !important;
        }

        .stButton > button:hover {
            background-color: #1d4ed8 !important;
            border-color: #1d4ed8 !important;
        }
        </style>
        """,
        unsafe_allow_html=True,
    )
