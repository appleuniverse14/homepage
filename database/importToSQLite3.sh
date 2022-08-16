# usage: ./importToSQLite3.sh (filename) | sqlite3 (databasename)

#!/bin/bash
FILENAME=$1
echo ".import ${FILENAME} contents"