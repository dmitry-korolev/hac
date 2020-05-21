const transparent = 'display: none!important;'

class ColorLite extends HTMLElement {
  connectedCallback() {
    this.card = document.createElement('ha-card');
    const container = document.createElement('div');

    this.card.appendChild(container);
    this.card.style.background = 'none';
    
    this.appendChild(this.card);
    
    const { image, color_image } = this.config
    
    this.imageElement = document.createElement('img')
    this.imageElement.setAttribute('width', '100%')
    this.imageElement.setAttribute('height', '100%')
    this.colorImageElement = document.createElement('img')
    this.colorImageElement.setAttribute('width', '100%')
    this.colorImageElement.setAttribute('height', '100%')

    if (image) {
      this.imageElement.setAttribute('src', image)
    }

    if (color_image) {
      this.colorImageElement.setAttribute('src', color_image)
    }

    container.appendChild(this.imageElement)
    container.appendChild(this.colorImageElement)

    this.update()
  }
  
  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    
    this.config = config;
  }
  
  set hass(hass) {
    console.log(hass)
    
    if (!hass) return
    
    this.state = hass.states[this.config.entity]
    
    if (!this.card) {
      return
    }
    
    this.update();
  }
  
  update() {
    if (!this.state) {
      return
    }
    
    if (this.state.state === 'off') {
      this.imageElement.setAttribute('style', transparent)
      this.colorImageElement.setAttribute('style', transparent)
      
      return;
    }

    const rgb_color = this.state.attributes.rgb_color
    const hs_color = this.state.attributes.hs_color
    const brightness = Math.min(1, this.state.attributes.brightness / 200) || 1
    let hue = ''

    if (hs_color && rgb_color !== '255,255,255') {
      hue = ' hue-rotate(' + hs_color[0] + 'deg)'
    }
    
    let style = `display: initial; filter: opacity(${brightness})${hue}!important`
    
    if (hue) {
      this.colorImageElement.setAttribute('style', style)
      this.imageElement.setAttribute('style', transparent)
    } else {
      this.imageElement.setAttribute('style', style)
      this.colorImageElement.setAttribute('style', transparent)
    }
  }
  
    // The height of your card. Home Assistant uses this to automatically
    // distribute all cards over the available columns.
    getCardSize() {
        return 3;
    }
}

customElements.define('color-lite-card', ColorLite);