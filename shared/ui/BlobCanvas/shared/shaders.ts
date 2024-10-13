export const simplex3D = `//	Simplex 3D Noise 
//	by Ian McEwan, Ashima Arts
//
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

float snoise(vec3 v){ 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 =   v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //  x0 = x0 - 0. + 0.0 * C 
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1. + 3.0 * C.xxx;

// Permutations
  i = mod(i, 289.0 ); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients
// ( N*N points uniformly over a square, mapped onto an octahedron.)
  float n_ = 1.0/7.0; // N=7
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}`;

const dither = `
float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
  }
  
  float luma(vec4 color) {
  return dot(color.rgb, vec3(0.299, 0.587, 0.114));
  }
  

float dither8x8(vec2 position, float brightness) {
  int x = int(mod(position.x, 8.0));
  int y = int(mod(position.y, 8.0));
  int index = x + y * 8;
  float limit = 0.0;

  if (x < 8) {
    if (index == 0) limit = 0.015625;
    if (index == 1) limit = 0.515625;
    if (index == 2) limit = 0.140625;
    if (index == 3) limit = 0.640625;
    if (index == 4) limit = 0.046875;
    if (index == 5) limit = 0.546875;
    if (index == 6) limit = 0.171875;
    if (index == 7) limit = 0.671875;
    if (index == 8) limit = 0.765625;
    if (index == 9) limit = 0.265625;
    if (index == 10) limit = 0.890625;
    if (index == 11) limit = 0.390625;
    if (index == 12) limit = 0.796875;
    if (index == 13) limit = 0.296875;
    if (index == 14) limit = 0.921875;
    if (index == 15) limit = 0.421875;
    if (index == 16) limit = 0.203125;
    if (index == 17) limit = 0.703125;
    if (index == 18) limit = 0.078125;
    if (index == 19) limit = 0.578125;
    if (index == 20) limit = 0.234375;
    if (index == 21) limit = 0.734375;
    if (index == 22) limit = 0.109375;
    if (index == 23) limit = 0.609375;
    if (index == 24) limit = 0.953125;
    if (index == 25) limit = 0.453125;
    if (index == 26) limit = 0.828125;
    if (index == 27) limit = 0.328125;
    if (index == 28) limit = 0.984375;
    if (index == 29) limit = 0.484375;
    if (index == 30) limit = 0.859375;
    if (index == 31) limit = 0.359375;
    if (index == 32) limit = 0.0625;
    if (index == 33) limit = 0.5625;
    if (index == 34) limit = 0.1875;
    if (index == 35) limit = 0.6875;
    if (index == 36) limit = 0.03125;
    if (index == 37) limit = 0.53125;
    if (index == 38) limit = 0.15625;
    if (index == 39) limit = 0.65625;
    if (index == 40) limit = 0.8125;
    if (index == 41) limit = 0.3125;
    if (index == 42) limit = 0.9375;
    if (index == 43) limit = 0.4375;
    if (index == 44) limit = 0.78125;
    if (index == 45) limit = 0.28125;
    if (index == 46) limit = 0.90625;
    if (index == 47) limit = 0.40625;
    if (index == 48) limit = 0.25;
    if (index == 49) limit = 0.75;
    if (index == 50) limit = 0.125;
    if (index == 51) limit = 0.625;
    if (index == 52) limit = 0.21875;
    if (index == 53) limit = 0.71875;
    if (index == 54) limit = 0.09375;
    if (index == 55) limit = 0.59375;
    if (index == 56) limit = 1.0;
    if (index == 57) limit = 0.5;
    if (index == 58) limit = 0.875;
    if (index == 59) limit = 0.375;
    if (index == 60) limit = 0.96875;
    if (index == 61) limit = 0.46875;
    if (index == 62) limit = 0.84375;
    if (index == 63) limit = 0.34375;
  }

  return brightness < limit ? 0.0 : 1.0;
}

vec3 dither8x8(vec2 position, vec3 color) {
  return color * dither8x8(position, luma(color));
}

vec4 dither8x8(vec2 position, vec4 color) {
  return vec4(color.rgb * dither8x8(position, luma(color)), 1.0);
}
`;

export const blobVertex = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec2 vScreenUV;
  varying vec3 vNormal;
  ${simplex3D}

  void main() {
    vec3 transformed = position;
    vUv = uv;
    float amp = snoise(transformed * 1. + uTime * 0.00015) * 0.3;
    transformed += normal * amp;
    vNormal = normalize(transformed);
    gl_Position =  projectionMatrix * modelViewMatrix * vec4(transformed, 1.);
    vScreenUV = gl_Position.xy;
    vScreenUV.y = amp;
  }
`;

export const blobFragment = `
  precision highp float;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec2 vScreenUV;
  ${dither}
  uniform vec2 uResolution;
	uniform float uMouseSize;
	uniform vec2 uMouse;
  uniform float uTime;
  uniform vec3 uBackground;

  uniform vec3 c0;
  uniform vec3 c1;
  uniform vec3 c2;
  uniform vec3 c3;
  
  uniform float uProgress;
  uniform vec2 uAspect;
	uniform float uVisibility;
  
  vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ){
	  return a + b * cos(6.28318 * (c * t + d));
  }
  
  void main() {

    float angle = sin(uTime * 0.000025) * 3.14;
    vec3 lightPos = vec3(cos(angle), sin(uTime * (0.001)) , sin(angle));

    // vec3 lightPos = normalize(vec3(1.,1.,0.));

    float diffuse = dot(lightPos, vNormal);
    diffuse += (vScreenUV.y * 5.5);
    diffuse = smoothstep(-0.8, 2.3, diffuse);
    
    float ditherSize = 256.0;
    vec2 uv = (gl_FragCoord.xy / uResolution.xy) * (1./uAspect);

    float mouseCircle  = smoothstep(uMouseSize, uMouseSize + 0.13, 
      distance(uMouse * (1.0 / uAspect) - (1.0 / uAspect) * 0.5 + 0.5, uv)
    );

    diffuse = mix((1.0 - diffuse) * 0.8, diffuse, mouseCircle);

    diffuse = dither8x8(uv * ditherSize, diffuse * uVisibility);
    
    float colorFreq = (vScreenUV.y * 4.0 + 0.0 + uTime * 0.001  );
    colorFreq = mix(colorFreq, -vScreenUV.y * 4.0 + 0.0 + uTime * 0.001 , mouseCircle);
    vec3 paletteCurrent = palette(colorFreq, c0,c1,c2,c3);
    vec3 paletteColor = paletteCurrent;

    vec3 color = vec3(diffuse);
    color = mix(uBackground, paletteColor, diffuse);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export const planeVertex = `
	uniform vec2 uAspect;

	varying vec2 vUv;
	void main() {
		vec3 transformed = position;

		transformed *= 2.;
		transformed.xy *= uAspect;
		vUv = uv;
		gl_Position =  vec4(transformed , 1.) ;
	}
`;

export const planeFragment = `
	precision highp float;
	varying vec2 vUv;
	#define PI 3.1415926
	uniform float uTime;
	uniform vec3 uBackground;
	uniform vec3 uColor;
	uniform vec2 uMouse;
	uniform float uMouseSize;
	uniform float uVisibility;
	uniform vec2 uAspect;
	uniform float uClickTime;
	${dither}
	void main() {
		vec2 uv = vUv;
		uv+= -0.5;
		float angle = (atan(uv.y, uv.x) / PI) *0.5 + 0.5;
		float rawSegments = angle * 20. + uTime*0.001;
		float segments = fract(rawSegments);
		float segmentsID = floor(rawSegments);
		float isOdd = mod(segmentsID, 2.);
		float circle = length(uv);

		float wave = abs(sin(circle * 2. - uTime * 0.003));
		wave = smoothstep(0.9, 1.1, wave) * 0.5;

		float clickWave = abs(cos(circle * 2. +  max(-PI, -uTime * 0.005 + uClickTime * 0.005)  ));
		clickWave = smoothstep(0.9, 1.1, clickWave) * 2.;

		float ditherSize = 256.0 - (1. - uVisibility) * 100.;
		float lineWave = abs(sin(circle * 2. - uTime * 0.004 + segmentsID /20. * PI));
		lineWave = smoothstep(0.9, 1.1, lineWave);


		float result = (1.-abs(segments - 0.5) * 2.) * isOdd + wave + clickWave + lineWave * isOdd;

		float mouseCircle  = smoothstep(uMouseSize, uMouseSize + 0.13, 
			distance(uMouse * (1./uAspect) -(1./uAspect)* 0.5 +0.5 , vUv)
			);

		result = mix(1.-result, result, mouseCircle);


		vec2 uvWithDither = vUv - 0.5;
		uvWithDither *= vec2(ditherSize);
		uvWithDither += 0.5;
		result = dither8x8(uvWithDither, result * uVisibility);

		vec3 color = mix(uBackground, uColor, result);

		gl_FragColor = vec4(color, 1.0);
	}
`;
