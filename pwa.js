/* Installation et mises à jour, sans toucher à la progression. */
(() => {
  const install = document.getElementById('installApp');
  const update = document.getElementById('updateApp');
  const status = document.getElementById('pwaStatus');
  let promptEvent;
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault(); promptEvent = event;
    if (!matchMedia('(display-mode: standalone)').matches) install.hidden = false;
  });
  install.addEventListener('click', async () => {
    if (!promptEvent) return;
    const event = promptEvent; promptEvent = null; install.hidden = true;
    try { await event.prompt(); await event.userChoice; }
    catch (error) { console.warn('Installation indisponible', error); }
  });
  window.addEventListener('appinstalled', () => { install.hidden = true; promptEvent = null; });
  if (!('serviceWorker' in navigator)) return;
  let reloading = false;
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (reloading || !hadController) return;
    reloading = true; location.reload();
  });
  navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).then(reg => {
    const offerUpdate = () => {
      if (!reg.waiting || !navigator.serviceWorker.controller) return;
      update.hidden = false;
      update.onclick = () => reg.waiting?.postMessage({ type: 'SKIP_WAITING' });
    };
    offerUpdate();
    reg.addEventListener('updatefound', () => {
      const worker = reg.installing;
      worker?.addEventListener('statechange', () => {
        if (worker.state === 'installed') offerUpdate();
      });
    });
    navigator.serviceWorker.ready.then(() => {
      status.textContent = '✓ Jeu prêt hors ligne · les voix de lecture dépendent du téléphone.';
    });
    window.addEventListener('online', () => reg.update().catch(console.warn));
  }).catch(error => {
    status.textContent = 'Le mode hors ligne n’a pas pu être préparé. Réessaie avec une connexion.';
    console.warn('Service worker', error);
  });
})();
