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

uniform vec2 u_Resolution;              // CSS px * DPR
uniform vec2 u_Mouse;                   // framebuffer px

uniform sampler2D u_Texture01;          // current slide
uniform sampler2D u_Texture02;          // next slide

uniform float u_TransitionProgress;     // 0..1
uniform float u_AnimateIn;              // 0..1
uniform float u_AnimateOut;             // 0..1
uniform float u_Direction;              // +1.0 = L->R, -1.0 = R->L

uniform float u_TextureScaleIntensityMouse;       // hover-only scale
uniform float u_TextureScaleIntensityTransition;  // tween-only scale
uniform float u_EnableEffect;                      // 0 = clean image, 1 = allow effect

uniform vec2  u_ImageSize01;            // w,h
uniform vec2  u_ImageSize02;            // w,h

#define COLS_NUM 24.
#define SCALE_MAX 1.8
#define PIXELATE_MAX 4.0

vec2 Cover(vec2 uv, vec2 screenSize, vec2 imageSize){
  vec2 s = screenSize;
  vec2 i = imageSize;
  float rs = s.x / s.y;
  float ri = i.x / i.y;
  vec2 newSize = rs < ri ? vec2(i.x * s.y / i.y, s.y)
                         : vec2(s.x, i.y * s.x / i.x);
  vec2 offset  = (rs < ri ? vec2((newSize.x - s.x) / 2.0, 0.0)
                          : vec2(0.0, (newSize.y - s.y) / 2.0)) / newSize;
  return uv * s / newSize + offset;
}

#ifndef FNC_SATURATE
#define FNC_SATURATE
#define saturate(x) clamp(x, 0.0, 1.0)
#endif

#ifndef FNC_MAP
#define FNC_MAP
float map(float value, float inMin, float inMax){ return saturate((value-inMin)/(inMax-inMin)); }
float map(in float value, in float inMin, in float inMax, in float outMin, in float outMax){
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}
#endif

#ifndef FNC_QUADRATICOUT
#define FNC_QUADRATICOUT
float quadraticOut(in float t){ return -t * (t - 2.0); }
#endif

void main(){
  // Strict idle path: if the effect is disabled and transition strength is off,
  // show a pristine image with no column logic at all.
  if (u_EnableEffect < 0.5 && u_TextureScaleIntensityTransition <= 0.0001) {
    vec2 uvCover = Cover(vUv, u_Resolution, u_ImageSize01);
    gl_FragColor = texture2D(u_Texture01, uvCover);
    return;
  }

  vec2 uv = vUv;
  float id = floor(uv.x * COLS_NUM);

  // Mouse (0..1)
  vec2 mouse = u_Mouse / u_Resolution;
  float colCenter = (id / COLS_NUM) + 0.5 / COLS_NUM;

  // Mouse influence (only when enabled)
  float scaleMaskMouse = distance(mouse.x, colCenter);
  scaleMaskMouse = smoothstep(0.31, 0.0, scaleMaskMouse);
  scaleMaskMouse *= u_TextureScaleIntensityMouse * u_EnableEffect;

  // Transition influence (enable only during tween from JS)
  float scaleMaskTransition = distance(u_TransitionProgress, colCenter);
  scaleMaskTransition = smoothstep(0.31, 0.0, scaleMaskTransition);
  scaleMaskTransition *= u_TextureScaleIntensityTransition;

  // Hover pixelation near mouse (subtle)
  float pixelate = floor(map(scaleMaskMouse, 0.0, 1.0, 1.0, PIXELATE_MAX));
  vec2 pixelatedUVs = (floor(gl_FragCoord.xy / max(1.0, pixelate)) * max(1.0, pixelate)) / u_Resolution;
  pixelatedUVs = mix(uv, pixelatedUVs, smoothstep(0.0, 1.0, pixelate - 1.0));

  // Column remap / scale
  vec2 scaledUV = fract(pixelatedUVs * vec2(COLS_NUM, 1.0));
  scaledUV.x = scaledUV.x * 2.0 - 1.0;
  scaledUV.x /= 1.0 + scaleMaskMouse * SCALE_MAX + scaleMaskTransition * 3.0;
  scaledUV.x = scaledUV.x * (0.5 / COLS_NUM) + (0.5 / COLS_NUM) + (1.0 / COLS_NUM * id);

  // Per-texture cover fit
  vec2 coverUV0 = Cover(scaledUV, u_Resolution, u_ImageSize01);
  vec2 coverUV1 = Cover(scaledUV, u_Resolution, u_ImageSize02);

  // ---- Direction-aware timing ----
  // Treat u_Direction >= 0.0 as +1 (L->R), < 0.0 as -1 (R->L).
  float dir = (u_Direction < 0.0) ? -1.0 : 1.0;

  // Normalized column index [0..1] left->right
  float colNorm = id / (COLS_NUM - 1.0);

  // Directional column position: if dir = -1, flip (right->left)
  float colNormDir = mix(1.0 - colNorm, colNorm, step(0.0, dir));

  // Column-wise crossfade band, now marching in the chosen direction
  float fadeMask = (u_TransitionProgress - colNormDir) * COLS_NUM;
  fadeMask = smoothstep(-3.0, 4.0, fadeMask);

  vec4 tex0 = texture2D(u_Texture01, coverUV0);
  vec4 tex1 = texture2D(u_Texture02, coverUV1);
  vec4 finalColor = mix(tex0, tex1, fadeMask);

  // In/out masks (at idle these are 1, so they don’t create bands)
  // Make the per-column delay honor direction as well.
  float idDir = mix((COLS_NUM - 1.0) - id, id, step(0.0, dir));
  float delay = 0.03 * idDir;

  float inMask  = 1.0 - step(
    quadraticOut(smoothstep(delay, (1.0 - COLS_NUM * 0.03) + delay, u_AnimateIn))  / COLS_NUM,
    fract(vUv.x * COLS_NUM) / COLS_NUM
  );
  float outMask = step(
    quadraticOut(smoothstep(delay, (1.0 - COLS_NUM * 0.03) + delay, u_AnimateOut)) / COLS_NUM,
    fract(vUv.x * COLS_NUM) / COLS_NUM
  );

  gl_FragColor = finalColor * inMask * outMask;
}
`
