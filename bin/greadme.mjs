#!/usr/bin/env node

import * as path from 'node:path';
import * as fs from 'node:fs';
import * as http from 'node:http';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { marked as md } from 'marked';
import open from 'open';
import favicon from 'express-favicon-short-circuit';

const cssPath = fileURLToPath(new URL('../css', import.meta.url));
const viewPath = fileURLToPath(new URL('../view.ejs', import.meta.url));

var app = express();
app.set('view engine', 'ejs');

process.title = 'greadme';

let args = process.argv.slice();
let host;
let port;
let pIndex;

if (~(pIndex = args.indexOf('--port'))) {
  port = args[pIndex + 1];
  // remove port arguments
  args.splice(pIndex, 2);
} else {
  port = 8124;
}

if (~(pIndex = args.indexOf('--host'))) {
  host = args[pIndex + 1];
  // remove port arguments
  args.splice(pIndex, 2);
} else {
  host = 'localhost';
}

const fileArg = args[2];
const css = await getStyle();

app.use(favicon);
app.use('/css', express.static(cssPath))
app.use(function (req, res, next) {
  if (fileArg) {
    render(fs.readFileSync(path.join(process.cwd(), fileArg), 'utf8'), function (err, markdown) {
      if (err) return next(err);
      res.render(viewPath, {
        css: css,
        markdown: markdown,
        dir: false
      });
    });
  } else {
    const p = path.join(process.cwd(), req.url.substring(1));
    const stat = tryStatSync(p);
    if (stat && stat.isFile() && !p.endsWith('md') && !p.endsWith('markdown')) {
      res.sendfile(p);
      return;
    }
    const dir = stat && stat.isDirectory();
    const file = dir ? readme(p) : p;
    const fileStat = tryStatSync(file);
    const contents = fileStat ? fs.readFileSync(file, 'utf8') : 'No readme found';
    render(contents, function (err, markdown) {
      if (err) return next(err);
      res.render(viewPath, {
        css: css,
        markdown: markdown,
        dir: dir && listDir(p)
      });
    });
  }
});
const server = http.createServer(app).listen(port, host);

server.on('listening', function () {
  const url = 'http://' + host + ':' + port;
  console.log("\n  view your markdown at \u001B[32m%s/\u001B[0m", url);
  console.log('  press CTRL+C to quit');

  open(url, function (err) {
    // ignore errors
  });
});


function readme(dir) {
  var exts = 'markdown md'.split(' ');
  var file;
  var names = 'README Readme readme'.split(' ');
  if (names.some(function (name) {
    return exts.some(function (ext) {
      try {
        var filename = dir + '/' + name + '.' + ext;
        var stat = fs.statSync(filename);
        file = filename;
        return true;
      } catch (err) {
        return false;
      }
    });
  })) {
    return file;
  }
}

async function getStyle() {
  try {
    const res = await fetch('https://github.com/aheckmann/greadme', { timeout: 4000, headers: { 'user-agent': 'greadme' } });

    if (!res.ok) {
      // Go to the error handler
      throw new Error();
    }

    const body = await res.text();

    return [...body.matchAll(/href=["']([^"']+\.css)/g)].map(result => result[1]);
  } catch {
    // ignore error, use old css instead
    console.log('\u001B[35m  %s\u001B[0m', 'could not retreive latest github css. using old version');
    return ['/css/style.css'];
  }
}

function listDir(dir) {
  const all = fs.readdirSync(dir);
  const md = [];
  const dirs = dir == process.cwd() ? [] : ['..'];
  all.forEach(function (item) {
    const stat = fs.statSync(path.join(dir, item));
    if (stat.isDirectory()) {
      dirs.push(item);
    } else if (stat.isFile() && (/\.md$/.test(item) || /\.markdown$/.test(item))) {
      md.push(item);
    }
  });
  function canonical(item) {
    return {
      href: path.join(dir, item).replace(process.cwd(), '').replace(/\\/g, '/') || '/',
      name: item
    };
  }
  return {
    md: md.map(canonical),
    dirs: dirs.map(canonical)
  };
}

function render(fileContent, cb) {
  fetch('https://api.github.com/markdown/raw', {
    method: 'POST',
    body: fileContent,
    headers: {
      'content-type': 'text/plain',
      'user-agent': 'greadme'
    },
    timeout: 2000
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Received ' + res.status + ' status from the GitHub API');
      }
      return res.text();
    })
    .then(
      body => cb(null, body),
      err => {
        console.log(err);
        cb(null, md(fileContent));
      }
    );
}

const tryStatSync = (path) => {
  try {
    return fs.statSync(path);
  } catch (err) {
    return null;
  }
};
