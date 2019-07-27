//runs user status check (OpenAPI session) when the page is loaded
document.addEventListener("DOMContentLoaded", get_status);

//checks user OpenAPI session status
function get_status() {
    VK.Auth.getLoginStatus(function (val) {
        if (val.session === null) {
            switch_buttons(false);
        } else {
            get_user_info(val).then(set_user_info).then(vk_cont());
        }
    });
}

//gets user's first name, last name and photo
function get_user_info(val){
    return new Promise(function (resolve, reject) {
        console.log(val)
        id = val.mid;
        VK.Api.call('users.get', {users_id: id, "fields": "photo_50"}, function(user_info){
            if (user_info !== null){
                console.log(user_info);
                resolve(user_info.response[0]);
            }
        });
    });
}

//pushes user info to the app page
function set_user_info(val){
    return new Promise(function (resolve, reject) {
        
        username = val.first_name + " " + val.last_name;
        var newP = document.createElement("p");
        var newImg = document.createElement("img");
        newImg.setAttribute("src", val.photo_50);
        newP.innerHTML = username;
        //newP.setAttribute("class", "friend");
        newP.setAttribute("id", "visitor");
        descP = document.createElement("p");
        descP.setAttribute("id", "this-is-you");
        descP.innerHTML = "это вы";
        document.getElementById("user_link").setAttribute("href",  "https://vk.com/id" + val.uid)
        document.getElementById("user_link").setAttribute("target", "_blank");
        document.getElementById("user").appendChild(newImg);
        document.getElementById("user").appendChild(descP);
        document.getElementById("user").appendChild(newP);
        if (newP.length > 0){
            resolve();
        }
    });

}

//gets pictures and names of user's friends
function get_user_friends(val) {
    return new Promise(function (resolve, reject) {
        VK.Api.call('friends.get', {"order": "random", "count": 5, "fields": "online,photo_50"}, function (friend_list) {
            if (friend_list) {
                resolve(friend_list.response);
            }
        });
    });
}

//pushes friends info to the page
function set_user_friends(friend_list) {
    for (var i in friend_list){
        var newP = document.createElement("p");
        var newImg = document.createElement("img");
        var newDiv = document.createElement("div");
        newImg.setAttribute("src", friend_list[i].photo_50);
        newDiv.setAttribute("class", "friend");
        newP.innerHTML = friend_list[i].first_name + " " + friend_list[i].last_name;
        newDiv.appendChild(newImg);
        newDiv.appendChild(newP);
        var newA = document.createElement("a");
        newA.setAttribute("href", "https://vk.com/id" + friend_list[i].uid);
        newA.setAttribute("target", "_blank");
        newA.appendChild(newDiv);
        document.getElementById("results").appendChild(newA);
        //document.getElementById("results").appendChild(newP);
    }
}

//logs user out
function logout(){
    VK.Auth.logout(function (){
        document.getElementById("buttons").style.display = "block";
    });
}
