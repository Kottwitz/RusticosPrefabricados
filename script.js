backend:
  name: github
  repo: seu-usuario/rusticos-site  # Altere para o seu repositório do GitHub real
  branch: main

media_folder: "img"
public_folder: "img"

collections:
  - name: "site"
    label: "Conteúdo do Site"
    files:
      - file: "conteudo.json"
        label: "Página Principal"
        name: "principal"
        fields:
          - {label: "Número do WhatsApp (ex: 554791628419)", name: "whatsapp_numero", widget: "string"}
          - {label: "WhatsApp Formatado (ex: (47) 9162-8419)", name: "whatsapp_formatado", widget: "string"}
          - {label: "Mensagem Padrão do WhatsApp", name: "whatsapp_mensagem", widget: "string"}
          - {label: "URL do Instagram", name: "instagram_url", widget: "string"}
          - {label: "Handle do Instagram (ex: @rusticos.prefabricados)", name: "instagram_handle", widget: "string"}

          - {label: "Imagem do Logótipo", name: "logo_img", widget: "image"}
          - {label: "Nome da Empresa", name: "empresa_nome", widget: "string"}
          - {label: "Subtítulo da Empresa", name: "empresa_sub", widget: "string"}

          - {label: "Título do Banner Principal (Hero)", name: "hero_titulo", widget: "string"}
          - {label: "Subtítulo do Banner Principal", name: "hero_subtitulo", widget: "text"}
          - {label: "Imagem de Fundo do Banner (Hero)", name: "hero_bg", widget: "image"}

          # Serviços (1 a 6)
          - {label: "Serviço 1 - Título", name: "servico_1_titulo", widget: "string"}
          - {label: "Serviço 1 - Descrição", name: "servico_1_desc", widget: "text"}
          - {label: "Serviço 1 - Imagem", name: "servico_1_img", widget: "image"}

          - {label: "Serviço 2 - Título", name: "servico_2_titulo", widget: "string"}
          - {label: "Serviço 2 - Descrição", name: "servico_2_desc", widget: "text"}
          - {label: "Serviço 2 - Imagem", name: "servico_2_img", widget: "image"}

          - {label: "Serviço 3 - Título", name: "servico_3_titulo", widget: "string"}
          - {label: "Serviço 3 - Descrição", name: "servico_3_desc", widget: "text"}
          - {label: "Serviço 3 - Imagem", name: "servico_3_img", widget: "image"}

          - {label: "Serviço 4 - Título", name: "servico_4_titulo", widget: "string"}
          - {label: "Serviço 4 - Descrição", name: "servico_4_desc", widget: "text"}
          - {label: "Serviço 4 - Imagem", name: "servico_4_img", widget: "image"}

          - {label: "Serviço 5 - Título", name: "servico_5_titulo", widget: "string"}
          - {label: "Serviço 5 - Descrição", name: "servico_5_desc", widget: "text"}
          - {label: "Serviço 5 - Imagem", name: "servico_5_img", widget: "image"}

          - {label: "Serviço 6 - Título", name: "servico_6_titulo", widget: "string"}
          - {label: "Serviço 6 - Descrição", name: "servico_6_desc", widget: "text"}
          - {label: "Serviço 6 - Imagem", name: "servico_6_img", widget: "image"}

          # Qualidade
          - {label: "Título da Secção Qualidade", name: "qualidade_titulo", widget: "string"}
          - {label: "Qualidade 1 - Título", name: "qual_1_titulo", widget: "string"}
          - {label: "Qualidade 1 - Descrição (Aceita HTML)", name: "qual_1_desc", widget: "string"}
          - {label: "Qualidade 2 - Título", name: "qual_2_titulo", widget: "string"}
          - {label: "Qualidade 2 - Descrição", name: "qual_2_desc", widget: "string"}
          - {label: "Qualidade 3 - Título", name: "qual_3_titulo", widget: "string"}
          - {label: "Qualidade 3 - Descrição", name: "qual_3_desc", widget: "string"}

          # Obras (1 a 4)
          - {label: "Obra 1 - Tag/Categoria", name: "obra_1_tag", widget: "string"}
          - {label: "Obra 1 - Título", name: "obra_1_titulo", widget: "string"}
          - {label: "Obra 1 - Descrição", name: "obra_1_desc", widget: "text"}
          - {label: "Obra 1 - Imagem", name: "obra_1_img", widget: "image"}

          - {label: "Obra 2 - Tag/Categoria", name: "obra_2_tag", widget: "string"}
          - {label: "Obra 2 - Título", name: "obra_2_titulo", widget: "string"}
          - {label: "Obra 2 - Descrição", name: "obra_2_desc", widget: "text"}
          - {label: "Obra 2 - Imagem", name: "obra_2_img", widget: "image"}

          - {label: "Obra 3 - Tag/Categoria", name: "obra_3_tag", widget: "string"}
          - {label: "Obra 3 - Título", name: "obra_3_titulo", widget: "string"}
          - {label: "Obra 3 - Descrição", name: "obra_3_desc", widget: "text"}
          - {label: "Obra 3 - Imagem", name: "obra_3_img", widget: "image"}

          - {label: "Obra 4 - Tag/Categoria", name: "obra_4_tag", widget: "string"}
          - {label: "Obra 4 - Título", name: "obra_4_titulo", widget: "string"}
          - {label: "Obra 4 - Descrição", name: "obra_4_desc", widget: "text"}
          - {label: "Obra 4 - Imagem", name: "obra_4_img", widget: "image"}

          # Contato & Rodapé
          - {label: "Título da Secção Contato", name: "contato_titulo", widget: "string"}
          - {label: "Texto da Secção Contato", name: "contato_texto", widget: "text"}
          - {label: "CNPJ no Rodapé", name: "footer_cnpj", widget: "string"}
          - {label: "Endereço no Rodapé", name: "footer_endereco", widget: "string"}