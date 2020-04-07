function sendRequest(){

    var url = "http://192.168.0.30:8000/api/create/"

    const criteria = document.getElementById("criteria").value
    const xPathInput = document.getElementById("xPathInputText").value
    const files = document.getElementById("files")
    const only_current_cohort = document.getElementById("only_current_cohort").checked
    const description = document.getElementById("description").value
    const criterium = document.getElementById("criterium").value



    const formData = new FormData()
    formData.append("Criteria_Name", criteria)
    formData.append("Description", description)
    formData.append("Only_current_patient_cohort", only_current_cohort)
    //TODO: loop threw a list 
    formData.append("Criterium_Name", criterium)
    formData.append("xPath", xPathInput)
    for (const file of files.files){
        formData.append("file", file);
    }


    fetch(url, {
        method: "POST",
        body: formData
    }).catch(console.error)


}


