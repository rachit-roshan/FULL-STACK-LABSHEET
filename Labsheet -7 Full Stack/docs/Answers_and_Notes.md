# BTCS303P-AS08 — Lab Sheet 7: Answers and Notes

## Part A — DDL
A1 creates `faculty` with primary key `faculty_id`, required name, unique email, salary, and a department foreign key. A2 adds `phone`; A3 renames it to `contact_no`; A4 drops it; A5 drops the table.
- **DROP:** removes table definition and data.
- **TRUNCATE:** removes all rows but keeps the table structure.
- **DELETE:** removes rows, optionally selected with `WHERE`.

## Part B — DML
- B1 inserts Neha (student 109).
- B2 omitting `city` stores `NULL` because the column is nullable and has no default.
- B3 changes student 105's city to Roorkee.
- B4 adds 5 to marks for course 203.
- B5 deletes test students 109 and 110. If you added enrollments for them, delete those first because of the foreign key.
- B6 age 15 violates `CHECK (age >= 17)`. The exact error wording depends on DBMS/version.

## Part C — SELECT
C1 `SELECT *`; C2 select `name, city`; C3 filter city Roorkee; C4 use `BETWEEN 20 AND 22`; C5 use `IN ('Roorkee','Dehradun')`; C6 use `LIKE 'A%'`; C7 use `IS NULL`; C8 use `DISTINCT`; C9 sort age descending then name ascending; C10 order by age descending with `LIMIT 3`; C11 use aliases for name and age.

## Part D — Aggregation
D1 `COUNT(*)`; D2 `AVG`, `MIN`, `MAX` on marks; D3 group students by city; D4 average marks per course; D5 `HAVING COUNT(*) > 1`; D6 sum course credits per department; D7 use `UPPER` and `LENGTH`.
**D8:** `WHERE` filters individual rows before grouping; `HAVING` filters groups after aggregate calculations.

## Part E — Joins
E1 inner join students/departments. E2 left join preserves all students; Vikram has no department and shows NULL department details. E3 left join departments to students preserves Civil even without students. E4 joins students, enrollments, courses. E5 filters title `Data Structures`. E6 finds students without enrollment; initially, Vikram is the only one. E7 counts enrollments per course while retaining courses with zero enrollments. E8 counts students and averages age by department.

## Part F — Subqueries
F1 compares ages to average age. F2 finds enrollment(s) with the maximum marks. F3 uses `EXISTS` to find courses with enrollments. F4 uses `HAVING COUNT(*) > 2`. F5 returns department(s) with the highest student count. F6 compares each student's mark to that course's average using a correlated subquery.

## Part G — Indexes, views, transactions
G1 creates a city index and runs `EXPLAIN`; the optimizer may still use a table scan for a tiny dataset. G2 creates `student_marks`; G3 selects marks above 80; G4 drops view/index. G5 `ROLLBACK` restores the original mark 88. G6 `COMMIT` permanently changes it to 100.

## Part H — Optional challenges
H1 ranks students by total marks using `RANK()`. H2 uses `CASE` to assign A/B/C/D. H3 self-joins students in the same city, avoiding duplicate pairs with `student_id` ordering. H4 returns the second-highest distinct mark without `LIMIT`.

## Compatibility
The SQL scripts target **MySQL 8.0+**. For PostgreSQL, connect to `college_db` separately and change the index drop command to `DROP INDEX idx_students_city;`. The lab sheet's `USE college_db` is MySQL syntax; in `psql`, use `\c college_db`.
