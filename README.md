Lumbergh
========

That should do it. - Bill, QA officer on the Titanic

========

This is a QA focused gulpfile. It doesn't refresh your pages or concatenate/minify files.
It runs the various linters (js,css,html) and validators (w3cjs) to help you check your code.
This can be combined with other gulpfiles like my production gulpfile found here: [put link here]


## Crawling remote site

Before you can QA a live site, you'll first need to run the crawler to download all of the pages / assets.

```
node crawler http://portent.com
```
