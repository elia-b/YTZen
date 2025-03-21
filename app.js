function executeOnLoad() {
  const targetNode = document.querySelector("ytd-app");
  if (targetNode) {
    const config = {
      childList: true,
      subtree: true,
    };
    let observer = new MutationObserver(polishYoutube);
    observer.observe(targetNode, config);
    polishYoutube();
  } else {
    setTimeout(function () {
      executeOnLoad();
    }, 100);
  }
}

function removeAdSlots() {
  console.log("Removing all ad slots");
  const adTag = [
    "ytd-ad-slot-renderer",
    "ytd-action-companion-ad-renderer",
    "player-ads",
    "engagement-panel-ads",
    "ytd-player-legacy-desktop-watch-ads-renderer"
  ];
  adTag.forEach((element) => {
    const adSlots = document.querySelectorAll(element);

    adSlots.forEach((adSlot) => {
      adSlot.parentNode.removeChild(adSlot);
    });
  });
}

function removeShorts() {
  console.log("Removing all shorts");
  const shorts = document.querySelectorAll('[is-shorts=""]');

  shorts.forEach((short) => {
    short.parentNode.removeChild(short);
  });
}

function polishYoutube() {
  removeAdSlots();
  removeShorts();
}

function redirectToSubscriptions() {
  if (
    window.location.hostname === "www.youtube.com" &&
    window.location.pathname === "/"
  ) {
    window.location.href = "https://www.youtube.com/feed/subscriptions";
  }
}

let previousUrl = "";

let urlObserver = new MutationObserver(function (mutations) {
  if (location.href !== previousUrl) {
    previousUrl = location.href;
    console.log(`URL data changed to ${location.href}`);
    redirectToSubscriptions();
    executeOnLoad();
  }
});

const urlConfig = { attributes: true, childList: true, subtree: true };
urlObserver.observe(document, urlConfig);
