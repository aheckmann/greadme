#greadme
===========

Locally preview your markdown, Github style.

## Installation

via npm:

    $ npm install -g greadme

## Usage

    $ greadme [path/to/some.markdown]

       view your markdown at http://localhost:8124/
       press CTRL+C to quit

Execute `greadme` passing an optional path to a markdown file and it will be parsed and served from a locally running http server with Github styling applied.

If you are running on a mac, a browser will automatically be opened to preview the markdown.

When no file path is specified, greadme displays a file browser of the current directory, similar to Github. The following filenames and extensions are displayed.

  - README.md
  - README.markdown
  - Readme.md
  - Readme.markdown
  - readme.md
  - readme.markdown

## Notes

An attempt is made to grab the latest css from Github. If the attempt fails we fall back to styling with an old version.

## Contributors

- [Aaron Heckmann](https://github.com/aheckmann)
- [Forbes Lindesay](https://github.com/ForbesLindesay)

## License

[MIT](https://github.com/aheckmann/greadme/blob/master/LICENSE)
