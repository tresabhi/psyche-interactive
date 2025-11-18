varying vec2 vUv;

void main() {
    vUv = uv;

    // Get camera-facing position
    vec4 mvPosition = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0); // mesh center in camera space
    mvPosition.xy += position.xy; // offset by local vertex position

    gl_Position = projectionMatrix * mvPosition;
}
