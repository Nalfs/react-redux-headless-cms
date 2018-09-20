
# headless cms webshop
This was project was created using strapi & mongoDB in a docker env. Frontend part was made with React-redux on a locala webpack dev server. Styling was kept at a minimum due to deadline.


## React-Adv build enviroment
* [React](https://reactjs.org/)
* [Clean for WebPack](https://github.com/johnagan/clean-webpack-plugin)
* [HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin)
* [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
* [Webpack](https://webpack.js.org/concepts/)
* [Webpack Dev Server](https://webpack.js.org/configuration/dev-server/)
* Using Babel 8 [without babel-preset-stage-x](https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets)
* [CSS Loader](https://github.com/webpack-contrib/css-loader)
* [Style Loader](https://github.com/webpack-contrib/style-loader)
* [Redux](https://redux.js.org/)
* [Redux-thunk](https://github.com/reduxjs/redux-thunk)
* Auto refresh whenever you make a change in your code
* Your source code are here `./src`:
   * HTML template `./src/index.html`
   * Styles in file `./src/styles.css`
   * Entry point `./src/index.jsx`

Tested on:
* Windows 10 (version 1803)
* MacOS High Sierra (version 10.13)
* Debian 9

## Using
* Local web server started at: `htpp://localhost:9000`
* Commands:
    * `npm run start`: start Webpack Dev Server
    * `npm run build`: compile your app with production mode in Webpack into folder `./dist`
