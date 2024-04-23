document.getElementById("nameinput").onclick = function(){
    var username = document.getElementById("USERNAME").value.trim();
    console.log(username);
    if (username == ""){
        alert("pls fill your name");
    }else{
        window.location = "drink.html?username=" + encodeURIComponent(username);
    }
    
}