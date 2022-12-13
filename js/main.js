const abecedario = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const textoIngresado = document.getElementById('texto-ingresado');
const resultado = document.getElementById('resultado');
const formulario = document.forms['formulario'];

function getDatos() {
  const texto = document.getElementById('texto').value.toUpperCase();
  const posiciones = parseInt(document.getElementById('posiciones').value);
  const accion = document.getElementById('accion').value;

  // Convierte el string en un arreglo
  const arregloTexto = texto.split('');

  // Comprueba que no haya espacios ni caracteres especiales en cada elemento del arreglo
  const validacion = arregloTexto.every(validar);

  if (validacion) {
    // Escribe lo ingresado por el usuario en el HTML
    textoIngresado.innerHTML = texto;
    
    // Resetea el formulario
    formulario.reset();

    // Llama a la funcion correspondiente
    if (accion === 'codificar') {
      resultado.innerHTML = codificar(arregloTexto, posiciones);
    } else if (accion === 'decodificar') {
      resultado.innerHTML = decodificar(arregloTexto, posiciones);
    }
  } else {
    alert('El texto NO debe contener espacios ni carácteres especiales.');
  }
}

// Retorna true o false si existe el elemento
function validar(elemento) {
  return abecedario.includes(elemento);
}

// Elimina los datos del area de resultados
function borrarDatos() {
  textoIngresado.innerHTML = '';
  resultado.innerHTML = '';
}

function codificar(arregloTexto, posiciones) {
  let posicion = [];
  let codificado = [];
  let numPosiciones = ((posiciones % 27) + 27) % 27;

  // Recorre el arreglo "arregloTexto"
  for (let i = 0; i < arregloTexto.length; i++) {
    // Añade al arreglo "posicion" la posicion en donde se encuentra la letra
    posicion.push( (abecedario.indexOf( arregloTexto[i] ) + numPosiciones) % 27 );
    // Busca la posicion en el arreglo "abecedario" y lo añade al arreglo "codificado"
    codificado.push( abecedario[ posicion[i] ] );
  }

  // Retorna el arreglo "codificado" como string
  return codificado.join('');
}

function decodificar(arregloTexto, posiciones) {
  let posicion = [];
  let decodificado = [];
  let numPosiciones = ((posiciones % 27) - 27) % 27;

  // Recorre el arreglo "arregloTexto"
  for (let i = 0; i < arregloTexto.length; i++) {
    // Añade al arreglo "posicion" la posicion en donde se encuentra la letra
    posicion.push( (abecedario.indexOf( arregloTexto[i] ) - numPosiciones) % 27 );
    // Busca la posicion en el arreglo "abecedario" y lo añade al arreglo "decodificado"
    decodificado.push( abecedario[ posicion[i] ] )
  }

  // Retorna el arreglo "decodificado" como string
  return decodificado.join('');
}