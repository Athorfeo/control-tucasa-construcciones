var client = null

window.onload = function () {
  client = google.accounts.oauth2.initTokenClient({
    client_id: googleConfig.clientId,
    scope: googleConfig.scope,
    callback: (response) => {
      setSession(response);
    },
  });
}

function startGoogleApiClient(){
  gapi.client.init({
    apiKey: googleConfig.apiKey,
    discoveryDocs: googleConfig.discoveryDocs,
  }).then(function() {
    console.log("Google API Client loaded!");
    if(isAuthorized()){
      updateAccessToken();
    }
  });
};

function updateAccessToken(){
  gapi.auth.setToken({
    access_token: getSession().access_token
  })
  console.log("Access Token updated!");
}

function requestAccessToken(){
  client.requestAccessToken();
}

gapi.load('client', startGoogleApiClient);