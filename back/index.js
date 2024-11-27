const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 3000; // API 서버 포트
app.use(cors());
app.use(express.json()); // JSON 파싱 미들웨어 추가
// mysql 연결 설정
const db = mysql.createConnection({
    host: '127.0.0.1', // MySQL 서버 주소
    user: 'root',           // MySQL 사용자 이름
    password: '1q2w3e4r',   // MySQL 비밀번호
    database: 'HM'        // MySQL 데이터 베이스 이름
})

// MySQL 연결 확인
db.connect((err) => {
    if (err) {
        console.log('연결 오류났어', err);
        return;
    }
    console.log('MySQL 연결 성공적!')
})

// 테이블 데이터 조회하는 api
app.get('/api/find', (req, res) => {
    const sql = 'SELECT * FROM people';
    db.query(sql, (err, result) => {
        if (err) {
            console.log('쿼리 실행 오류', err);
            res.status(500).json({error: '데이터 조회 실패'});
            return
        }
        res.json(result)
        console.log("콘솔:",result)
    })
})
// 데이터 저장
app.post('/api/save', (req, res) => {
    const { name, number } = req.body;

    if ( !name || !number) {
        return res.status(400).send({ message: '모든 정보를 입력해주세요.' });
    }

    const sql = 'INSERT INTO people (name, number) VALUES (?, ?)';
    db.query(sql, [name, number], (err, results) => {
        if (err) {
            console.error('데이터 저장 실패:', err);
            return res.status(500).send({ message: '데이터 저장 중 오류가 발생했습니다.' });
        }
        res.send({ message: '데이터가 성공적으로 저장되었습니다.', results });
    });
});
// 데이터 삭제
app.delete('/api/delete/:id', (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    if (!id) {
        return res.status(400).send({ message: 'ID가 필요합니다.' });
    }

    const sql = 'DELETE FROM people WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('데이터 삭제 실패:', err);
            return res.status(500).send({ message: '데이터 삭제 중 오류가 발생했습니다.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).send({ message: '해당 ID의 데이터가 존재하지 않습니다.' });
        }

        res.send({ message: '데이터가 성공적으로 삭제되었습니다.' });
    });
});
// 기본 루트
app.get('/',(req, res)=>{
    res.send("이곳은 백이다");
})

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});