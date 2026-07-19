# Shipwrekt title sprite

A transparent, position-independent Web Component for **The Shipwrekt Experience**.

## Use it

Load the component script once:

```html
<script defer src="./components/shipwrekt-title/shipwrekt-title.js"></script>
```

Place the component anywhere in the page layout:

```html
<shipwrekt-title></shipwrekt-title>
```

The host controls size and position. The component defaults to a responsive `1.58 / 1` aspect ratio and can be overridden normally:

```css
.trip-nebula shipwrekt-title {
  position: absolute;
  right: 3vw;
  top: 42vh;
  width: min(46vw, 44rem);
}
```

## Activation

Clicking, tapping, Enter, or Space triggers the Dose Event animation and emits a composed bubbling event:

```js
document.addEventListener("shipwrekt:activate", () => {
  // Open the Shipwrekt section, route, modal, or experience here.
});
```

The component owns no page background, routes, or global styles. It carries JM Nexus Grotesque for `SHIPWREKT` and Hipnouma for `EXPERIENCE`, and can sit directly over the existing Trip Reports shader.

## Visual states

- Idle — a compact chromatic payload with interference trapped inside the letterforms.
- Hover/focus — the payload shears into sliced temporal echoes around the visitor's pointer.
- Click/keyboard activation — a short compression-and-bloom Dose Event before the component settles again.

There is deliberately no ship, water, anchor, wheel, or nautical iconography in the artwork.
