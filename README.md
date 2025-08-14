# greadme

Locally preview your markdown, Github style.

<img style="background-color:#e2e2e2;padding:0.5rem;border:0 solid #e0e4ec; border-radius:0.75em;box-sizing:border-box;margin:0;" alt="greadme screenshot" src="./greadme.png" />

## Installation

via npm:

    $ npm install -g greadme


## Usage

    $ greadme [path/to/some.markdown]

       view your markdown at http://localhost:8124/
       press CTRL+C to quit

Execute `greadme` passing an optional path to a markdown file and it will be parsed and served from a locally running
http server with Github styling applied. When no file path is specified, `greadme` displays a file browser of the
current directory, similar to Github.


A browser will automatically be opened to preview the markdown if your OS supports it.


Files with the following extensions are rendered.

- .md
- .markdown


The default port is `8124` and the default host is `localhost`. You can change these settings by passing the `--port`
and `--host` option. For example:


    $ greadme --host 127.0.0.0 --port 7220


## Notes

An attempt is made to use the [Github markdown rendering api](http://developer.github.com/v3/markdown/) and Githubs stylesheets. If the attempt fails we fall back to rendering locally.


## Contributors

https://github.com/aheckmann/greadme/graphs/contributors

## License

[MIT](https://github.com/aheckmann/greadme/blob/master/LICENSE)

