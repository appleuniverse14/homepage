# contents of datebase
- id integer
- title text
- url text
- description text
- tag text
- content text
- created_at text(be updated automatically)
- updated_at text(be updated automatically)
# usage of "create_table.sh"
- execute ./create_table.sh | sqlite3 (databasename)
# usage of "importSQLite3.sh"
1. make textfile which contains databese contents
    - (example): import_test.txt
2. execute ./importSQLite3.sh (filename) | sqlite3 (databasename)
# usage of "updateSQLite3.sh"
1. make textfile which contains update contents
    - (example): update_test.txt
2. execute ./updateSQLite3.sh (filename) | sqlite3 (databasename)
# commands
- create table
    - CREATE TABLE contents(id integer, title text, url text, description text, tag text, content text, created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')), updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')));
    - CREATE TRIGGER trigger_contents_updated_at AFTER UPDATE ON contents
    - BEGIN
        - UPDATE contents SET updated_at = DATETIME('now', 'localtime') WHERE rowid == NEW.rowid;
    - END;
- insert content
    - INSERT INTO contents(id, title, url, description, tag, content) VALUES(1, 'title', 'url', 'description', 'tag', 'content');
- update content
    - (example): update 'content' column of id1 record
        - UPDATE contents set content = 'hoge' where id = 1;