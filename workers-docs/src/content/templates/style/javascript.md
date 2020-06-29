# JavaScript Style Guide

All JavaScript must adhere to [JavaScript Standard Style](https://standardjs.com/) and the [Cloudflare JS StyleGuide](./style/javascript).

## Basic Guidelines

- Always deconstruct when possible `const { url } = request` over `const url = request.url`

- Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`

- Inline `export`s with expressions whenever possible

  ```
  // Use this:
  export default class ClassName {

  }

  // Instead of:
  class ClassName {

  }
  export default ClassName
  ```

- Place requires in the following order:

  - Built in Node Modules (such as `path`)
  - Local Modules (using relative paths)

- Use arrow functions `=>` over anonymous function expressions

- Place class properties in the following order:

  - Class methods and properties (methods starting with `static`)
  - Instance methods and properties

- [Avoid platform-dependent code](https://flight-manual.atom.io/hacking-atom/sections/cross-platform-compatibility/)

* Comment all functions using JSDoc style (e.g. `/***/` ) and if not in Typescript include the param types

## Templates

For JavaScript snippets and boilerplates, please make sure your code is ran through prettier with the following config:

```javascript .prettierrc
{
  "singleQuote": true,
  "semi": false,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 80
}
```

For boilerplates this will be done automatically, but for snippets you can do this using the [template creator](https://github.com/victoriabernard92/workers-template-creator) or following a [tutorial on using prettier](https://medium.com/dailyjs/getting-started-with-prettier-writing-clean-concise-code-6838e0912175).

## Thanks

Thank you [Atom](https://atom.io/) for opening up your style guides to help us adopt the best practices:blush:.
