# Currency-Converter
Currency-Converter converts all currency exchange rates with each other. It uses Exchange Rates Data API from APILayer to convert all currencies over the world. It does the conversion on the latest pricing and is based on react.js.

## Getting Started
### Demo
![1](https://user-images.githubusercontent.com/54478287/175783733-9b04d87b-2522-4ebc-92b3-f38d5a61d50f.png)

![2](https://user-images.githubusercontent.com/54478287/175783736-b17ef99e-4b91-4c53-a7a2-a819143e18ae.png)

![3](https://user-images.githubusercontent.com/54478287/175783742-f07a343c-cd94-4bf7-8a81-e75dabe0b6fe.png)

### Prerequisites
Get a free API Key at [https://apilayer.com/marketplace/exchangerates_data-api](https://apilayer.com/marketplace/exchangerates_data-api).
You should have node.js and npm installed in your environment.

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/itsarshadahmad/currency-converter.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your API in `App.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```
   
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
