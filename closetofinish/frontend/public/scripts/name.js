document.getElementById("nameinput").onclick = function(){
    var username = document.getElementById("USERNAME").value;
    console.log(username);
    window.location = "drink.html?username=" + encodeURIComponent(username);
}