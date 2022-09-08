const amountFrom = document.getElementById('amountFrom')
const amountTo = document.getElementById('amountTo')

const btnReverse = document.getElementById('btnReverse')
const head = document.getElementById('headExchange')

const currencyFrom = document.getElementById('currencyFrom')
const currencyTo = document.getElementById('currencyTo')

const btnExchange = document.getElementById('btnExchange')

const access_key = 'yJx7twx7O2fU87AK0p1ODiXd'
let exchange

axios.defaults.baseURL = 'https://fcsapi.com'


btnReverse.addEventListener("click", reverseFunction)

function reverseFunction() {
    if (head.dataset.exchange == 0) {
        head.textContent = 'USD a MXN'
        currencyFrom.textContent = 'USD'
        currencyTo.textContent = 'MXN'
        head.dataset.exchange = 1
    } else {
        head.textContent = 'MXN a USD'
        currencyFrom.textContent = 'MXN'
        currencyTo.textContent = 'USD'
        head.dataset.exchange = 0
    }

}

btnExchange.addEventListener("click", exchangeFunction)

async function exchangeFunction() {
    const amountRes = await exchangeCurrency()

    amountConverted = amountRes * amountFrom.value
    amountTo.setAttribute("value", amountConverted)
}

const exchangeCurrency = async () => {
    let currencyFromAxios = currencyFrom.textContent
    let currencyToAxios = currencyTo.textContent

    let symbol = currencyFromAxios + '/' + currencyToAxios

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