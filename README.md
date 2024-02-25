# peaks.js-react

This project provides a React Hook for the [Peaks.js](https://github.com/bbc/peaks.js) library, which is a flexible audio waveform visualization library. The hook, `usePeaks`, simplifies the integration of Peaks.js into your React applications.

## Installation

Install the package using npm:

```bash
npm install peaks.js-react
```

## Usage
```tsx
import { usePeaks } from 'peaks.js-react';
import { useRef } from 'react';

// Inside your component
const audioRef = useRef<HTMLAudioElement>(null);
const waveformRef = useRef<HTMLDivElement>(null);

const { peaks, loading, error } = usePeaks({
  audioRef,
  waveformRef,
  options: {
    // Your Peaks.js options here
  },
});

// Use the `peaks` instance to interact with the Peaks.js API
```

## Hook Result

The `usePeaks` hook returns an object with the following properties:

- `peaks`: This is the instance of Peaks.js. You can use this to interact with the Peaks.js API.
- `loading`: A Boolean that indicates whether Peaks.js is still initializing. You can use this to show a loading spinner, for example.
- `error`: If an error occurred during initialization, this will be an Error object. Otherwise, it will be null.

## Example

Here's an example of how to use the `usePeaks` hook in a component:

```tsx
import React, { useRef } from 'react';
import { usePeaks } from 'peaks.js-react';

const Waveform: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);

  const { peaks, loading, error } = usePeaks({
    audioRef,
    waveformRef,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <audio ref={audioRef} src="path-to-your-audio-file" controls></audio>
      <div ref={waveformRef}></div>
    </div>
  );
};

export default Waveform;
```