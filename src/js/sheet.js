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

function addRow(sheet, row, successCallback, failedCallback){
  var values = [
    row
  ];

  var body = {
    values: values
  };

  gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: googleConfig.database,
    range: sheet.name + '!' + sheet.range.start + "1:" + sheet.range.end + '1',
    valueInputOption: 'USER_ENTERED',
    resource: body
  })
  .then(
    function(response) {
      updateAutoIncrementId(sheet, row[0]);
      successCallback(response);
    },
    failedCallback
  );
}
