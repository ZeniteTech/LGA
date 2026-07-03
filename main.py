from service.google_places import buscar_empresas

# Importa todos os models
# from Model.Enterprise import Enterprise


def main():
    query_busca = "Barbearias Limeira"
    print(f"Buscando leads para a query: {query_busca}")
    resultado = buscar_empresas(query_busca)
    
    lista_leads = resultado.get("results") or resultado.get("places") or []
    
    if not lista_leads:
        print("Nenhum lead encontrado.")
        return
    
    print(f"Leads encontrados: {len(lista_leads)}. Mapeando os dados:")
    
    for empresa in lista_leads:
        print(f'-'*50)
        nome = empresa.get('displayName',{}).get('text', 'Sem nome')
        print(f"Nome: {nome}")
        print(f"Endereço:{empresa.get('formattedAddress', 'Sem endereço')}")
        print(f"Telefone: {empresa.get('nationalPhoneNumber', 'Sem telefone')}")
        site = empresa.get('websiteUri')
        if site:
            print(f"Website: {site}")
        else:
            print("Website: 🚨 NÃO POSSUI SITE 🚨")
        print(f"Avaliação: {empresa.get('rating', 'Sem avaliação')}")
        print(f"Nível de Preço: {empresa.get('priceLevel', 'Sem nível de preço')}")
        print(f'-'*50)
        input("Pressione Enter para continuar...")
        
if __name__ == "__main__":
    main()