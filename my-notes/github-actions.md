# Github Actions

## Git Basics

```Bash
# Config
git config user.name # Get the username
git config user.email # Get the email
git config --global user.name "Sunny Bharne" # Set username 
git config --global user.email "example@email" # Set github email

# Git imp commands
git init # Initialise the git repo
git status
git add file1 file2
git commit -m "commit message"
git push
git log --all
git rm --cached File.name # Remove unstaged files
git restore --staged File.name # Remove unstaged files
git checkout -b branchName # Create and move to a new branch
git branch branchName # Create a new branch
git branch # List all branches
git branch -d branchName # Delete branch
git checkout commitHash # Move to a commit
git merge BranchName # move to main and then merge the code from Branch
git remote add origin https:/github.git # add remote repo
git clone https https:/github.git
git pull # get changes from remote (Can have conflicts)

# Make chagnes to the last commit
git revert "commitHash" # Create a new commit with the changes , without deleting the last commit
git reset --soft "commitHash" # Remove the last commit and keep the changes
git reset --hard "commitHash" # Remove the last commit and changes

### Stash
git stash # Stash the changes
git stash list # List all the stashes
git stash apply stash@{0} # Apply the stash
git stash drop stash@{0} # Drop the stash

### Gitignore
# Ignore all files in the root of the directory
*
# Except this file

### Rebase
git rebase branchName # Rebase the branch
git rebase --continue # Continue the rebase
git rebase --abort # Abort the rebase
```

## Github Actions
### Workflow (.github/workflows folder)
- Container one or more jobs (Can run in parallel)
- Each job runs on a separate VM
    - Each job runs a scipt or an action
    - Actions is a reusable unit of code
