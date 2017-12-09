incl
====

[![Travis](https://img.shields.io/travis/illberoy/incl?style=flat-square)](https://travis-ci.org/illberoy/incl)

Handle your runtime cdn dependencies with care, and never again embed them using script tags.

incl handles runtime cdn dependencies for you, makes sure to not include any dependency more than once, and provides you with promise-based interface to monitor whether their inclusion was successful or not.

incl contains built-in type declarations, and can be used with typescript.


## Installation
Using your favorite package manager, either:

`$ npm install -s incl`

Or:

`$ yarn add incl`


## Quickstart
You can use it the old fashioned `then` \ `catch` way:

```javascript
import { include } from 'incl';

include('//static.parastorage.com/services/js-sdk/1.89.0/js/wix.min.js')
	.then(() => Wix.requestLogin())
	.catch(() => window.location.href = '/err/500');
```
	
Or the more recent `async` \ `await` way:

```javascript
import { include } from 'incl';

const main = async () => {
	
	try {
	
		await include('//static.parastorage.com/services/js-sdk/1.89.0/js/wix.min.js');
		Wix.requestLogin();
	} catch (err) {
	
		window.location.href = '/err/500';
	}
};

main();
```


## License
Available to all under MIT license.