# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

### Déploiement sur Vercel (recommandé)

1. Allez sur [vercel.com](https://vercel.com) et connectez-vous avec GitHub.
2. **New Project** → importez le dépôt **bkande1601-collab/proxi22M**.
3. Vercel détecte automatiquement Vite ; gardez **Build Command** : `npm run build`, **Output Directory** : `dist`.
4. Cliquez sur **Deploy**. Chaque push sur `main` déclenchera un nouveau déploiement.

En local, après des changements :
```sh
git add .
git commit -m "Votre message"
git push origin main
```

### Push vers GitHub (authentification)

Le dépôt distant est : **https://github.com/bkande1601-collab/proxi22M.git**

Pour pousser, il faut utiliser le compte **bkande1601-collab** (pas bkande-alt). Options :

- **Option A – Token HTTPS**  
  1. GitHub → Settings → Developer settings → [Personal access tokens](https://github.com/settings/tokens) → Generate new token (classic), cochez `repo`.  
  2. Lors du premier `git push`, utilisez comme mot de passe le **token** (pas votre mot de passe GitHub).

- **Option B – SSH**  
  Configurez une clé SSH pour **bkande1601-collab** et changez le remote :
  ```sh
  git remote set-url origin git@github.com:bkande1601-collab/proxi22M.git
  git push -u origin main
  ```

---

Vous pouvez aussi utiliser [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) et Share → Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
