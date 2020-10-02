var displayUsersList = document.getElementById("displayUsersList");

var API = "http://localhost:8080/lunchtime";
var token = "";

function init() {
    ApiConnection();
}

function ApiConnection() {
    var credentials = {
        email: "toto@gmail.com",
        password: "bonjour"
    }

    var options = {
        method: "POST",
        body : JSON.stringify(credentials)
    };

    fetch(API + '/login', options)
    .then(res => {
        token = res.headers.get("Authorization");
        if(token) {
            console.log("login successful");
            getAllUsers();

        }
        else {
            console.log("login not successful");
        }
    });
} 

function getAllUsers() {
    var options = {
        headers : {
            "Authorization" : token
        }
    };
    fetch(API + '/user/findall', options)
    .then(res => {
        if(res.status === 401) {
            console.log("il faut se logger d'abord");
        }

        if(res.status === 200) {
            return res.json();
        }
    })
    .then( users => {
        //console.log(users);
        initDisplayUsers(users);
    });
}

function initDisplayUsers(raw_usersList) {
    displayUsers(raw_usersList);  
}

function displayUsers(raw_usersList){
    //var div = document.createElement("div");
    var tabUsers = raw_usersList;
    tabUsers.forEach(user => {
        var div_test = document.createElement("div");
        div_test.setAttribute('id', user.id);

        var name = document.createElement('input');
        name.setAttribute('type', 'text');
        name.setAttribute('value', user.name)
        name.readOnly = true;
        console.log(name);

        var firstname = document.createElement('input');
        firstname.setAttribute('type', 'text');
        firstname.setAttribute('value', user.firstname);
        firstname.readOnly = true;

        var wallet = document.createElement('input');
        wallet.setAttribute('type', 'number');
        wallet.setAttribute('value', user.wallet);
        wallet.setAttribute('id', "wallet");

        var button = document.createElement('button');
        button.setAttribute('id', "btnWallet");
        button.setAttribute('type', 'button');
        button.setAttribute("onclick", "editWallet("+user.id+","+user.wallet+")");
        button.innerHTML = "edit";

        div_test.appendChild(name);
        div_test.appendChild(firstname);
        div_test.appendChild(wallet);
        div_test.appendChild(button);
        displayUsersList.appendChild(div_test);
        //div.appendChild(div_test);
    })
    return displayUsersList;
}

function editWallet(id, wallet) {
    var initWallet = wallet;
    var newWallet = 0;
    var display = displayUsersList.children;
    for (var i = 0; i < display.length; i++){
        if(display[i].id == id){
            var display2 = display[i].children;
            for (var y = 0; y < display2.length; y++){
                if(display2[y].id == "wallet") {
                    newWallet = display2[y].value;   
                }
            }
            
        }
    }

    if(initWallet < newWallet) {
        creditWallet(id, newWallet);
    }

    else {
        debitWallet(id, newWallet);
    }
}

function creditWallet(id, wallet) {
    var credentials = {
        id: id,
        amount: wallet
    }

    var options = {
        headers : {
            "Authorization" : token
        },
        method: "POST",
        body : JSON.stringify(credentials)
    };

    fetch(API + '/user/credit/'+id, options)
    .then(res => {
        if(token) {
            console.log(res.status);
            return res.json();

        }
        else {
            console.log("wallet not update");
        }
    })
    .catch(err => {
        console.log(err);
    });
}

function debitWallet() {

}



init();