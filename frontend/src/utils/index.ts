import moment from 'moment';


export const amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const dateFormatter = (dateTime: string): string => {
 const formatted = moment(dateTime).format('MMMM Do');
 
 return formatted;
}