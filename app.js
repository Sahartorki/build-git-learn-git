const Git = require('./script.js'); 

var repo = new Git("MyRepo");
repo.commit("Initial commit");
repo.commit("Added a new feature");
repo.checkout("new-branch");
repo.commit("Work on new-branch");

console.log(repo.log()); 
