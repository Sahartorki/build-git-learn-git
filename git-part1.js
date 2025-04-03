;(function () {
	function Commit(id, parent, message) {
		this.id = id;
		this.parent = parent;
		this.message = message;
	}

	function Branch(name, commit) {
		this.name = name;
		this.commit = commit;
	}

	function Git(name) {
		this.name = name;
		this.lastCommitId = -1; 
		this.branches = []; 

		var master = new Branch('master', null); 
		this.branches.push(master); 

		this.HEAD = master; 
	}

	Git.prototype.commit = function (message) {
		var commit = new Commit(++this.lastCommitId, this.HEAD.commit, message);
		this.HEAD.commit = commit;

		return commit;
	};

	Git.prototype.checkout = function (branchName) {
		for (var i = this.branches.length; i--;){
			if (this.branches[i].name === branchName) {
				console.log('Switched to existing branch: ' + branchName);
				this.HEAD = this.branches[i];
				return this;
			}
		}

		var newBranch = new Branch(branchName, this.HEAD.commit);
		this.branches.push(newBranch);
		this.HEAD = newBranch;

		console.log('Switched to new branch: ' + branchName);
		return this;
	}

	Git.prototype.log = function () {
		var commit = this.HEAD.commit,
			history = [];

		while (commit) {
			history.push(commit);
			commit = commit.parent;
		}

		return history;
	};
	window.Git = Git;
})();