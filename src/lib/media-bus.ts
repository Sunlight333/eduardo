// Garante que apenas uma mídia toque por vez: quando um player começa, os
// demais recebem o aviso e pausam.
const EVENT = "er:media-play";

export function announcePlay(sourceId: string) {
  window.dispatchEvent(new CustomEvent<string>(EVENT, { detail: sourceId }));
}

export function onOtherMediaPlay(sourceId: string, callback: () => void) {
  const handler = (event: Event) => {
    if ((event as CustomEvent<string>).detail !== sourceId) callback();
  };
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
