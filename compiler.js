'use strict';
const Cache = require('@warden-sk/compiler/Cache').default;
const compile = require('@warden-sk/compiler').default;
const compileCss = require('@warden-sk/compiler/compileCss').default;

const cache = new Cache();

exports.default = function (code) {
  const path = this.resourcePath;

  if (/\.css$/.test(path)) {
    compileCss({ cache, outputPath: './public', path });

    return '';
  }

  if (/\.tsx?$/.test(path)) {
    code = compile(path, {
      assets: ['./index.css', './index.js'],
      cache,
      outputPath: './public',
      useServer: true,
      useTransformers: true,
    });
  }

  return code;
};
