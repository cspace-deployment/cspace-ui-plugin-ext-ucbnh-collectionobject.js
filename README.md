# cspace-ui-plugin-ext-ucbnh-collectionobject

[![build status](https://travis-ci.org/cspace-deployment/cspace-ui-plugin-ext-ucbnh-collectionobject.js.svg?branch=master)](https://travis-ci.org/cspace-deployment/cspace-ui-plugin-ext-ucbnh-collectionobject.js)

UC Berkeley Natural History Collection Object extension plugin for the CollectionSpace UI.

## Installation

### For developers

Follow these instructions to download and install the source code of the plugin.

Using git:

```
$ git clone https://github.com/cspace-deployment/cspace-ui-plugin-ext-ucbnh-collectionobject.js.git
$ cd cspace-ui-plugin-ext-ucbnh-collectionobject.js
$ npm install
```

To run the cspace-ui application configured with this plugin:

```
$ npm run devserver
```

Then open a browser to http://localhost:8080.

By default, the application served from the dev server will use the CollectionSpace services API
located at http://localhost:8180.

To run the application against CollectionSpace services located on a different host, edit
index.html, and change the `serverUrl` configuration property. For example, to use a server running
on nightly.collectionspace.org, port 8180, use the settings:

```
cspaceUI({
  serverUrl: 'http://nightly.collectionspace.org:8180',
  // ...
});
```
