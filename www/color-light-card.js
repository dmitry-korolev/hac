const cardTemplage = document.createElement('template')
cardTemplage.innerHTML = `
  <style>
  :host {
    background: none;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transform: translate(0, 0)!important;
  }

  img {
    mix-blend-mode: lighten;
    position: absolute;
    top: 0;
    width: 100%;
  }
  </style>
`

const transparent = 'filter: none; display: none;'

const getState = (state, image) => ({
  entity: image.entity,
  type: image.type,
  state: state.state,
  hs_color: state.attributes.hs_color,
  brightness: state.attributes.brightness
})

const stateChanged = (oldState, newState) => {
  return (
    (oldState.state !== newState.state)
    || (oldState.hs_color !== newState.hs_color)
    || (oldState.brightness !== newState.brightness)
  )
}

const getInitialUpdates = (config, newHass) => {
  const updates = []

  for (let image of config.images) {
    updates.push(getState(newHass.states[image.entity], image))
  }

  return updates
}

const getUpdates = (config, newHass, oldHass) => {
  if (!oldHass) {
    return getInitialUpdates(config, newHass)
  }
  
  const updates = []

  for (let image of config.images) {
    const newState = getState(newHass.states[image.entity], image)
    const oldState = getState(oldHass.states[image.entity], image)

    if (stateChanged(newState, oldState)) {
      updates.push(newState)
    }
  }

  return updates
}

class ColorLight extends HTMLElement {
  constructor() {
    super()
    
    this.imageElements = {}
    const template = cardTemplage.content.cloneNode(true)
    this.shadow = this.attachShadow({ mode: 'closed' })
    this.shadow.appendChild(template)
  }
  
  connectedCallback() {
    const { images } = this.config

    const container = document.createDocumentFragment()

    for (let image of images) {
      const imageElement = document.createElement('img')
      imageElement.setAttribute('height', '100%')
      imageElement.setAttribute('width', '100%')
      imageElement.setAttribute('src', image.image)
      imageElement.setAttribute('style', transparent)
      container.appendChild(imageElement)

      this.imageElements[image.entity] = imageElement
    }

    this.shadow.appendChild(container)
    this.connected = true
  }
  
  setConfig(config) {
    this.config = config
  }
  
  set hass(hass) {
    if (!hass) return
    if (!this.connected) return

    const updates = getUpdates(this.config, hass, this._hass)
    
    if (updates.length) {
      this._hass = hass
      this.update(updates)
      console.log(updates)
    }
  }

  update(updates) {
    updates.forEach(({ entity, state, hs_color, brightness }) => {
      const imageElement = this.imageElements[entity]

      if (state === 'off') {
        imageElement.setAttribute('style', transparent)
        return
      }

      const hue = 'hue-rotate(' + (hs_color ? hs_color[0] : 0) + 'deg)'
      const filter = `filter: opacity(${brightness}) ${hue}!important;`

      imageElement.setAttribute('style', filter)
    });
  }

  getCardSize() {
      return 3;
  }
}

customElements.define('color-light-card', ColorLight);
