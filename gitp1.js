function Git(repoName){
this.repoName = repoName;
this.lastCommitId = -1;
};

//actual command > git init
const repo = new Git('myRepo');

//add the ability on our Git class to create a commit or add a commit
Git.prototype.commit = function(message){
   let commit = new Commit(++this.lastCommitId,message);
    return commit;
};

Git.prototype.log = function(){
    // Start from HEAD commit
    history = [];
   // 1. Start from last commit
  // 2. Go back tracing to the first commit
  // 3. Push in `history`
    return history;
};

function Commit(id,message){
this.id = id;
this.message = message;
};

// Expose Git class on window.
window.Git = Git;

console.log("Git.log() test");
repo.commit("Initial commit");
repo.commit("Change 1");

var log = repo.log();
console.assert(log.length === 2); // Should have 2 commits.
console.assert(!!log[0] && log[0].id === 1); // Commit 1 should be first.
console.assert(!!log[1] && log[1].id === 0); // And then Commit 0.