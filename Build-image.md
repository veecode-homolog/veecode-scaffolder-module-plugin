## 📦 Empacotando como Plugin Dinâmico (Dynamic Plugin)

Este repositório está preparado para exportar o plugin como dinâmico, compatível com carregamento externo no Red Hat Developer Hub (RHDH) ou plataformas derivadas como o Cokar.

### 1. Build e exportação do plugin dinâmico

```bash
yarn build-dynamic-plugin
```

Esse comando compila o TypeScript (`tsc`) e exporta o plugin como dinâmico para a pasta `dist-dynamic/`.

---

## 🐳 Empacotando como Imagem OCI e publicando no Docker Hub

### 2. Empacotar a imagem OCI com base na versão do `package.json`

```bash
VERSION=$(jq -r .version package.json)

npx @janus-idp/cli@latest package package-dynamic-plugins \
  --tag docker.io/${DOCKER_USERNAME}/backstage-veecode-extensions:v$VERSION
```

> Gera a imagem

---

### 3. Criar tag `latest` (opcional, mas recomendada)

```bash
podman tag docker.io/${DOCKER_USERNAME}/backstage-veecode-extensions:v$VERSION \
             docker.io/${DOCKER_USERNAME}/backstage-veecode-extensions:latest
```

---

### 4. Publicar as imagens no Docker Hub

```bash
podman push docker.io/${DOCKER_USERNAME}/backstage-veecode-extensions:v$VERSION
podman push docker.io/${DOCKER_USERNAME}/backstage-veecode-extensions:latest
```

---

## 🧩 Ativando o plugin no RHDH

No `dynamic-plugins.yaml`, adicione:

```yaml
plugins:
  - package: oci://docker.io/${DOCKER_USERNAME}/backstage-veecode-extensions:${PLUGIN_VERSION}$!veecode-platform-backstage-plugin-scaffolder-backend-module-veecode-extensions
    disabled: false
```

---

## 🧼 Limpeza

```bash
rm -rf dist dist-types dist-dynamic embedded
```

---

##
