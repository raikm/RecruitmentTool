function fillxPath_1(){
    var xPathInput = document.getElementById("xPathInputText")
    xPathInput.value = "//recordTarget[number(substring(patientRole/patient/birthTime/@value,1,4)) < 2015]/patientRole/patient/birthTime/@value"  
    var criteriaInput = document.getElementById("criterium")
    criteriaInput.value = "Älter als 6"        
}

function fillxPath_2(){
    var xPathInput = document.getElementById("xPathInputText")
    xPathInput.value = "//observation[templateId/@root = \"1.2.40.0.34.11.1.3.6\" and value/@code = \"M25.46\"]"     
    var criteriaInput = document.getElementById("criterium")
    criteriaInput.value = "ICD Diagnose M.25.46"    

}

function fillxPath_3(){


}