# L'aventure des sons

Jeu pédagogique de lecture pour tablette et téléphone : sons complexes, syllabes, lettres proches, dragon et récompenses.

## Installer sur Android avec Chrome

1. Ouvrir **https://anlito.github.io/aventure-des-sons/** dans Chrome avec Internet.
2. Attendre **Jeu prêt hors ligne** sur l'accueil.
3. Toucher **Installer le jeu**, ou ouvrir **⋮ → Ajouter à l'écran d'accueil → Installer** (le libellé varie selon Chrome).
4. Confirmer : l'icône du dragon ouvre le jeu dans sa propre fenêtre.

Chrome décide quand proposer le bouton. Il reste masqué si le jeu est déjà installé ou si Chrome ne fournit pas l'événement d'installation. Utiliser le site HTTPS, pas un fichier HTML téléchargé.

## Hors ligne et mises à jour

Le service worker précache toute l'application, les illustrations, les icônes et les 14 sons WAV. Le téléchargement initial doit réussir intégralement avant le message « prêt hors ligne ». La synthèse vocale des consignes et des mots dépend des voix françaises hors ligne installées sur Android. La police Google distante est facultative : sans connexion, une police système prend le relais.

Une nouvelle version est téléchargée avec Internet. Sur l'accueil, **Mettre le jeu à jour** active la version prête et recharge le jeu. Terminer l'exercice avant d'accepter. Les anciens caches de ce jeu sont supprimés à l'activation, les caches des autres applications sont conservés. La progression et les cadeaux dans le stockage local ne sont pas effacés. Ils restent propres à l'appareil et au navigateur et peuvent être supprimés par les réglages du navigateur ou Android.

## Maintenance

- `index.html` : manifeste, favicon, icône Apple et commandes d'installation et de mise à jour.
- `manifest.webmanifest` : identité, démarrage et périmètre relatifs compatibles avec GitHub Pages, fenêtre autonome, icônes 192/512 et maskable.
- `icons/` : dragon et décor existants avec emblème de château ; garder le sujet central dans la zone sûre maskable.
- `pwa.js` : installation Chrome, service worker et proposition de mise à jour.
- `sw.js` : augmenter **VERSION à chaque publication de contenu** ; compléter **ASSETS** pour tout nouveau fichier ou paramètre `?v=`. Le HTML et ses ressources proviennent d'une même version en cache. Les requêtes externes ne sont pas interceptées.
- Les fichiers du jeu restent `app.js`, `preview.js`, `bonus.js`, `sound-recorder.js`, les feuilles de style et `assets/`.

Publication : GitHub **Settings → Pages → Deploy from a branch → main → /(root)**. Attendre le déploiement après chaque commit.

Référence locale : **C:/Users/pc/Documents/Codex/aventure-des-sons**. Les dossiers `work/` de chat servent aux modifications intermédiaires.

## Vérifications du 23 octobre 2026

Tests automatisés dans Chrome avec profil de test et écran mobile : manifeste sans erreur, aucun obstacle d'installation signalé par Chrome, rechargement et démarrage d'exercice hors ligne, récupération hors ligne d'une illustration et d'un WAV, absence d'erreur JavaScript. Mise à jour du service worker avec conservation du stockage local et du cache d'une autre application, suppression des anciens caches du jeu. Scripts et dimensions des icônes vérifiés.

L'installation réelle sur Android et la disponibilité de sa voix française restent à vérifier sur le téléphone.
