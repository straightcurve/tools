if [ -z "$work_dir" ]; then
	echo "Please define the work directory (\$work_dir) environment variable"
	exit 1
fi

if [ ! -d "$work_dir" ]; then
	echo "The specified work directory doesn't exist, stat $work_dir"
	exit 2
fi

. "$NVM_DIR/nvm.sh"

cd $work_dir && nvm use 8

case "$1" in
"u")
	pull_updates "$2"
        code work.code-workspace
	;;
"update")
	pull_updates "$2"
	code work.code-workspace
	;;
*)
	code work.code-workspace
	;;
esac

tilix --session "${work_dir}/work.json"
