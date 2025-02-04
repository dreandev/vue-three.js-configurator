export default class Base {
    constructor() {
      this.cod = cod;
      this.literales = [];
    }
  
    /**
     * Obtiene el texto traducido (literal) correspondiente al idioma especificado.
     * @param {string} lang - Código del idioma (por ejemplo, 'es', 'en').
     * @returns {string} - Literal traducido o un texto por defecto con el código del elemento.
     */
    
    getLiteral(lang) {
      const match = this.literales.find((literal) => literal.codIdioma === lang);
      return match ? match.texto : `[${this.cod}]`;
    }
  
    addLiteral(lang, texto) {
      this.literales.push({ codIdioma: lang, texto });
    }
  
    describe() {
      console.log(`Elemento: ${this.cod}, Literales:`, this.literales);
    }
  }