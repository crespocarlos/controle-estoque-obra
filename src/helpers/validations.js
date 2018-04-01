import moment from 'moment'

const required = value => (value ? undefined : 'Campo obrigatório')

const isDate = value => {
  const date = moment(value, 'DD/MM/YYYYY')
  return date.isValid() ? undefined : 'Data inválida'
}

const isNumber = value => (!isNaN(Number(value)) ? undefined : 'Valor inválido')

const isDay = value => isNumber(value) && Number(value) >= 1 && Number(value) <= 31
const isMonth = value => isNumber(value) && Number(value) >= 1 && Number(value) <= 12

export { required, isDate, isNumber, isDay, isMonth }