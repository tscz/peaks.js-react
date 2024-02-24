# peaks.js-react
React hook for using peaks.js

## Installation
```bash
npm install peaks.js-react
```

Make sure you also have React installed in your project, as it is a peer dependency of this package.

## Usage

```javascript
import { useCustomHook } from 'peaks.js-react';

function MyComponent() {
  const { data, loading, error } = useCustomHook();

  // Your code here...
}