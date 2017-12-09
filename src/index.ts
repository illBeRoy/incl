const include = (src: string): Promise<void> => {

  const existingScriptNode =
    document.querySelector(`script[src="${src}"]`);

  if (existingScriptNode === null) {

    const scriptNode = document.createElement('script');
    scriptNode.type = 'text/javascript';
    scriptNode.src = src;

    document.head.appendChild(scriptNode);

    return new Promise<void>((resolve, reject) => {

      scriptNode.onload = () => resolve();
      scriptNode.onerror = err => {

        scriptNode.parentNode.removeChild(scriptNode);
        reject(err);
      };
    });
  } else {

    return Promise.resolve();
  }
};


export {include};
