
# Lookup Objects Mock

Mocking PCF [`lookupObjects`](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/utility/lookupobjects) to simplify writing stories for your components.


## Screenshots

![LookupScreenshot](https://github.com/Shko-Online/LookupObjects-Mock/assets/107688754/1e47b1e4-021c-430f-aa29-6a992748f396)

## Run Locally

Clone the project

```bash
  git clone https://github.com/Shko-Online/LookupObjects-Mock
```

Go to the project directory

```bash
  cd LookupObjects-Mock
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run storybook
```


## Build

To deploy this project run

```bash
  npm run build
```


## Usage

```javascript
//before executing Init exectute mockLookupObjects()
...
    mockLookupObjects(mockGenerator);
    mockGenerator.ExecuteInit();
...
```


## License

[MIT](https://github.com/Shko-Online/LookupObjects-Mock/blob/main/LICENSE)

