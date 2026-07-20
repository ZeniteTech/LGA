import streamlit as st

def apply_dark_theme():
    st.markdown("""
    <style>

    :root{
        --bg:#0B1120;
        --surface:#111827;
        --border:#334155;
        --text:#F8FAFC;
        --muted:#94A3B8;
        --primary:#3B82F6;
        --primary-hover:#2563EB;
    }

    html,body,.stApp{
        background:var(--bg);
        color:var(--text);
    }

    [data-testid="stHeader"]{
        background:transparent;
    }

    [data-testid="stSidebar"]{
        background:var(--surface);
        border-right:1px solid var(--border);
    }

    .block-container{
        padding-top:3rem;
        max-width:1100px;
    }

    h1{
        font-size:42px;
        font-weight:700;
    }

    h2,h3{
        color:var(--text);
    }

    p,label{
        color:var(--muted);
    }

    /* INPUT */

    .stTextInput input{
        background:var(--surface);
        color:var(--text);
        border:1px solid var(--border);
        border-radius:10px;
        height:48px;
        transition:.2s;
    }

    .stTextInput input:focus{
        border:1px solid var(--primary);
        box-shadow:0 0 0 2px rgba(59,130,246,.25);
    }

    /* BOTÃO */

    .stButton > button {
    width: 100%;
    height: 46px;

    background: #2563EB !important;
    color: #FFFFFF !important;

    border: none !important;
    border-radius: 10px;

    font-weight: 600 !important;
    opacity: 1 !important;
}

    .stButton > button:hover {
    background: #1D4ED8 !important;
    color: #FFFFFF !important;
}

.stButton > button p {
    color: #FFFFFF !important;
}

.stButton > button:disabled {
    opacity: .6;
}

    /* CARD */

    div[data-testid="stVerticalBlockBorderWrapper"]{
        border:1px solid var(--border)!important;
        border-radius:14px!important;
        background:var(--surface)!important;
        padding:12px;
    }

    a{
        color:#60A5FA;
    }

    </style>
    """, unsafe_allow_html=True)
