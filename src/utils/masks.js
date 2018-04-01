import { createNumberMask, emailMask } from 'text-mask-addons'

const dateMask = [/\d/, /\d/, '/', /[\d]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
const cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
const phoneMask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
const cepMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
const timeMask = [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/]
const plateMask = [/[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, '-', /\d/, /\d/, /\d/, /\d/]
const valueMask = createNumberMask({
  suffix: '',
  prefix: '',
  thousandsSeparatorSymbol: '.',
  decimalSymbol: ',',
  requireDecimal: true
})

export { dateMask, cnpjMask, phoneMask, cepMask, timeMask, plateMask, valueMask, emailMask }