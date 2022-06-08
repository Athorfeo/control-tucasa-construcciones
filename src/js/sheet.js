// Auto Increment Id
async function fetchAutoIncrementId(sheet) {
  var lastId = -1;
  
  try {
    let response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: googleConfig.database,
      range: sheet.name + '!' + sheet.range.start + "2:" + sheet.range.start + '2',
    });
  
    lastId = parseInt(response.result.values[0][0]);
  } catch (error) {
    console.log(error)
  }

  return lastId;
}

function updateAutoIncrementId(sheet, id) {
  var values = [
    [id]
  ];

  var body = {
    values: values
  };

  gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: googleConfig.database,
    range: sheet.name + '!' + sheet.range.start + "2:" + sheet.range.start + '2',
    valueInputOption: 'USER_ENTERED',
    resource: body
  })
  .then(
    function(response) {
      console.log("UpdateAutoIncrementId Success!");
    },
    function(error) { 
      console.error("UpdateAutoIncrementId Error", error);
    }
  );
}


// Data
function fetchRows(sheet, successCallback, failedCallback){
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: googleConfig.database,
    range: sheet.name + '!' + sheet.range.start + "3:" + sheet.range.end,
  })
  .then(
    successCallback,
    failedCallback
  );
}

function addRows(sheet, rows, successCallback, failedCallback){
  var body = {
    values: rows
  };

  gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: googleConfig.database,
    range: sheet.name + '!' + sheet.range.start + "1:" + sheet.range.end + '1',
    valueInputOption: 'USER_ENTERED',
    resource: body
  })
  .then(
    function(response) {
      updateAutoIncrementId(sheet, rows[0][0]);
      successCallback(response);
    },
    failedCallback
  );
}

async function updateRow(sheet, indexRow, row, successCallback, failedCallback){
  var values = [
    row
  ];

  var body = {
    values: values
  };

  gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId: googleConfig.database,
    range: sheet.name + '!' + sheet.range.start + indexRow + ":" + sheet.range.end + indexRow,
    valueInputOption: 'USER_ENTERED',
    resource: body
  })
  .then(
    successCallback,
    failedCallback
  );
}

async function updateRows(sheet, indexStart, indexEnd, rows, successCallback, failedCallback) {
  var data = [];

  data.push({
    range: sheet.range.start + indexStart + ":" + sheet.range.end + indexEnd,
    values: rows
  });

  var body = {
    data: data,
    valueInputOption: 'USER_ENTERED'
  };

  gapi.client.sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: googleConfig.database,
    resource: body
  })
  .then(
    successCallback,
    failedCallback
  );
}
