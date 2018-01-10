interface PromiseMap<T> {
  [key: string]: Promise<T>
}

const inclusionPromises: PromiseMap<void> = {};

const include = (src: string): Promise<void> => {

  const alreadyIncluded =
    !!(inclusionPromises[src]);

  if (alreadyIncluded) {

    return inclusionPromises[src];
  } else {

    let elementThatIncludesTheSource: HTMLElement;

    if (src.split('?')[0].endsWith('.css')) {

      elementThatIncludesTheSource = document.createElement('link');
      elementThatIncludesTheSource.setAttribute('rel', 'stylesheet');
      elementThatIncludesTheSource.setAttribute('href', src);
    } else {

      elementThatIncludesTheSource = document.createElement('script');
      elementThatIncludesTheSource.setAttribute('type', 'text/javascript');
      elementThatIncludesTheSource.setAttribute('src', src);
    }

    document.head.appendChild(elementThatIncludesTheSource);

    inclusionPromises[src] = new Promise<void>((resolve, reject) => {

      elementThatIncludesTheSource.onload = () => resolve();
      elementThatIncludesTheSource.onerror = err => {

        elementThatIncludesTheSource.parentNode.removeChild(elementThatIncludesTheSource);
        delete inclusionPromises[src];
        reject(err);
      };
    });

    return inclusionPromises[src];
  }
};


export { include };
