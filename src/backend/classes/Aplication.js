import Caracteristica from "./Caracteristica";

export default class Aplication {
  constructor() {
    this.campos = [];
    this.visualizer = false;
  }

  addCampo(campo) {
    if (!(campo instanceof Campo)) {
      console.error("El elemento añadido no es una instancia de Campo.");
      return;
    }
    this.campo.push(campo);
  }

  getCampo(cod) {
    return this.campos.find(campo => campo.cod === cod);
  }

  setValor(campoCod, caracteristicaCod) {
    const campo = this.getCampo(campoCod);
    return campo ? campo.getValor(caracteristicaCod) : null;
  }

  setVisualizer(estado) {
    this.visualizer = estado;
  }

  describe() {
    console.log("Aplicación:");
    this.campos.forEach(campo => campo.describe());
  }
}
