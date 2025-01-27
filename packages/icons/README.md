# `@pzh-ui/icons`

This package contains icons to use in Provincie Zuid-Holland projects.

Add the NPM package for the icons.

In order to add the entire component library, install [@pzh-ui/icons](https://www.npmjs.com/package/@pzh-ui/icons) using your favorite package manager.

For example, `yarn add @pzh-ui/icons`.

After installing the dependency, you can start using the icons as follows:

```jsx
import { Check } from "@pzh-ui/icons";

function Page() {
  return <Check />;
}
```

## Adding new icons

Add your new SVG icon to the `src/` folder. After that run `yarn svgr` and your new icon will be generated in `src/components/`
