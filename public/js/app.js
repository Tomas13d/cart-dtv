function showRefreshUI(registration) {
    // TODO: Display a toast or refresh UI.
    document
      .getElementById('root')
      .insertAdjacentHTML(
        'beforeend',
        '<div class="ant-message" id="update-app-zone"><div><div class="ant-message-notice"><div class="ant-message-notice-content"><div class="ant-message-custom-content ant-message-info"><span role="img" aria-label="info-circle" class="anticon anticon-info-circle"><i class="fas fa-redo"></i></span><span>Hay una nueva version de la aplicacion, haz click aquÃ­ para actualizar</span></div></div></div></div></div>',
      );
    const element = document.querySelector('#update-app-zone .ant-message-notice');
    element.addEventListener('click', function () {
      if (!registration.waiting) {
        // Just to ensure registration.waiting is available before
        // calling postMessage()
        return;
      }
      if (window.location.href.includes('auth/login')) {
        localStorage.clear();
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf('=');
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
      }
      registration.waiting.postMessage('skipWaiting');
    });
  }
  
  function onNewServiceWorker(registration, callback) {
    if (registration.waiting) {
      // SW is waiting to activate. Can occur if multiple clients open and
      // one of the clients is refreshed.
      return callback();
    }
  
    function listenInstalledStateChange() {
      registration.installing.addEventListener('statechange', function (event) {
        if (event.target.state === 'installed') {
          // A new service worker is available, inform the user
          callback();
        }
      });
    }
  
    if (registration.installing) {
      return listenInstalledStateChange();
    }
  
    // We are currently controlled so a new SW may be found...
    // Add a listener in case a new SW is found,
    registration.addEventListener('updatefound', listenInstalledStateChange);
  }
  
  if (navigator.serviceWorker) {
    window.addEventListener('load', async function () {
      let refreshing;
      // When the user asks to refresh the UI, we'll need to reload the window
      navigator.serviceWorker.addEventListener('controllerchange', function (event) {
        if (refreshing) return; // prevent infinite refresh loop when you use "Update on Reload"
        refreshing = true;
        window.location.reload();
      });
  
      navigator.serviceWorker.register('/sw.js').then(function (registration) {
        // Track updates to the Service Worker.
        if (!navigator.serviceWorker.controller) {
          // The window client isn't currently controlled so it's a new service
          // worker that will activate immediately
          return;
        }
        registration.update();
  
        onNewServiceWorker(registration, function () {
          showRefreshUI(registration);
        });
      });
    });
  }