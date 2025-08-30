# Collect Skills

*Collect Skills* is a tool for self-assessment of the individual competence development.
As an H5P content type, it can be used in various CMS, although its main
purpose is to be used in Moodle.

## Development

This repository is based on [GitHub - h5p/h5p-boilerplate: Example H5P Content Type for getting started](https://github.com/h5p/h5p-boilerplate).

### Ressources

* [H5P Developer Guide](https://h5p.org/developers)
* [H5P Developer Forum](https://h5p.org/forum/2)
* [H5P – SNORDIAN](https://snordian.de/tag/h5p/)
* [How to review H5P content types? – SNORDIAN](https://snordian.de/2023/04/29/how-to-review-h5p-content-types/)

### Getting started

Instead of cloning this repository, you should have a look at the corresponding [H5P Test Environment](https://gitlab.gwdg.de/h5p/testenv).
This repository will then be cloned as sub-repository.

Change to the repository directory and run
```bash
npm install
```

to install required modules. Afterwards, you can build the project using
```bash
npm run build
```

or, if you want to let everything be built continuously while you are making
changes to the code, run
```bash
npm run watch
```
Before putting the code in production, you should always run `npm run build`.

The build process will transpile ES6 to earlier versions in order to improve
compatibility to older browsers. If you want to use particular functions that
some browsers don't support, you'll have to add a polyfill.

The build process will also move the source files into one distribution file and
minify the code.

