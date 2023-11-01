export function getCurrentDateFormatted() {
  const rawDate = new Date();
  const year = rawDate.getFullYear();
  let month = (rawDate.getMonth() + 1);
  let day = rawDate.getDate();

  if( month < 10 ) {
    month = "0" + month;
  }

  if( day < 10 ) {
    day = "0" + day;
  }

  return `${year}-${(month)}-${day}`;
}

export function formatDate(date){
  const splitted = date.split('-');
  return `${splitted[2]}/${(splitted[1])}/${splitted[0]}`;
}
