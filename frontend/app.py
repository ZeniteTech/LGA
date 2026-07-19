import streamlit as st
from viewer.lga_viewer import lga_viewer
from viewer.login_viewer import login


def main():
    if login():
        lga_viewer()


if __name__ == "__main__":
    main()
