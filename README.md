# Ambrains  SPA

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Installation
#### To run this app, Node.js v12 or higher must be installed on your system.
1. Download and Install [Node.js](https://nodejs.org/en)
2. Clone the project from github
3. Install all packages and dependencies
```bash
  npm install
```
4. Make a copy of the `env.sample` file in the root folder, remove `.sample` extension from the file: `.env.sample -> .env`
3. Set values for all environment variables in `.env` depending on your system and configurations. See [here](#adding-custom-environment-variables) for more on environment variables.

## Running in development mode
```bash
  npm start
```
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

## Preparing for production
```bash
  npm run build
```
Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

## Ejecting
```bash
  npm run eject
```
**Note: this is a one-way operation. Once you `eject`, you cant go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Supported Browsers

By default, the generated project uses the version 16 of React.

You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.

## Adding Custom Environment Variables

**You must create custom environment variables beginning with `REACT_APP_`**. Any other variables except `NODE_ENV` will be ignored to avoid accidentally [exposing a private key on the machine that could have the same name](https://github.com/facebookincubator/create-react-app/issues/865#issuecomment-252199527). The environment variables are embedded during the build time. Changing any environment variables will require you to restart the development server if it is running. Since Create React App produces a static HTML/CSS/JS bundle, it can't possibly read them at runtime.

These environment variables will be defined for you on `process.env`. For example, having an environment
variable named `REACT_APP_SECRET_CODE` will be exposed in your JS as `process.env.REACT_APP_SECRET_CODE`.

There is also a special built-in environment variable called `NODE_ENV`. You can read it from `process.env.NODE_ENV`. When you run `npm start`, it is always equal to `'development'`, when you run `npm test` it is always equal to `'test'`, and when you run `npm run build` to make a production bundle, it is always equal to `'production'`. **You cannot override `NODE_ENV` manually.** This prevents developers from accidentally deploying a slow development build to production.

## Deployment

`npm run build` creates a `build` directory with a production build of the app.

### Static Server

For environments using [Node](https://nodejs.org/), the easiest way to handle this would be to install [serve](https://github.com/zeit/serve) and let it handle the rest:

```sh
npm install -g serve
serve -s build
```
The last command shown above will serve your static site on the port **5000**. Like many of [serve](https://github.com/zeit/serve)'s internal settings, the port can be adjusted using the `-p` or `--port` flags.

Run this command to get a full list of the options available:

```sh
serve -h
```
