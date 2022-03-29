# `css`

This package contains default styling for projects whitin Provincie Zuid-Holland.

We use the [Tailwind framework](https://tailwindcss.com/) to style the components. In order to apply the correct styles, install [@pzh-ui/css](https://www.npmjs.com/package/@pzh-ui/css) in your project.

`npm install @pzh-ui/css`

After installing the dependency, you can start using the styles as follows:

```jsx
// tailwind.config.js
module.exports = {
    presets: [require('@pzh-ui/css/config')],
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/@pzh-ui/components/dist/**/*.{js,jsx,ts,tsx}',
        './public/index.html',
    ],
}
```
