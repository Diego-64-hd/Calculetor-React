import { useState } from "react";
import Input from "./input.jsx";
import "./calculadora.css";

const MENSAJE_ERROR = "Error de sintaxis";

const BOTONES = [
  { texto: "7", valor: "7", clase: "num" },
  { texto: "8", valor: "8", clase: "num" },
  { texto: "9", valor: "9", clase: "num" },
  { texto: "DEL", accion: "borrar", clase: "borrar" },
  { texto: "AC", accion: "limpiar", clase: "borrar" },
  { texto: "4", valor: "4", clase: "num" },
  { texto: "5", valor: "5", clase: "num" },
  { texto: "6", valor: "6", clase: "num" },
  { texto: "×", valor: "×", clase: "opt" },
  { texto: "÷", valor: "÷", clase: "opt" },
  { texto: "1", valor: "1", clase: "num" },
  { texto: "2", valor: "2", clase: "num" },
  { texto: "3", valor: "3", clase: "num" },
  { texto: "+", valor: "+", clase: "opt" },
  { texto: "−", valor: "−", clase: "opt" },
  { texto: "0", valor: "0", clase: "num" },
  { texto: ".", valor: ".", clase: "num" },
  { texto: "ANS", accion: "ans", clase: "num" },
  { texto: "%", valor: "%", clase: "opt" },
  { texto: "=", accion: "calcular", clase: "igual" },
];

function evaluarExpresion(expresion) {
  const expresionNormalizada = expresion.replace(/[×÷−]/g, (simbolo) => {
    const operadores = { "×": "*", "÷": "/", "−": "-" };
    return operadores[simbolo];
  });
  const expresionSinEspacios = expresionNormalizada.replace(/\s/g, "");
  const tokens = expresionSinEspacios.match(
    /(?:\d+(?:\.\d*)?|\.\d+)|[()+\-*/%]/g,
  );

  if (!tokens || tokens.join("") !== expresionSinEspacios) {
    return MENSAJE_ERROR;
  }

  try {
    let posicion = 0;

    function leerExpresion() {
      let valor = leerTermino();

      while (tokens[posicion] === "+" || tokens[posicion] === "-") {
        const operador = tokens[posicion];
        posicion += 1;
        const siguienteValor = leerTermino();
        valor = operador === "+" ? valor + siguienteValor : valor - siguienteValor;
      }

      return valor;
    }

    function leerTermino() {
      let valor = leerFactor();

      while (["*", "/", "%"].includes(tokens[posicion])) {
        const operador = tokens[posicion];
        posicion += 1;
        const siguienteValor = leerFactor();

        if (operador === "*") {
          valor *= siguienteValor;
        } else if (operador === "/") {
          valor /= siguienteValor;
        } else {
          valor %= siguienteValor;
        }
      }

      return valor;
    }

    function leerFactor() {
      const token = tokens[posicion];

      if (token === "+" || token === "-") {
        posicion += 1;
        const valor = leerFactor();
        return token === "-" ? -valor : valor;
      }

      if (token === "(") {
        posicion += 1;
        const valor = leerExpresion();

        if (tokens[posicion] !== ")") {
          throw new SyntaxError(MENSAJE_ERROR);
        }

        posicion += 1;
        return valor;
      }

      if (token === undefined || token === ")") {
        throw new SyntaxError(MENSAJE_ERROR);
      }

      posicion += 1;
      return Number(token);
    }

    const resultado = leerExpresion();

    if (posicion !== tokens.length) {
      return MENSAJE_ERROR;
    }

    return Number.isFinite(resultado)
      ? resultado
      : MENSAJE_ERROR;
  } catch (error) {
    if (!(error instanceof SyntaxError)) {
      throw error;
    }

    return MENSAJE_ERROR;
  }
}

function Calculadora() {
  const [numero, setNumero] = useState("");
  const [ultimoResultado, setUltimoResultado] = useState(0);
  const [mensajeError, setMensajeError] = useState("");

  function manejarBoton(boton) {
    if (boton.accion === "limpiar") {
      setNumero("");
      setMensajeError("");
      return;
    }

    if (boton.accion === "borrar") {
      setNumero((valorActual) => valorActual.slice(0, -1));
      setMensajeError("");
      return;
    }

    if (boton.accion === "calcular") {
      const resultado = evaluarExpresion(numero);

      if (typeof resultado !== "number") {
        setMensajeError(resultado);
        return;
      }

      setNumero(String(resultado));
      setUltimoResultado(resultado);
      setMensajeError("");
      return;
    }

    const valor = boton.accion === "ans" ? String(ultimoResultado) : boton.valor;
    setNumero((valorActual) => `${valorActual}${valor}`);
    setMensajeError("");
  }

  const resultadoActual = numero ? evaluarExpresion(numero) : "";
  const resultadoVisible =
    mensajeError ||
    (typeof resultadoActual === "number" ? resultadoActual : "");

  return (

    <main className="calculadora">
      <div className="pantalla">
        <Input
          value={numero}
          onChange={(valor) => {
            setNumero(valor);
            setMensajeError("");
          }}
          resultado={resultadoVisible}
        />
      </div>

      <div className="botones">
        {BOTONES.map((boton) => (
          <button
            key={boton.texto}
            type="button"
            className={boton.clase}
            onClick={() => manejarBoton(boton)}
          >
            {boton.texto}
          </button>
        ))}
      </div>
          <h2 style={{ borderTop: "1px solid #fff", padding: "10px", color: "#ccc", fontSize: "14px" }}>This App Web created by Diego Hernández</h2>
    </main>
    );
}

export default Calculadora;
