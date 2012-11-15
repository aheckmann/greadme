#greadme
===========

Locally preview your markdown, Github style.

## Installation

via npm:

    $ npm install -g greadme

## Usage

    $ greadme [port-number]

       view your markdown at http://localhost:8124/
       press CTRL+C to quit

Execute `greadme` passing an optional port number and markdown in the current directory will be parsed and served from a locally running http server with Github styling applied.

If you are running on a mac, a browser will automatically be opened to preview the markdown.

When no file path is specified, `greadme` attempts to locate a Readme file in the current directory and renders it instead. The following filenames and extensions are tried.

  - README.md
  - README.markdown
  - Readme.md
  - Readme.markdown
  - readme.md
  - readme.markdown

## Notes

An attempt is made to grab the latest css from Github. If the attempt fails we fall back to styling with an old version.

## License

[MIT](https://github.com/aheckmann/greadme/blob/master/LICENSE)
