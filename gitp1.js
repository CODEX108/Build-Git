/**
 * Commit class
 * A single commit.
 *
 * @param {number} id  		 ID of commit.
 * @param {Commit} parent	 Parent Commit.
 * @param {string} msg 		 Commit message.
 */
class Commit {
    constructor(id, parent, message) {
        this.id = id;
        this.parent = parent;
        this.message = message;
    }
}

class Branch {
    constructor(name, commit) {
        this.name = name,
            this.commit = commit
    }
};



/**
 * Git class
 * Represents a Git repository.
 *
 * @param {string} name Repository name.
 */
class Git {
    constructor(name) {
        this.name = name; // Repo name
        this.lastCommitId = -1; // Keep track of last commit id.
        this.branches = []; //list of all branches

        let master = new Branch('master', null); // null is passed as we don't have any commit yet.
        this.branches.push(master); //store master branch
        this.HEAD = master; // Reference to the current branch.
    }

    /**
* Make a commit.
* @param  {string} message Commit message.
* @return {Commit}         Created commit object.
*/
    commit(message) {
        // Increment last commit id and pass into new commit.
        var commit = new Commit(++this.lastCommitId, this.HEAD.commit, message);

        // Update HEAD and current branch.
        this.HEAD.commit = commit;

        return commit;
    };

    checkout(branchName) {
        // Check if a branch already exists with name = branchName
        for (let i = this.branches.length; i--;) {
            if (this.branches[i].name === branchName) {
                //if branch exists, update HEAD to point to this branch
                // We found an existing branch
                console.log("Switched to existing branch: " + branchName);
                this.HEAD = this.branches[i];
                return this;
            }
        }

        // We reach here when no matching branch is found
        //create a new branch
        let newBranch = new Branch(branchName, this.HEAD.commit);
        // Store branch.
        this.branches.push(newBranch);
        // Update HEAD
        this.HEAD = newBranch;
        console.log("Created new branch: " + branchName);
        return this;
    }

    /**
 * Logs history.
 * @return {Array} Commits in reverse chronological order.
 */
    gitLog() {
        // Start from HEAD
        let commit = this.HEAD.commit,
            history = [];

        while (commit) {
            history.push(commit);
            // Keep following the parent
            commit = commit.parent;
        }

        return history;
    };

}

// Expose Git class on window.
window.Git = Git;
console.log("3. Branches test");

let repo = new Git("test");
repo.commit("Initial commit");
repo.commit("Change 1");

// Maps the array of commits into a string of commit ids.
// For [C2, C1,C3], it returns "2-1-0"
function historyToIdMapper(history) {
    var ids = history.map(function (commit) {
        return commit.id;
    });
    return ids.join("-");
}

console.assert(historyToIdMapper(repo.gitLog()) === "1-0"); // Should show 2 commits.

repo.checkout("testing");
repo.commit("Change 3");


console.assert(historyToIdMapper(repo.gitLog()) === "2-1-0"); // Should show 3 commits.

repo.checkout("master");
console.assert(historyToIdMapper(repo.gitLog()) === "1-0"); // Should show 2 commits. Master unpolluted.

repo.commit("Change 3");
console.assert(historyToIdMapper(repo.gitLog()) === "3-1-0"); // Continue on master with 4th commit.

