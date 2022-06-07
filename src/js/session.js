var mIsAuthorized = false;
var googleSession = null;

$(function() {
  loadSession()
  validateSession()
});

function isAuthorized() {
  return mIsAuthorized;
}

function getSession() {
  return googleSession;
}

function setSession(obj) {
  let timestamp = new Date().getTime();

  obj.timestamp = timestamp;
  obj.timestampExpiration = timestamp + (obj.expires_in * 1000);

  let json = JSON.stringify(obj);
  console.log("Saving Google Session!");

  sessionStorage.setItem(GOOGLE_SESSION_KEY, json);
  loadSession();
}

function removeGoogleSession() {
  sessionStorage.removeItem(GOOGLE_SESSION_KEY);
}

function loadSession(){
  var json = sessionStorage.getItem(GOOGLE_SESSION_KEY);

  console.log("Loading Google Session!");
  console.log(json);

  googleSession = JSON.parse(json);

  let timestamp = new Date().getTime();
  if(timestamp > googleSession.timestampExpiration){
    mIsAuthorized = false;
  } else {
    mIsAuthorized = true;
  }

  console.log("isAuthorized: " + mIsAuthorized);
}

function validateSession(){
  let pathname = window.location.pathname;

  switch(pathname) {
    case  '/auth':
      //TODO: Redirect to Dashboard
    break;

    default:
      if(!isAuthorized){
        window.location.replace("./auth");
      }
    break;
  }
}