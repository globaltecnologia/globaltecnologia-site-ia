# Site Global Tecnologia — Repositório Versionado 🚀

Site estático da Global Tecnologia (HTML/CSS/JS), deploy na **Cloudflare Pages**.

## Estrutura de Ambientes

| Ambiente | Branch | Domínio | URL Preview | Deploy |
|----------|--------|---------|-------------|--------|
| **Staging** | `staging` | Nenhum | Auto gerada pelo Pages | Push + manual |
| **Produção** | `main` | `www.globaltecnologia.net` | — | Push + manual |

> DNS fica na **Locaweb**. CNAME `www` → `<hash>.pages.dev`.
> Domínio custom registado automaticamente via GitHub Actions.

## Deploy Manual

```bash
# Produção
npx wrangler pages deploy . --project-name siteglobal --branch main

# Staging (preview URL)
npx wrangler pages deploy . --project-name siteglobal --branch staging
```

## Variáveis de Ambiente

Os ficheiros `.env` definem configuração por ambiente. Nunca versionar os `.local`.

- `.env.production` — config base para produção
- `.env.staging` — config base para staging
- `.env.local` / `.env.production.local` — segredos (não versionados)
- `CLOUDFLARE_API_TOKEN` → definir nos **GitHub Secrets**

## Regras

- CSS e JS em ficheiros separados (não inline).
- Logo: `images/logo-global-tecnologia.png`.
- Paleta: `#003366`, `#2E8BC0`, `#4DA8DA`.
- Iframe da Isa: configurável via `.env` (`ISA_IFRAME_URL`).

## Pendência DNS (Locaweb)

Redirecionamento da raiz `globaltecnologia.net` → `www.globaltecnologia.net`.
A Locaweb não aceita CNAME na raiz — configurar no painel como redirecionamento 301.
