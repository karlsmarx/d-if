# Core

In this folder all core code is organized in separated folder for each domain. Besides that, the controller and cli module are the files responsible to get the command line entry and select the right way to do the tasks.

## CLI commands

The cli accept a list of commands to operate in the desired way. To get a list of all available commands and the description of usage paste the following line in shell:
```shell
d-if --help
```

### Commands list:

##### --actual (alias: -a, required)

Define the actual address to request. Could be a a live server url or a previous snapshot (TODO) from database.

##### --previous (alias: -p, default: snapshot)

Define the previous file to compare. Same function as actual, but his default value is the last snapshot in the database. Could be used to compare two verions of same live API.

##### --snapshot (alias: -s)

Take a snapshot from the result of actual procession and save in the defined database.

##### --database (alias: -d, default: db.json)

Define the database to be used as storage, if needed. The default beahavior is use [lowdb]() to store in the local folder a file called db.json.

Could be a lowdb file, a mongo or mysql url connection.

##### --endpoints (alias: -e, required)

Define the file that contains the endpoint list to connect, with the format as defined in home.

##### --ignore-values (alias: -i, default: true)

Define if will ignore the value of fields returned by actual and previous results. Will ignore values only for arrays, strings and numbers. If the structure has nested objects, the both must contain the same fields in all.
