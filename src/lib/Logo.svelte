<!--
  Linkio wordmark.

  The L's base is extended to carry the rest of the word, so the L reads as a bracket
  rather than an initial.

  Letters are Montserrat ExtraBold converted to outlines — no <text>, so the mark never
  depends on a font being installed or fetched at runtime. Penpot's own export embedded
  five remote @font-face URLs pointing at its servers; that is what this avoids.

  Inlined rather than loaded through <img src="…svg">, because currentColor does not
  cross into an <img>: the SVG renders in an isolated document and resolves to black on
  any ground (verified by sampling — rgb(0,0,0) inside a white-coloured parent). That is
  why the previous logo needed a separate dark-mode PNG. Inlined, one file follows the
  theme via text-* on the element.

  Grid: baseline y=54, x-height 34 (font-size 61.71), tracking -2.94, base y=62-78.
  static/brand/logo-can.svg is kept identical for uses that need a URL.
-->
<script lang="ts">
	let { class: className = '' }: { class?: string } = $props();
</script>

<svg
	viewBox="0 0 196 90"
	fill="currentColor"
	class={className}
	role="img"
	aria-label="Linkio"
	focusable="false"
>
	<!-- L: stem plus the extended base -->
	<path d="M8 8 H23 V62 H188 V78 H8 Z" />

	<!-- inkio -->
	<path
		d="M46.49 54L34.76 54L34.76 20.56L46.49 20.56L46.49 54M40.63 16.85Q37.42 16.85 35.44 15.06Q33.47 13.27 33.47 10.62Q33.47 8.03 35.44 6.21Q37.42 4.39 40.63 4.39Q43.83 4.39 45.81 6.09Q47.78 7.78 47.78 10.44Q47.78 13.21 45.84 15.03Q43.90 16.85 40.63 16.85"
	/>
	<path
		d="M62.86 54L51.14 54L51.14 20.56L62.31 20.56L62.31 24.20Q64.28 22.10 67.03 21.05Q69.77 20 72.92 20Q76.81 20 79.96 21.57Q83.10 23.15 84.92 26.42Q86.74 29.69 86.74 34.87L86.74 54L75.02 54L75.02 36.78Q75.02 33.21 73.54 31.57Q72.06 29.93 69.53 29.93Q66.69 29.93 64.78 31.82Q62.86 33.70 62.86 37.83"
	/>
	<path
		d="M102.87 54L91.15 54L91.15 8.21L102.87 8.21L102.87 32.16L114.84 20.56L128.73 20.56L114.84 34.87L129.90 54L115.71 54L106.39 42.28L102.87 45.79"
	/>
	<path
		d="M141.71 54L129.99 54L129.99 20.56L141.71 20.56L141.71 54M135.85 16.85Q132.64 16.85 130.66 15.06Q128.69 13.27 128.69 10.62Q128.69 8.03 130.66 6.21Q132.64 4.39 135.85 4.39Q139.06 4.39 141.03 6.09Q143.01 7.78 143.01 10.44Q143.01 13.21 141.06 15.03Q139.12 16.85 135.85 16.85"
	/>
	<path
		d="M163.14 54.56Q157.65 54.56 153.40 52.33Q149.14 50.11 146.70 46.19Q144.26 42.28 144.26 37.22Q144.26 32.22 146.70 28.30Q149.14 24.38 153.40 22.19Q157.65 20 163.14 20Q168.64 20 172.93 22.19Q177.21 24.38 179.62 28.30Q182.03 32.22 182.03 37.22Q182.03 42.28 179.62 46.19Q177.21 50.11 172.93 52.33Q168.64 54.56 163.14 54.56M163.14 45.24Q166.17 45.24 168.17 43.14Q170.18 41.04 170.18 37.22Q170.18 33.45 168.17 31.38Q166.17 29.32 163.14 29.32Q160.18 29.32 158.15 31.38Q156.11 33.45 156.11 37.22Q156.11 41.04 158.15 43.14Q160.18 45.24 163.14 45.24"
	/>
</svg>
