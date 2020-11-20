# create-vlib

[Vitepress-dg](https://github.com/dewfall123/vitepress-dg)'s cli that help you tdevelop libraries & write docs.

## Features

-   Out of the box, focus on development & documentation.
-   Integrates some commonly used commands like:

1. `yarn dev`: Start a development serve, no need to write a playground service.
2. `yarn test`: Unit test by `jest`.
3. `yarn build`: Build with rollup.
4. `yarn docs-build`: Ssr build documentation site by `vitepress-dg`.
5. `docs-static`: Start a documentation site static service local by `koa`.
6. `yarn docs-deploy`: Deploy documentation site by `gh-pages`.
7. `yarn changelog`: Generate changelog by `conventional-changelog-cli`.
8. `yarn lint` && `yarn ls-lint`: lint.

## Usage

```
yarn create vlib
```

You will see following message if success.

```
�  Successfully created project test-project.
�  Get started with the following commands:

$ cd test-project
$ yarn dev
```

## License

[MIT](LICENSE)
