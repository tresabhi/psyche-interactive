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

  float shine = pow(1.0 - 2.0 * abs(magnitude - bloomThreshold), bloomPower) * 0.5;

  gl_FragColor = vec4(0.5, 0.6, 0.9, shine);
}