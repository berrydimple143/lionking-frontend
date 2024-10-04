import moment from 'moment';
import dayjs from 'dayjs';
const currencyFormatter = require('currency-formatter');

export const getArrayofNumbers = (num, op, limit) =>
{
  let numbers = [];  
  for(let i=0; i<parseInt(limit); i++) {
    if(op === 'minus') {
      numbers[i] = parseInt(num) - i;
    } else if(op === 'plus') {
      numbers[i] = parseInt(num) + i;
    }    
  }
  return numbers;
}

export const formatCurrency = (num, cur) =>
{
  return currencyFormatter.format(num, { code: cur });
}

export const sumOfValues = (arr) => 
{
  return arr.reduce((sum, a) => sum + a, 0);
}

export const uploadURL = () =>
{
  return `${process.env.NEXT_PUBLIC_API}/api/documents/file-upload`;
}

export const processSales = (albums) =>
{
    let total = 0;
    albums.map((item, index) => {
        total += item.sales;
    });
    return total;
};

export const totalPayment = (payments) =>
{
    let total = 0;
    payments.map((item, index) => {
        total = parseFloat(total) + parseFloat(item.amount);
    });
    return total;
};

export const computeBalance = (price, amountPaid, cur) =>
{
  const diff = price - amountPaid;
  return currencyFormatter.format(diff, { code: cur });
}

export const computeBalanceNumber = (price, amountPaid) =>
{
  return price - amountPaid;  
}

export const totalCollectibles = (collectibles) => 
{
    let total = 0;    
    collectibles.map((item, index) => {
        let totalPay = 0;
        item.payments.map((item2, index) => {
          totalPay = parseFloat(totalPay) + parseFloat(item2.amount);
        });
        total += (parseFloat(item.contact.price) - parseFloat(totalPay));
    });
    return total;
}

export const formatDate = (date, fmt) =>
{
    let newDate = moment(date).format(fmt);
    return newDate;
};

export const formatToDatePicker = (date, fmt) =>
{
    let newDate = dayjs(date, fmt);
    return newDate;
};

export const computeAge = (date) =>
{
    let a = moment();
    let b = moment(date, 'YYYY-MM-DD');
    let age = a.diff(b, 'years');
    return age;
};

export const computeDiff = (date) =>
{
    let a = moment();
    let b = moment(date, 'YYYY-MM-DD');
    let dif = b.diff(a, 'days');
    return dif;
};
