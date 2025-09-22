// featuredShader.js
export const VERT = `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const FRAG = `
precision highp float;

varying vec2 vUv;

uniform vec2 u_Resolution;              // drawing buffer size in pixels (CSS * DPR)
uniform vec2 u_Mouse;                   // mouse in pixels (same space as u_Resolution)

uniform sampler2D u_Texture01;
uniform sampler2D u_Texture02;

uniform float u_TransitionProgress;     // 0..1
uniform float u_AnimateIn;              // 0..1
uniform float u_AnimateOut;             // 0..1

uniform float u_TextureScaleIntensityMouse;
uniform float u_TextureScaleIntensityTransition;

uniform vec2 u_ImageSize01;             // intrinsic size of current texture
uniform vec2 u_ImageSize02;             // intrinsic size of next texture

#define COLS_NUM 24.
#define COLS_DELAY .0225
#define SCALE_MAX 1.8
#define PIXELATE_MAX 4.0

vec2 Cover(vec2 uv, vec2 screenSize, vec2 imageSize){
  vec2 s = screenSize;
  vec2 i = imageSize;

  float rs = s.x / s.y;
  float ri = i.x / i.y;

  vec2 newSize = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
  vec2 offset  = (rs < ri ? vec2((newSize.x - s.x) / 2.0, 0.0) : vec2(0.0, (newSize.y - s.y) / 2.0)) / newSize;
  vec2 st      = uv * s / newSize + offset;

  return st;
}

#ifndef FNC_SATURATE
#define FNC_SATURATE
#define saturate(x) clamp(x, 0.0, 1.0)
#endif

#ifndef FNC_MAP
#define FNC_MAP
float map( float value, float inMin, float inMax ) { return saturate((value-inMin)/(inMax-inMin)); }
float map(in float value, in float inMin, in float inMax, in float outMin, in float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}
#endif

#ifndef FNC_QUADRATICOUT
#define FNC_QUADRATICOUT
float quadraticOut(in float t) { return -t * (t - 2.0); }
#endif

void main(){
  vec2 gv = vUv;
  gv.x = fract(vUv.x * COLS_NUM) / COLS_NUM;

  vec2 uv = vUv;

  float id = floor(uv.x * COLS_NUM);

  // Mouse in 0..1 (convert from pixels)
  vec2 mouse = u_Mouse.xy / u_Resolution.xy;

  // Column center X in 0..1
  float colCenter = (id / COLS_NUM) + 0.5 / COLS_NUM;

  // Scale mask from mouse proximity
  float scaleMaskMouse = distance(mouse.x, colCenter);
  scaleMaskMouse = smoothstep(0.31, 0.0, scaleMaskMouse);
  scaleMaskMouse *= u_TextureScaleIntensityMouse;

  // Scale mask from transition sweep proximity
  float scaleMaskTransition = distance(u_TransitionProgress, colCenter);
  scaleMaskTransition = smoothstep(0.31, 0.0, scaleMaskTransition);
  scaleMaskTransition *= u_TextureScaleIntensityTransition;

  // Pixelation near mouse
  float pixelate = map(scaleMaskMouse, 0.0, 1.0, 1.0, PIXELATE_MAX);
  pixelate = floor(pixelate);
  vec2 pixelatedUVs = (floor(gl_FragCoord.xy / pixelate) * pixelate) / u_Resolution;
  pixelatedUVs = mix(uv, pixelatedUVs, smoothstep(0.0, 1.0, pixelate - 1.0));

  // Per-column horizontal scale/compress
  vec2 scaledUV = fract(pixelatedUVs * vec2(COLS_NUM, 1.0));
  scaledUV.x = scaledUV.x * 2.0 - 1.0;
  scaledUV.x /= 1.0 + scaleMaskMouse * SCALE_MAX + scaleMaskTransition * 3.0;
  scaledUV.x = scaledUV.x * (0.5 / COLS_NUM) + (0.5 / COLS_NUM) + (1.0 / COLS_NUM * id);

  // Cover-fit per texture
  vec2 coverUV0 = Cover(scaledUV, u_Resolution, u_ImageSize01);
  vec2 coverUV1 = Cover(scaledUV, u_Resolution, u_ImageSize02);

  // Column-wise crossfade
  float fadeMask = (u_TransitionProgress - id/COLS_NUM) * COLS_NUM;
  fadeMask = smoothstep(-3.0, 4.0, fadeMask);

  vec4 tex0 = texture2D(u_Texture01, coverUV0);
  vec4 tex1 = texture2D(u_Texture02, coverUV1);
  vec4 finalColor = mix(tex0, tex1, fadeMask);

  // Staggered global in/out masks
  float delay = 0.03 * id; // overrides the define
  vec2 inMaskUV = gv;
  float inMaskOffset  = smoothstep(delay, (1.0 - COLS_NUM * 0.03) + delay, u_AnimateIn);
  float inMask  = 1.0 - step(quadraticOut(inMaskOffset) / COLS_NUM,  inMaskUV.x);

  vec2 outMaskUV = gv;
  float outMaskOffset = smoothstep(delay, (1.0 - COLS_NUM * 0.03) + delay, u_AnimateOut);
  float outMask = step(quadraticOut(outMaskOffset) / COLS_NUM, outMaskUV.x);

  gl_FragColor = finalColor * inMask * outMask;
}
`
