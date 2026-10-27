<p align="center">
    <i>🚀 <a href="https://keycloakify.dev">Keycloakify</a> v11 starter 🚀</i>
    <br/>
    <br/>
</p>

# Quick start

```bash
git clone https://github.com/keycloakify/keycloakify-starter
cd keycloakify-starter
yarn install # Or use an other package manager, just be sure to delete the yarn.lock if you use another package manager.
```

# Testing the theme locally

[Documentation](https://docs.keycloakify.dev/testing-your-theme)

# How to customize the theme

[Documentation](https://docs.keycloakify.dev/customization-strategies)

# Esportare i temi: solo ZIP

Il formato da consegnare e installare per questo progetto e **sempre ZIP con le
cartelle dei temi**, non JAR. Keycloakify genera dei JAR durante la build: sono
solo intermedi dai quali ricavare gli ZIP, non pacchetti da distribuire.

I temi inclusi sono:

| Theme name | Login | Email |
| --- | --- | --- |
| `onit` | Yes | Yes |
| `onit-operations` | Yes | Yes |
| `onit--provider-only` | Yes (identity providers only) | No |
| `onit-support` | Yes | Yes |

## Prerequisiti in WSL Debian

Su Windows eseguire la build dentro WSL Debian, senza installare Java o Maven
su Windows. Nel terminale Debian:

```bash
sudo apt-get update
sudo apt-get install -y nodejs npm default-jdk-headless maven zip unzip
```

Usare Node.js 20 o superiore. Lavorare in una copia del progetto nel filesystem
Linux, includendo le modifiche da esportare ma escludendo `node_modules`, `dist`
e `dist_keycloak` di Windows. Non riutilizzare le dipendenze Windows in Linux.

## Build e creazione degli ZIP

Dalla radice della copia Linux del progetto, eseguire in Bash:

```bash
npm ci
npm run build-keycloak-theme
```

**Il comando di build da solo non genera gli ZIP.** Dopo ogni build eseguire anche
questi comandi per crearli dai JAR appena prodotti:

```bash
(
    set -eu
    output_dir="$(pwd)/dist_keycloak"
    temp_dir="$(mktemp -d)"
    trap 'rm -rf -- "$temp_dir"' EXIT

    for target in 22-to-25 all-other-versions; do
        mkdir "$temp_dir/$target"
        unzip -q "$output_dir/keycloak-theme-for-kc-$target.jar" \
            'theme/*' -d "$temp_dir/$target"
        zip_path="$output_dir/onit-themes-for-kc-$target.zip"
        rm -f -- "$zip_path"
        (
            cd "$temp_dir/$target/theme"
            zip -qr "$zip_path" .
        )
    done
)
```

Consegnare solo lo ZIP adatto alla versione del server:

| Versione Keycloak | ZIP in `dist_keycloak` |
| --- | --- |
| 22-25 | `onit-themes-for-kc-22-to-25.zip` |
| Altre versioni supportate | `onit-themes-for-kc-all-other-versions.zip` |

Ogni ZIP deve contenere direttamente alla radice:

```text
onit/
onit-operations/
onit--provider-only/
onit-support/
```

Non includere la cartella contenitore `theme/` ne i metadati `META-INF/`.
Se la build viene eseguita in WSL, copiare **solo gli ZIP** nella cartella
`dist_keycloak` del progetto Windows per la consegna.

## Installazione sul server

Estrarre lo ZIP appropriato nella directory `themes` di Keycloak: ad esempio
`themes/onit/login/theme.properties` deve esistere dopo l'estrazione.
Riavviare Keycloak e selezionare i nomi della tabella nelle impostazioni dei temi
del realm. `onit--provider-only` e disponibile solo come tema login.

Non installare anche un JAR che contenga gli stessi temi.

Per modificare le versioni supportate dalla build, vedere la
[documentazione Keycloakify](https://docs.keycloakify.dev/features/compiler-options/keycloakversiontargets).

# Initializing the account theme

```bash
npx keycloakify initialize-account-theme
```

# Initializing the email theme

```bash
npx keycloakify initialize-email-theme
```

# GitHub Actions

La pipeline ereditata dallo starter genera e pubblica ancora JAR quando viene
incrementata la versione in `package.json`. **Non usarla per consegnare i temi
di questo progetto nello stato attuale**: per pubblicare ZIP deve essere
aggiornata con la conversione descritta sopra e con gli ZIP come allegati della
release. Questa modifica al README non cambia il comportamento della pipeline.

To enable the workflow go to your fork of this repository on GitHub then navigate to:
`Settings` > `Actions` > `Workflow permissions`, select `Read and write permissions`.
