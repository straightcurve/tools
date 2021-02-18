current_branch=$(git rev-parse --abbrev-ref HEAD)

if [ -z "$current_branch" ]; then
    echo "Failed getting the current git branch."
    echo "Are you in a git repository?"
    exit
fi

to_merge="$1"

if [ -z "$to_merge" ]; then
    echo "Branch to merge from not specified."
    echo "Using default: develop"

    to_merge="develop"
fi

if [ "$current_branch" == "$to_merge" ]; then
    echo "Can't merge $current_branch into itself!"
    exit
fi

git checkout $to_merge && git pull && git checkout $current_branch && git merge --no-edit $to_merge && git push