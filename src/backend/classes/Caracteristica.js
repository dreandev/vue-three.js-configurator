import Base from "./Base";

export default class Caracteristica extends Base {
    constructor(cod, valorInicial, tipo = "string") {
        super(cod);
        this.valor = valorInicial; //valor inicial de la caracteristica (true, 5, #ffffff)
        this.tipo = tipo; //tipo de valo (boolean, Number, String...)
        this.min = null;
        this.max = null;
    }

    getValor() {
        return this.valor;
    }

    setValor(val) {
        if(!this.validarValor(val)) {
            console.warn(`Valor inválido para la característica ${this.cod}`);
            return;
        }
        this.valor = val;
    }

    validarValor(val) {
        if(this.tipo === "number") {
            if (typeof val !== "number") return false;
            if (this.min !== null && val < this.min) return false;
            if (this.max !== null && val > this.max) return false;
        } else if (this.tipo === "boolean") {
            return typeof val === "boolean";
        } else if (!this.tipo === "color") {
            return /^#[0-9A-Fa-f]{6}$/.test(val);
        }
        return true;
    }

    setLimites(min, max) {
        this.min = min;
        this.max = max;
    }

    describe() {
        console.lo(`Característica: ${this.cod}, valor: ${this.valor}, tipo: ${this.tipo}`);
    }
}