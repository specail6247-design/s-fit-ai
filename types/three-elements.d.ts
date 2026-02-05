// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as R3F from '@react-three/fiber';

declare module '@react-three/fiber' {
  interface ThreeElements {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    imageDistortionMaterial: any;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      imageDistortionMaterial: any;
    }
  }
}
