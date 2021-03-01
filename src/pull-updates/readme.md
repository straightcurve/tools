### Description
    Tool for pulling updates for multiple projects

### Options
```bash
Usage: 
    pull-updates [...options]
Options:
    -p  [ path ]                        the relative path to the json file with projects list.
                                        omitting this option causes the script to only pull updates
                                        for the cwd
    -b  [ branch = default(develop) ]   branch name
    --install                           run npm install after pulling updates
```
