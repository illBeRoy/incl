const include = (src: string): Promise<void> => {

  const existingImportNode =
    document.querySelector(`script[src="${src}"], link[href="${src}"]`);

  if (existingImportNode === null) {

    let importNode: HTMLElement;

    if (src.split('?')[0].endsWith('.css')) {

      importNode = document.createElement('link');
      importNode.setAttribute('rel', 'stylesheet');
      importNode.setAttribute('href', src);
    } else {

      importNode = document.createElement('script');
      importNode.setAttribute('type', 'text/javascript');
      importNode.setAttribute('src', src);
    }

    document.head.appendChild(importNode);

    const inclusionPromise = new Promise<void>((resolve, reject) => {

      importNode.onload = () => resolve();
      importNode.onerror = err => {

        importNode.parentNode.removeChild(importNode);
        reject(err);
      };
    });

    importNode['__promise'] = inclusionPromise;

    return inclusionPromise;
  } else {

    return existingImportNode['__promise'] || Promise.resolve();
  }
};


export { include };
