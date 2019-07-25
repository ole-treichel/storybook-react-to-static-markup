# Storybook addon to show static markup of react components

## Installation

```npm install --save-dev storybook-react-to-static-markup```

## Configuration

Add to `.storybook/addons.js`

```import 'storybook-react-to-static-markup/register'```


Add to `.storybook/config.js`

```
import { addDecorator } from '@storybook/react'
import { withStaticMarkup } from 'storybook-react-to-static-markup'
...
.addDecorator(withStaticMarkup)
```

> The decorator should **preceed all other decorators** (such as `withInfo`). Otherwise the markup will contain the markup of the other decorators.
