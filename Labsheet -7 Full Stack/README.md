# BTCS303P-AS08 — SQL Lab Sheet 7 Complete Solution

## Files
- `sql/01_setup.sql`: creates the database, four tables, and sample data from the lab sheet.
- `sql/02_exercises_solutions.sql`: SQL answers for Parts A–H, including optional challenges.
- `docs/Answers_and_Notes.md`: explanations and expected observations.
- `README.md`: setup and run instructions.

## Run with MySQL Workbench
1. Open MySQL Workbench and connect to your server.
2. Open and execute `sql/01_setup.sql`.
3. Run `USE college_db; SELECT * FROM students;` and confirm 8 rows.
4. Open `sql/02_exercises_solutions.sql` and execute one section at a time.

The scripts target **MySQL 8.0+**. Some statements intentionally modify data or create/drop objects. Rerun `01_setup.sql` to restore the original lab dataset.

## Important testing notes
- B6 is commented because it intentionally violates the age CHECK constraint. Uncomment it to observe the error.
- Run G5 and G6 separately to compare rollback and commit.
- MySQL uses `DROP INDEX idx_students_city ON students`; PostgreSQL uses `DROP INDEX idx_students_city`.
- In PostgreSQL, create/connect to `college_db` separately and omit the MySQL `CREATE DATABASE`/`USE` lines.
