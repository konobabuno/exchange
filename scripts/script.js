const amountFrom = document.getElementById('amountFrom')
const amountTo = document.getElementById('amountTo')

const btnReverse = document.getElementById('btnReverse')
const head = document.getElementById('headExchange')

const currencyFrom = document.getElementById('currencyFrom')
const currencyTo = document.getElementById('currencyTo')

const btnExchange = document.getElementById('btnExchange')

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

var access_key = 'yJx7twx7O2fU87AK0p1ODiXd'

axios.defaults.baseURL = 'https://fcsapi.com'

const exchangeCurrency = async () => {
    var currencyFromAxios = currencyFrom.textContent
    var currencyToAxios = currencyTo.textContent

    var symbol = currencyFromAxios + '/' + currencyToAxios
    
    try {
        const exchange = await axios({
            method: 'get',
            url: '/api-v3/forex/latest',
            params: {
                symbol,
                access_key
            }
        })
        return exchange.data.response[0].h
    } catch (error) {
        console.log(error)
    }
}