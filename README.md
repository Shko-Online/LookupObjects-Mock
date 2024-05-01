
# Lookup Objects Mock

Mocking PCF [`lookupObjects`](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/utility/lookupobjects) to simplify writing stories for your components.


## Screenshots

![LookupScreenshot](https://github.com/Shko-Online/LookupObjects-Mock/assets/107688754/1e47b1e4-021c-430f-aa29-6a992748f396)

## Usage
First you should install `@shko.online/lookupobjects-mock` in your project:

```cmd
npm i -D @shko.online/lookupobjects-mock
```

then in your story you add the following call:

```javascript
import mockLookupObjects from '@shko.online/lookupobjects-mock'
// ...

//before executing Init exectute mockLookupObjects()
// ...
    mockLookupObjects(mockGenerator);
    mockGenerator.ExecuteInit();
// ...
```


## License

[MIT](https://github.com/Shko-Online/LookupObjects-Mock/blob/main/LICENSE)

