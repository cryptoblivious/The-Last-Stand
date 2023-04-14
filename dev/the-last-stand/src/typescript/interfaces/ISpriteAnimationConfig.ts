export default interface ISpriteAnimationConfig {
  key: string;
  path: string;
  frameWidth: number;
  frameHeight: number;
  startFrame: number;
  endFrame: number;
  frameRate: number;
  repeat: number;
  frameEvents?: number[];
}
