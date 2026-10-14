-- BTCS303P-AS08 / Lab Sheet 7 — complete solutions (MySQL 8+)
USE college_db;

-- PART A: DDL
-- A1
CREATE TABLE faculty (
  faculty_id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  salary DECIMAL(10,2),
  dept_id INT,
  FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);
-- A2
ALTER TABLE faculty ADD COLUMN phone VARCHAR(15);
-- A3
ALTER TABLE faculty RENAME COLUMN phone TO contact_no;
-- A4
ALTER TABLE faculty DROP COLUMN contact_no;
-- A5
DROP TABLE faculty;
-- DROP removes table structure and data; TRUNCATE removes all rows but keeps structure;
-- DELETE removes rows and supports WHERE.

-- PART B: DML
-- B1
INSERT INTO students VALUES (109,'Neha',20,'Roorkee',1);
-- B2: city is omitted, so it becomes NULL (nullable column, no default).
INSERT INTO students (student_id,name,age,dept_id) VALUES (110,'Test Student',20,1);
SELECT student_id,name,city FROM students WHERE student_id=110;
-- B3
UPDATE students SET city='Roorkee' WHERE student_id=105;
-- B4
UPDATE enrollments SET marks=marks+5 WHERE course_id=203;
-- B5
DELETE FROM students WHERE student_id IN (109,110);
-- B6: intentionally invalid test; expected CHECK constraint failure.
-- INSERT INTO students VALUES (111,'Invalid Age',15,'Roorkee',1);

-- PART C: SELECT
-- C1
SELECT * FROM students;
-- C2
SELECT name,city FROM students;
-- C3
SELECT * FROM students WHERE city='Roorkee';
-- C4
SELECT * FROM students WHERE age BETWEEN 20 AND 22;
-- C5
SELECT * FROM students WHERE city IN ('Roorkee','Dehradun');
-- C6
SELECT * FROM students WHERE name LIKE 'A%';
-- C7
SELECT * FROM students WHERE dept_id IS NULL;
-- C8
SELECT DISTINCT city FROM students;
-- C9
SELECT * FROM students ORDER BY age DESC, name ASC;
-- C10
SELECT * FROM students ORDER BY age DESC LIMIT 3;
-- C11
SELECT name AS Student_Name, age AS Age FROM students;

-- PART D: FUNCTIONS AND AGGREGATION
-- D1
SELECT COUNT(*) AS total_students FROM students;
-- D2
SELECT AVG(marks) AS average_marks, MIN(marks) AS minimum_marks,
       MAX(marks) AS maximum_marks FROM enrollments;
-- D3
SELECT city, COUNT(*) AS student_count FROM students GROUP BY city;
-- D4
SELECT c.course_id,c.title,AVG(e.marks) AS average_marks
FROM courses c LEFT JOIN enrollments e ON e.course_id=c.course_id
GROUP BY c.course_id,c.title;
-- D5
SELECT city,COUNT(*) AS student_count FROM students
GROUP BY city HAVING COUNT(*)>1;
-- D6
SELECT d.dept_id,d.dept_name,COALESCE(SUM(c.credits),0) AS total_credits
FROM departments d LEFT JOIN courses c ON c.dept_id=d.dept_id
GROUP BY d.dept_id,d.dept_name;
-- D7
SELECT UPPER(name) AS uppercase_name,LENGTH(name) AS name_length FROM students;
-- D8: WHERE filters rows before grouping; HAVING filters groups after aggregation.

-- PART E: JOINS
-- E1
SELECT s.name,d.dept_name FROM students s
INNER JOIN departments d ON s.dept_id=d.dept_id;
-- E2: Vikram has no assigned department.
SELECT s.student_id,s.name,s.city,d.dept_name FROM students s
LEFT JOIN departments d ON s.dept_id=d.dept_id;
-- E3: preserves departments even when there are no students (Civil).
SELECT d.dept_id,d.dept_name,s.name AS student_name FROM departments d
LEFT JOIN students s ON s.dept_id=d.dept_id;
-- E4
SELECT s.name,c.title,e.marks FROM students s
JOIN enrollments e ON e.student_id=s.student_id
JOIN courses c ON c.course_id=e.course_id;
-- E5
SELECT DISTINCT s.name FROM students s
JOIN enrollments e ON e.student_id=s.student_id
JOIN courses c ON c.course_id=e.course_id
WHERE c.title='Data Structures';
-- E6: Vikram is not enrolled in any course in the initial data.
SELECT s.student_id,s.name FROM students s
LEFT JOIN enrollments e ON e.student_id=s.student_id
WHERE e.course_id IS NULL;
-- E7
SELECT c.course_id,c.title,COUNT(e.student_id) AS enrollment_count
FROM courses c LEFT JOIN enrollments e ON e.course_id=c.course_id
GROUP BY c.course_id,c.title;
-- E8
SELECT d.dept_id,d.dept_name,COUNT(s.student_id) AS student_count,AVG(s.age) AS average_age
FROM departments d LEFT JOIN students s ON s.dept_id=d.dept_id
GROUP BY d.dept_id,d.dept_name;

-- PART F: SUBQUERIES
-- F1
SELECT * FROM students WHERE age>(SELECT AVG(age) FROM students);
-- F2
SELECT s.name,c.title,e.marks FROM enrollments e
JOIN students s ON s.student_id=e.student_id
JOIN courses c ON c.course_id=e.course_id
WHERE e.marks=(SELECT MAX(marks) FROM enrollments);
-- F3
SELECT * FROM courses c WHERE EXISTS
(SELECT 1 FROM enrollments e WHERE e.course_id=c.course_id);
-- F4
SELECT s.student_id,s.name,COUNT(*) AS course_count
FROM students s JOIN enrollments e ON e.student_id=s.student_id
GROUP BY s.student_id,s.name HAVING COUNT(*)>2;
-- F5: returns department(s) tied for the most students.
SELECT d.dept_id,d.dept_name,COUNT(s.student_id) AS student_count
FROM departments d JOIN students s ON s.dept_id=d.dept_id
GROUP BY d.dept_id,d.dept_name
HAVING COUNT(s.student_id)=(
  SELECT MAX(dept_count) FROM (
    SELECT COUNT(*) AS dept_count FROM students
    WHERE dept_id IS NOT NULL GROUP BY dept_id
  ) AS counts_by_dept
);
-- F6
SELECT c.title,s.name,e.marks FROM enrollments e
JOIN students s ON s.student_id=e.student_id
JOIN courses c ON c.course_id=e.course_id
WHERE e.marks>(SELECT AVG(e2.marks) FROM enrollments e2 WHERE e2.course_id=e.course_id);

-- PART G: INDEXES, VIEWS, TRANSACTIONS
-- G1
CREATE INDEX idx_students_city ON students(city);
EXPLAIN SELECT * FROM students WHERE city='Roorkee';
-- On a tiny table, the optimizer may still choose a table scan.
-- G2
CREATE VIEW student_marks AS
SELECT s.name AS student_name,c.title AS course_title,e.marks
FROM students s JOIN enrollments e ON e.student_id=s.student_id
JOIN courses c ON c.course_id=e.course_id;
-- G3
SELECT * FROM student_marks WHERE marks>80;
-- G4 (MySQL syntax)
DROP VIEW student_marks;
DROP INDEX idx_students_city ON students;
-- G5: run in one session. After ROLLBACK, the mark should remain 88.
START TRANSACTION;
UPDATE enrollments SET marks=100 WHERE student_id=101 AND course_id=201;
ROLLBACK;
SELECT marks FROM enrollments WHERE student_id=101 AND course_id=201;
-- G6: run separately; COMMIT makes 100 permanent.
START TRANSACTION;
UPDATE enrollments SET marks=100 WHERE student_id=101 AND course_id=201;
COMMIT;
SELECT marks FROM enrollments WHERE student_id=101 AND course_id=201;

-- PART H: OPTIONAL CHALLENGES
-- H1
SELECT s.student_id,s.name,COALESCE(SUM(e.marks),0) AS total_marks,
       RANK() OVER (ORDER BY COALESCE(SUM(e.marks),0) DESC) AS marks_rank
FROM students s LEFT JOIN enrollments e ON e.student_id=s.student_id
GROUP BY s.student_id,s.name;
-- H2
SELECT s.name,c.title,e.marks,
       CASE WHEN e.marks>=90 THEN 'A'
            WHEN e.marks>=75 THEN 'B'
            WHEN e.marks>=60 THEN 'C'
            ELSE 'D' END AS grade
FROM enrollments e JOIN students s ON s.student_id=e.student_id
JOIN courses c ON c.course_id=e.course_id;
-- H3
SELECT s1.name AS student_1,s2.name AS student_2,s1.city
FROM students s1 JOIN students s2
ON s1.city=s2.city AND s1.student_id<s2.student_id;
-- H4: second-highest DISTINCT mark without LIMIT.
SELECT MAX(marks) AS second_highest_marks FROM enrollments
WHERE marks<(SELECT MAX(marks) FROM enrollments);
