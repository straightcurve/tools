[ "$UID" -eq 0 ] || exec sudo bash "$0" "$@"

merge_branch="merge_branch"
src="$merge_branch.sh"
dest="/usr/bin/$merge_branch"

msg=""

if test -f "$dest"; then
    msg="Updated"

    sudo rm $dest
else
    msg="Installed"
fi

sudo cp $src $dest
sudo chmod +x $dest

echo $msg $dest