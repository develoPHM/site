show databases; # 모든 데이터 베이스조회
use HM; # HM 데이터베이스 사용
show tables; # 해당 데이터베이스의 TABLE을 본다
explain people; # 테이블 구조를 보는 명령
##
select * from people; # 삽입한 테이블의 모든 데이터를 본다.
CREATE DATABASE HM;
CREATE TABLE HM.people (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name CHAR(10),
  number int
);

insert into HM.people (name, number) values ('현목', 1111);
insert into HM.people (name, number) values ('광후', 2222);