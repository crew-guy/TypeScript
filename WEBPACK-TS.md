
![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4a249adc-78d7-4bc7-8a21-c697507e8b04/Screenshot_from_2021-05-03_17-43-39.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4a249adc-78d7-4bc7-8a21-c697507e8b04/Screenshot_from_2021-05-03_17-43-39.png)

Decrease amount of time taken to load page by decreasing number of HTTP requests (1 request per JS file).
These JS files are small so they can be **bundled into a single file** that encounters **only 1 HTTP request** to load all the JS for the app 

--save-dev **OR** -D ⇒ used as keyword to install 3rd party libs that don't provide functionalities we use in our code, but help us set up our project workflow and configuration that makes development very efficient

```bash
npm i --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader
```

What each package does 

1. webpack ⇒ tool that helps us to plug in certain functionalities to bundle our code and to **transform our code.** Here, we can make it do 2 things
    - transpile TS to JS
    - bundle JS
2. webpack-cli ⇒ run webpack commands from cli
3. webpack-dev-server ⇒ built in development server which 
    - watches our files for changes
    - auto-triggers webpack to recompile if something changes
    - serves our page
4. typescript ⇒ installed to transpile TS to JS using that `tsc` command 
5. ts-loader ⇒ tells webpack how to convert TS into JS

### webpack.config.js

in tsconfig.json file, set target and module to latest or legacy version to fix what will be the version of JS your code gets bundled into 

1. Uses Node JS's functionality by exporting a JS **configuration object** that will be picked up by Webpack
2. Set `entry` and `output` file paths using **path** module of node JS
3. Set `module` which is basically just a file at the end of the day. It is a property of this **configuration object** that webpack will export that takes in a JS object specifying some rules that will apply on the entry file to transform, bundle it using webpack
4. Add ****`rules` **array** inside `module` cause there are gonna be multiple rules that you might need to apply to all the files (for SCSS, TS etc.)
5. Each **rule** will have 
    - a `test` property that maps to a file or not based on a **regex**.
    - It will also have a `use` property that will tell webpack what to do ( eg: how to load) to the files that satisfy the **test** property's regex
    - Can even `exclude` webpack from even bothering to check for files inside certain folders. eg : we don't want to check only, for TS files inside the `node_modules` folder
6. Set a `resolve` property to tell webpack to add certain file extensions (.js) to its area of consideration and at the end, bundle all TS and JS files' output files together
7. Set  `sourceMap` property inside tsconfig to true to help us debug our code
8. Also, add a `devtool` property to the webpack configuration object and set its property to `'inline-source-map'` to tell webpack that there will be generated source maps already that it should extract and wire up correctly to the bundle it generates.
So while we have a minified JS bundle, optimized for **production**, we also get individual TS file debugging, which leads to a great **development** experience
9. Add an npm script that calls the `webpack` command which'll transform and bundle our code as per the rules in the webpack **configuration object**
10. Add a `dist` property to the webpack configuration object's `output` to tell webpack-dev-server (WDS) where it can find our assets eg. our bundle.js file.
This helps the WDS understand where the output is really written to and where it is, relative to the *index.html* file, cause by default, WDS checks only the project's root directory for assets

    ```jsx
    const path = require('path');

    module.exports = {
      mode: 'development',
      entry: './src/app.ts',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist'
      },
      devtool: 'inline-source-map',
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
          }
        ]
      },
      resolve: {
        extensions: ['.ts', '.js']
      }
    };
    ```

11. Add `mode` property to this webpack object appropriately to tell webpack to tell webpack which kind of mode it is building for
eg : webpack will do fewer optimizations and give better error messages if mode is **development**

### webpack.config.prod.js

1. Can name this anything as webpack won't look for it by default
2. Do not require `publicPath` property in `output` as for production, we won't be running our code using WDS
3. Set `devtool`  to none as you won't need source maps
4. **Plugins ⇒** extra extensions that can be added to your webpack workflow which will basically be applied to the entire project output, general workflow
**Rules, Modules ⇒** Applied on a per file level
5. Add the `clean-webpack-plugin` package to clean the `dist` (our destination) folder everytime we rebuild our project  
6. Just instantiate the class this package exposes inside our `plugin` property to tell webpack to clean `dist` folder before rebuilding our project
7. Finally, just modify the `build` script inside package.json to use this **webpack.config.prod.js** file for building our production output by specifying so :

```json
"build": "webpack --config webpack.config.prod.js"
```

```bash
npm i --save-dev clean-webpack-plugin
```

```jsx
const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin()
  ]
};
```
