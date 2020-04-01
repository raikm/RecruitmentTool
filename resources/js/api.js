function sendRequest(){
    var requestName = document.getElementById("fname").value
    var xPathInput = document.getElementById("xPathInputText").value
    var xhr = new XMLHttpRequest();
    var url = "http://192.168.0.39:8000/request/"
    xhr.open("POST", url, true);

    //Send the proper header information along with the request
    //xhr.setRequestHeader("Content-Type", "application/json");

    // var request = {
    //     "name": requestName,
    //     "xPath": xPathInput 
    // }
    // var xPathRequestJson = JSON.stringify(request)

    var file = document.getElementById("Files").files[0]
    console.log(file)
    var formData = new FormData();
    formData.append("name", requestName);
    formData.append("xPath", xPathInput);
    formData.append("File", file);
    console.log(formData)

    
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.

        }
    }

    

    xhr.send(formData);

}


