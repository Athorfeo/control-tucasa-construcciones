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
  let row = [
    [lastId, "PIAMONTE", "TUCASA CONSTRUCCIONES", "CASAS", "4", "728,000,000"]
  ];

  addRows(
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

async function updateProject(){
  let sheet = getProjectSheet();
  let row = ['3', "Hoola", "TUCASA CONSTRUCCIONES", "CASAS", "6", "728000000"];

  updateRows(
    sheet,
    5,
    row,
    function(response) {
      console.log("UpdateProject Response:", response);
    },
    function(error) { 
      console.error("UpdateProject Error:", error);
    }
  );
}

async function updateRowsProject(){
  let sheet = getProjectSheet();
  let rows = [
    ['3', "Hoola", "TUCASA CONSTRUCCIONES", "CASAS", "6", "728000000"],
    ['3', "Hoola", "TUCASA CONSTRUCCIONES", "CASAS", "6", "728000000"],
  ];

  updateRows(
    sheet,
    3,
    4,
    rows,
    function(response) {
      console.log("UpdateProject Response:", response);
    },
    function(error) { 
      console.error("UpdateProject Error:", error);
    }
  );
}