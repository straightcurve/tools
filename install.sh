[ "$UID" -eq 0 ] || exec sudo bash "$0" "$@"

bash_tools=('merge_branch' 'proton')
js_tools=('delete_branches' 'ngjs.js')

for tool in "${bash_tools[@]}"
do
    src="$tool.sh"
    dest="/usr/bin/$tool"
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
done

for tool in "${js_tools[@]}"
do
    src="$tool.js"
    dest="/usr/bin/$tool"
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
done
