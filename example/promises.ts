/* NOTA: Revisar el package.json.
  Para ejecutar este archivo, es necesario utilizar un comando recientemente agregado a package.json
  El comando es example:promise, por lo tanto deberia ejecutarse asi --> npm run example:promise.
*/

// Una promesa es un objeto que nos promete devolver un valor en algun momento.

/* Ya vimos en clase que pueden tener 3 estados.
    - Pending: la promesa aun se esta ejecutando.
    - Fulfilled: la promesa se completo correctamente.
    - Rejected: hubo un error o exception.
Esos son los estados que por el momento nos van a interesar
Existe un 4to estado, el cual indica que la promesa termino de ejecutarse, ya sea por success o error, pero ese estado sera
cuando ya se haya completado sin importar si salio bien o mal.
Ese estado es conocido como "Settled".

Muchas veces de sea "avanzar" o realizar cierta accion sin depender de como haya sido el resultado de esa promesa, en esos casos
se podria utilizar el state "Settled".
*/

// ¿Como creo una promesa?

// Instancio una nueva Promise y entre "menor" y "mayor" le paso que tipo de dato va a devolver en la funcion resolve/reject
// en este caso al ser void, no devuelve nada, por lo tanto no necesito pasar ningun argumento a dichas funciones.

const miPromesa = new Promise<void>((resolve, reject) => {
  // resolve, es una funcion la cual voy a utilizar cuando desee devolver un resultado correcto, es decir, que
  // cuando ejecute dicha funcion, la promesa pasara a estado de success luego de haber ejecutado el codigo correctamente.
  resolve(); // No necesariamente se debe enviar un parametro en la funcion resolve, la promesa puede ser del tipo void, entonces
  // no hace falta que se le pase ningun parametro. En este caso mi promesa esta tipada como Promise<void>.
  reject(); // La funcion reject, se debe utilizar en caso de fallo, que ocurra un error o surja alguna exception.
});

// Ejemplo una funcion timer que espere los segundos indicados por parametro, utilizando promesas.

// Declaro mi funcion waitFor
const waitFor = (ms: number) => {
  // No siempre es necesario usar ambos metodos.
  // Tampoco hace falta que la guarde en una variable, en este caso en vez de guardarla en una variable, la devuelvo directamente.
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve(); // En este caso solo quiero usar resolve.
    }, ms);
  });

  // Si quiero guardarla en una variable y luego retornarla, podria hacerlo de la siguiete manera:
  /*

  const promesa = new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve(); // En este caso solo quiero usar resolve.
    }, ms);
  });
  return promesa;

*/
};

// Utilizo mi funcion waitFor
// Declaro la funcion start que va a hacer mi punto de entrada en este archivo, para que cuando corra el comando npm run example:promise
// al estar ejecutando start() en la linea 36, correra la funcion que hara uso de waitFor y luego logueara el mensaje de la linea 33
// Por lo tanto utilizando await, "frene" el codigo de alguna manera para poder esperar el resultado de la promesa que devolvia mi funcion "waitFor"
const start = async () => {
  // Hago uso de try catch, en caso de q la promesa salga bien, el bloque que encierra "try" seguira ejecutandose correctamente.
  try {
    const time = 2000;
    await waitFor(time);
    // este codigo espera por 2 segundos
    // y luego sigue normalmente con la ejecucion.
    console.log(`Success: Luego de ${time} segundos se muestra este mensaje`);
  } catch (error) {
    // En caso de que la promesa falle, saldra por este bloque, cortando el proceso previo del try, es decir, terminaria la ejecucion el la linea 49.
    // Aca puedo obtener informacion sobre por qué fallo la promesa, puede deberse a una exception, erroes en el codigo o cualq otro motivo.
    console.log("Error: ", error);
  } finally {
    // Este bloque se podria utilizar para hacer uso del estado "Settled" de la promesa, ya que salga bien o mal, finally correria igualmente al final de todo.
    console.log(
      "Finally: Mi promesa termino de correr, sea por Fulfilled (salio bien) o Rejected (salio mal), esta parte del codigo se ejecuta de todas formas"
    );
  }
};

/**
 * Ejemplo de la funcion start, utilizando la sintaxis de EcmaScript 5 
  const start = () => {
    const time = 2000;
    waitFor(time)
      .then(() => {
        console.log(`Success: Luego de ${time} segundos se muestra este mensaje`);
      })
      .catch((err) => {
        console.log("Error: ", err);
      })
      .finally(() => {
        console.log(
          "Finally: Mi promesa termino de correr, sea por Fulfilled (salio bien) o Rejected (salio mal), esta parte del codigo se ejecuta de todas formas"
        );
      });
  };
 */

start(); // Ejecuto la funcion "start", la cual se encarga de ejecutar waitFor y hacer los console.logs correspondientes.
