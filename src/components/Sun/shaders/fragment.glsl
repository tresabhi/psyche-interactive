varying vec2 vUv;
uniform vec3 uColor;
uniform float bloomThreshold;
uniform float bloomPower;

void main() {
  vec2 scaled = 2.0 * vUv - 1.0;
  float magnitude = length(scaled);
  
  if (magnitude > 1.0) {
    discard;
  }

  float shine = 1.0;

  if (magnitude > bloomThreshold) {
    shine = pow(1.0 - 2.0 * (magnitude - bloomThreshold), bloomPower);
  }

  gl_FragColor = vec4(1.0, 1.0, 1.0, shine);
}