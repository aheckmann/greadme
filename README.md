#greadme
===========

Locally preview your README.md with github-like styling applied.

## Installation

via npm:

    $ npm install -g greadme

## Usage

    $ cd to/dir/with/readme.markdown
    $ greadme

       view your readme at http://localhost:8124/
       press CTRL+C to quit

Execute the `greadme` command from a directory holding your README and it will be parsed and served from a locally running http server.

If you are running on a mac, a brower will automatically be opened to the readme preview.

The following filenames and extensions are tried, if none are found, an error is printed and the program exits.

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
