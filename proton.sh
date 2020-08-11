if [ -z "$1" ]
then
    echo "Please pass the game executable as the first argument, k thx."
    exit
fi

/home/tony/.steam/steam/steamapps/common/Proton 5.0/proton run $1