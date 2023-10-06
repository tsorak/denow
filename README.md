# DenoW

Reruns the provided command when files are changed.

## Prerequisites

[Deno](https://deno.land/)

Only tested on Linux.

## Installation

Clone the repo and run `deno task install`

Alternatively:

```sh
deno install --allow-read --allow-run --allow-env=DENOW_WATCHDIR -n denow https://raw.githubusercontent.com/tsorak/denow/master/main.ts
```

## Usage

`-c` command to run when files change. Example: `-c='janet example/hello.janet'`

`-e` file extension(s) to trigger a rerun on. Example: `-e=janet` (or with multiple extensions: `-e=janet,ts`)

`-d` directory to watch. Example: `-d=src` (Has priority over `DENOW_WATCHDIR` environment variable)

Full example:

```sh
denow -c='janet example/hello.janet' -e=janet -d=example
```
