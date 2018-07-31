export interface TimelineConstants {
  viewportWidth: number;
  totalFrameCount: number;
  minFramePixelWidth?: number;
}

export interface ZoomBarDimensions {
  left: number;
  width: number;
}

export interface ViewportFrameEndpoints {
  startFrame: number;
  endFrame: number;
}

export interface TimelinePosition {
  focusedFractionalFrame: number;
  normalizedZoom: number;
}

export interface FrameEndpoints {
  startFractionalFrame: number;
  endFractionalFrame: number;
}
