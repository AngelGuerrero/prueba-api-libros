DROP TABLE 'users';
CREATE TABLE 'users' (
  'id' INTEGER PRIMARY KEY,
  'username' VARCHAR(50),
  'password' VARCHAR(255),

  'createdAt' DATETIME,
  'updatedAt' DATETIME NULL
);

DROP TABLE 'books';
CREATE TABLE 'books' (
  'id' INTEGER PRIMARY KEY,
  'title' TEXT,
  'year' INTEGER,
  'author' VARCHAR(255),

  'createdAt' DATETIME,
  'updatedAt' DATETIME NULL
);

INSERT INTO 'users' VALUES ('1', 'master', 'master', date('now'), NULL);