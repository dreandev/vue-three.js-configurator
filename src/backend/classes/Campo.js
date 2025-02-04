import Base from "./Base";
import Caracteristica from "./Caracteristica";

export default class Campo extends Base {
  constructor(cod) {
    super(cod);
    this.caracteristicas = [];
  }

  addCaracteristica(caracteristica) {
    if (!(caracteristica instanceof Caracteristica)) {
      console.error("El elemento añadido no es una instancia de Caracteristica.");
      return;
    }
    this.caracteristicas.push(caracteristica);
  }

  getCaracteristica(cod) {
    return this.caracteristicas.find((carac) => carac.cod === cod);
  }

  setValor(cod, valor) {
    const caracteristica = this.getCaracteristica(cod);
    if (caracteristica) {
      caracteristica.setValor(valor);
    } else {
      console.warn(`No se encontró la característica con el código: ${cod}`);
    }
  }

  getValor(cod) {
    const caracteristica = this.getCaracteristica(cod);
    return caracteristica ? caracteristica.getValor() : null;
  }

  describe() {
    console.log(`Campo: ${this.cod}`);
    this.caracteristicas.forEach((carac) => carac.describe());
  }
}
