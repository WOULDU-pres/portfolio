"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const VERTEX = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`

// Glass bubble grows from the center: refraction, chromatic aberration and a
// liquid wobble inside the edge, the dimmed collapsed image outside it.
const FRAGMENT = `
precision mediump float;
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec2 uTextureSize;
uniform float uProgress;
varying vec2 vUv;

vec2 coverUv(vec2 uv) {
  vec2 s = uResolution / uTextureSize;
  float scale = max(s.x, s.y);
  vec2 size = uTextureSize * scale;
  vec2 offset = (uResolution - size) * 0.5;
  return (uv * uResolution - offset) / size;
}

void main() {
  vec2 base = coverUv(vUv);
  vec2 p = vUv * uResolution;
  vec2 c = uResolution * 0.5;
  float d = length(p - c);
  float radius = uProgress * length(uResolution) * 0.6;
  float nd = d / max(radius, 0.001);
  float inside = smoothstep(radius + 3.0, radius - 3.0, d);

  vec3 before = texture2D(uTexture, (base - 0.5) / 1.1 + 0.5).rgb * 0.45;

  vec2 dir = d > 0.0 ? (p - c) / d : vec2(0.0);
  vec2 uv = base - dir * 0.08 * pow(smoothstep(0.3, 1.0, nd), 1.5);
  float t = uProgress * 5.0;
  uv += vec2(sin(t + nd * 10.0), cos(t * 0.8 + nd * 8.0)) * 0.022 * nd * inside;
  float ca = 0.012 * pow(smoothstep(0.3, 1.0, nd), 1.2);
  vec3 after = vec3(
    texture2D(uTexture, uv + dir * ca * 1.2).r,
    texture2D(uTexture, uv + dir * ca * 0.2).g,
    texture2D(uTexture, uv - dir * ca * 0.8).b
  );
  after += smoothstep(0.95, 1.0, nd) * (1.0 - smoothstep(1.0, 1.01, nd)) * 0.08;
  if (uProgress > 0.95) {
    after = mix(after, texture2D(uTexture, base).rgb, (uProgress - 0.95) / 0.05);
  }

  gl_FragColor = vec4(mix(before, after, inside), 1.0);
}`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

const easeInOut = (x: number) =>
  x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2

// Plays once on mount, then calls onDone so the regular <Image> takes over.
function LiquidReveal({
  src,
  duration = 1600,
  onDone,
  className,
}: {
  src: string
  duration?: number
  onDone?: () => void
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const onDoneRef = useRef(onDone)

  useEffect(() => {
    onDoneRef.current = onDone
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext("webgl", { antialias: false })
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (!canvas || !gl || reduceMotion) {
      onDoneRef.current?.()
      return
    }

    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX))
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    const texture = gl.createTexture()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    )
    const position = gl.getAttribLocation(program, "aPosition")
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, "uResolution")
    const uTextureSize = gl.getUniformLocation(program, "uTextureSize")
    const uProgress = gl.getUniformLocation(program, "uProgress")

    let frame = 0
    let start = 0
    let cancelled = false

    const render = (now: number) => {
      if (cancelled) return
      if (!start) start = now
      const progress = Math.min((now - start) / duration, 1)

      // The host element is still resizing while it expands.
      const dpr = Math.min(window.devicePixelRatio, 2)
      const width = Math.round(canvas.clientWidth * dpr)
      const height = Math.round(canvas.clientHeight * dpr)
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        gl.viewport(0, 0, width, height)
      }
      gl.uniform2f(uResolution, width, height)
      gl.uniform1f(uProgress, easeInOut(progress))
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      if (progress < 1) frame = requestAnimationFrame(render)
      else onDoneRef.current?.()
    }

    const image = new window.Image()
    image.onload = () => {
      if (cancelled) return
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.uniform2f(uTextureSize, image.naturalWidth, image.naturalHeight)
      frame = requestAnimationFrame(render)
    }
    image.onerror = () => onDoneRef.current?.()
    image.src = src

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      // Don't lose the context: StrictMode re-runs this effect on the same canvas.
      gl.deleteTexture(texture)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [src, duration])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("absolute inset-0 size-full", className)}
    />
  )
}

export { LiquidReveal }
