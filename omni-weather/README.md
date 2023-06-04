
# Omni Weather

Omni-Weather is a web app that shows the weather and conditions of cities. It changes its background image based on weather and then based on the background image text colors change.

## Getting Started
### Demo

![1](https://user-images.githubusercontent.com/54478287/175925423-9aba0aa2-5379-4035-b7bc-c763e7350572.png)

![2](https://user-images.githubusercontent.com/54478287/175925538-33356196-fdeb-4c59-b123-7453aa861f21.png)

![3](https://user-images.githubusercontent.com/54478287/175925612-d6625151-c1d0-4016-a9e6-c703687a75e4.png)

![4](https://user-images.githubusercontent.com/54478287/175925729-2be84802-8674-4f5c-a7a4-eebcdcd53f38.png)

![5](https://user-images.githubusercontent.com/54478287/175925836-8f90b222-8d4e-4c75-b8f2-663184707ec7.png)


### Prerequisites
* RapidAPI key
* Unsplash API key
* Node.js and npm

### Installation

1. Get a free API Key at [RapidAPI](https://rapidapi.com/community/api/open-weather-map).

2. Get a free API Key at [Unsplash](https://unsplash.com/developers).

3. Clone the repo
   ```sh
   git clone https://github.com/itsarshadahmad/omni-weather.git
   ```

4. Install NPM packages
   ```sh
   npm install
   ```

5. Enter your RapidAPI key in `App.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

6. Enter your Unsplash API key in `Weather.js`
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
