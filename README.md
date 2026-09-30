# SiteGlobal 🌐

Código do **site institucional da Global Tecnologia** (globaltecnologia.net).

> ⚠️ **Projeto-superado** — o repositório versionado atual é [**`globaltecnologia-site-ia`**](../globaltecnologia-site-ia/). Esta pasta é a cópia de trabalho/legado usada para deploys manuais via wrangler.

## Tecnologia
- **Estático:** HTML5 + CSS + JavaScript (sem framework)
- **Paleta:** `#003366`, `#2E8BC0`, `#4DA8DA`
- **Logo:** `images/logo-global-tecnologia.png`
- **Iframe da Isa:** configurável via `.env` (`ISA_IFRAME_URL`)
- **Deploy:** Cloudflare Pages via `wrangler`

## Repositório (sucessor)
- **Canônico:** `https://github.com/globaltecnologia/globaltecnologia-site-ia`
- Este diretório local não tem git remote (cópia manual)

## Portas (deploy)
- Não roda em porta local — conteúdo publicado via Cloudflare Pages
- Preview URLs geradas pelo Pages (`<hash>.siteglobal-9r1.pages.dev`)

## Ambientes
| Ambiente | Branch | Domínio |
|----------|--------|---------|
| Produção | `main` | `www.globaltecnologia.net` |
| Staging (preview) | `staging` | URL preview do Pages |

## Deploy (manual, via questo desta pasta)
```bash
npx wrangler pages deploy . --project-name siteglobal --branch main
npx wrangler pages deploy . --project-name siteglobal --branch staging
```

## Tokens e Chaves
- **Cloudflare OAuth (wrangler):** `~/.wrangler/config/default.toml` na máquina do Alexandre
- **Account ID:** `18a324c1eb5c661113310d978ffb152b`
- **Repo central:** `/data/workspace/projects/agentes/devops/secrets/cloudflare/`

## Estrutura
```
SiteGlobal/
├── css/
├── images/           # logo, imagens
├── javascript/
├── index.html
└── README.md
```

## Pendências
- Rascunho anterior (referência): `projetos/siteglobal_old` (Next.js 16 + Tailwind 4)
- Consumir conteúdo/logo de `projetos/agentes/siteglobal`
