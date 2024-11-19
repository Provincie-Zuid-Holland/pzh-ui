# How to use

We use [Lerna](https://github.com/lerna/lerna) to add and publish new packages. Below are some of the commonly used commands, check out the Lerna documentation for more information.

## Installation

`yarn install`

When run, this command will:

- npm install all external dependencies of each package.
- Symlink together all Lerna packages that are dependencies of each other.
- npm run prepublish in all bootstrapped packages (unless --ignore-prepublish is passed).
- npm run prepare in all bootstrapped packages

## Publish a new version

`lerna publish`

In order to publish a new version of a package you will need to commit the changes e.g. `git add -A`, `git commit -m "Commit message"`. Instead of pushing your changes, you will now run `lerna publish`. This will prompt you with the new versions for the packages, and automatically push to Github and publish to NPM.

## Add a new package

`lerna create`

Run `lerna create` which will give you a list of options to go through. After filling everything in, it will create a new package within `packages/`.

## Add a dependency to matched packages

Add local or remote package as dependency to packages in the current Lerna repo. Note that only a single package can be added at a time.

`yarn install <dependency> -w <package>`

e.g. `yarn install react -w components`

Above command will add the react dependency to the components package. In order to add a devDependency simply add a `--dev` flag to the command.
