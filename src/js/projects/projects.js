function getProjectSheet(){
  return googleConfig.sheet.projects;
}

function fetchProjects(){
  fetchRows(
    getProjectSheet(),
    function(response) {
      console.log("FetchProjects Response", response);
    },
    function(error) { 
      console.error("FetchProjects Error", error);
    }
  );
}

async function addProject(){
  let sheet = getProjectSheet();
  let lastId = (await fetchAutoIncrementId(sheet)) + 1;
  let row = [lastId, "PIAMONTE", "TUCASA CONSTRUCCIONES", "CASAS", "4", "728,000,000"];

  addRow(
    sheet,
    row,
    function(response) {
      console.log("AddProject Response:", response);
    },
    function(error) { 
      console.error("AddProject Error:", error);
    }
  );
}