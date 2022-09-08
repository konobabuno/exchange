//Aqui tendremos nuestras variables que ocuparemos en nuestro codigo.

//Variables de las cantidades que se modificaran y mostraran respectivamente.
const amountFrom = document.getElementById('amountFrom')
const amountTo = document.getElementById('amountTo')

//Variable del button en donde daremos click para revertir el contenido del recuadro.
const btnReverse = document.getElementById('btnReverse')
//Variable del titulo de nuestra card.
const head = document.getElementById('headExchange')

//Variable de la currency (MXN o USD) que se tomara en cuenta para hacer nuestra peticion
const currencyFrom = document.getElementById('currencyFrom')
const currencyTo = document.getElementById('currencyTo')

//Variable del button para convertir nuestras cantidades.
const btnExchange = document.getElementById('btnExchange')

//El access Key utilizado para nuestras peticiones.
const access_key = 'yJx7twx7O2fU87AK0p1ODiXd'
//La direccion de la API que usaremos.
axios.defaults.baseURL = 'https://fcsapi.com'

//Variable para el cambio de cantidades.
let exchange

//Se escucha el evento del button de reverse para utilizar la funcion reverseFunction.

//Funcion para cambiar tanto el texto como las currencies en nuestro codigo.
btnReverse.addEventListener("click", reverseFunction)

function reverseFunction() {
    //Se da una variable de control para poder saber si se convertira de USD a MXN o de MXN a USD
    if (head.dataset.exchange == 0) {
        head.textContent = 'USD a MXN'
        currencyFrom.textContent = 'USD'
        currencyTo.textContent = 'MXN'
        //Se le da un valor a la variable de control para pasar al siguiente estado
        head.dataset.exchange = 1
    } else {
        //Se entra al siguiente estado.
        head.textContent = 'MXN a USD'
        currencyFrom.textContent = 'MXN'
        currencyTo.textContent = 'USD'
        head.dataset.exchange = 0
    }

}

//Se escucha el evento al dar click en el boton exchange para utilizar la funcion: exchangeFunction.
btnExchange.addEventListener("click", exchangeFunction)

//Esta funcion recibe la data.response[0].h que es el rate, esto de la 
//funcion exchangeCurrency en un dato que podamos utilizar.
//Luego lo multiplica y convierte en la cantidad que se dara.
async function exchangeFunction() {
    const amountRes = await exchangeCurrency()
    //Multiplicamos el rate por el valor de la cantidad y se manda al campo de texto.
    amountConverted = amountRes * amountFrom.value
    amountTo.setAttribute("value", amountConverted)
}

//Por medio de Axios se hace una peticion para obtener el rate para convertir USD a MXN o viceversa
const exchangeCurrency = async () => {
    //Se toma las variables de las currencies para darselas a Axios y hacer la peticion.
    let currencyFromAxios = currencyFrom.textContent
    let currencyToAxios = currencyTo.textContent

    //Se toman las variables para darselas en nuestra peticion y obtener la informacion del rate dependiendo de la
    //currency solicitada.
    let symbol = currencyFromAxios + '/' + currencyToAxios

        //axios hace la peticion en conjutno a las variables ya especificadas y nos devuelve la informacion para luego
        //Regresarla a las anteriores funciones
        await axios({
            method: 'get',
            url: '/api-v3/forex/latest',
            params: {
                symbol,
                access_key
            }
        }).then( res => {
            exchange = res.data.response[0].h
        }).catch( error => {
            console.log(error)
        })
        return exchange
 
}