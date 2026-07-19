from pages.empresas import empresas
from pages.login import login

def main():
    if login():
        empresas()


if __name__ == "__main__":
    main()
