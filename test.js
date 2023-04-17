let ip1 = "123456789123....."
let ip2 = "1234"
let ip3 = ""
let ip4 = ""

const ipRegex = new RegExp("[1-2]?[0-9]?[0-9]\.[1-2]?[0-9]?[0-9]\.[1-2]?[0-9]?[0-9]\.[1-2]?[0-9]?[0-9]", "i")

// const ipRegex = /[0-9]{3}^./i;


//NOTATKI
// reg exp można zrobić na dwa sposoby

//literal notation
let newRegExp = /[0-5]{3}/i;
//RegExp constructor - jeśli from input to lepiej to
let newRegExp2 = new RegExp("[0-5]{3}", "i");

// i = flag

//.test "tests for a match in its str string parameter"
//console.log(newRegExp.test(something));

const another = new RegExp("[0-9]{3}\.$", "i")

//z $ na końcu przejdzie 111. ale już 111.2 nie
//ALE znowu przejdzie też 888 bez kropki
// bez $ sprawdzi czy są minimum 3 znaki i później ju




// let's check i