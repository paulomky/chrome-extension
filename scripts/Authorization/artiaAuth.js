function artiagetToken(){
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var graphql = JSON.stringify({
  query: "mutation{\n    authenticationByEmail(email:\"penedoleite@gmail.com\", password: \"DPLFrancisFN2187!\") {\n        token\n  }\n}",
  variables: {}
})
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: graphql,
  redirect: 'follow'
};

fetch("https://app.artia.com/graphql", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
