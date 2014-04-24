Lumbergh
========

It'll be fine. - Bill, QA officer on the Titanic

========

This is a QA focused gulpfile. It doesn't refresh your pages or concatenate/minify files.
It runs the various linters (js,css,html) and validators (w3cjs) to help you check your code. Lumbergh goes through your html/css/js files and creates JSON files with the results. Then we use [http://handlebarsjs.com/](Handlebars) to render the JSON.


## Setup
(*run these commands in the terminal*)

1. First you have to have Node.js installed. Installation and instructions can be found here: [Node.js](http://nodejs.org/)
2. Install gulp.js globally with: ```npm install -g gulp```
3. Navigate to your project directory (e.g. ```cd Desktop/myproject```) and install gulp inside of your project with: ```npm install --save-dev gulp```
4. Install the plugins with: ```npm install```. This will install all plugins that are saved in the package.json. You shouldn't need to mess with the package.json file unless you're going to add new plugins.
5. Run ```gulp generate-reports```. This will inspect your files and generate the reports.
6. Run ```gulp server```. This spins up a local server so you can see the reports.
7. Point your browser to **localhost:9000**

**Note:** I have a small sample project already in the build folder so you can see what the reports look like.

## Using The Reports
Lumbergh was made solely to analyze your project and help you find errors, give you hints for better code, and provide a snapshot of your styles. It will NOT concatenate or minify things. It won't process your Sass or LESS files. It's made to check the compiled/finished CSS and HTML files. It hasn't been setup yet for PHP files either, still working on that.

There are two ways of using Lumbergh. One is to run it on local files that you're working on. The other is to pull files from a live site using the crawler. Lumbergh operates under the assumption that your "ready to inspect" files live in the **build** folder, usually they're the compiled files from the src folder. The crawler automatically puts files into the build folder. If this isn't how your project structure is setup, feel free to fork the repo and change the gulpfile.

### Available tasks:

1. ```gulp generate-reports```: This is the most used task. It generates all reports.
2. ```gulp wildstyle```: Generates the CSSLint report.
3. ```gulp stylestats```: Generates the StyleStats report.
4. ```gulp jshint```: Generates the JSHint report.
5. ```gulp markymark```: Generates the HTML report.
6. ```gulp server```: Runs web server to see reports. URL is - **localhost:9000**.

## Crawling a remote site

To run the crawler, use this command: ```node crawler http://yoururl.com```

This will pull down all of the HTML/CSS/JS files into the build folder. From here you can run the gulp commands and generate the reports.
