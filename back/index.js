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
// 회원가입 api
app.post('/api/signup', (req, res) => {
    const { id, pw, name, date } = req.body;

    // 쿼리 생성
    const query = 'INSERT INTO users (id, pw, name, date) VALUES (?, ?, ?, ?)';

    // 데이터베이스에 데이터 삽입
    db.execute(query, [id, pw, name, date], (err, result) => {
        if (err) {
            console.error('회원가입 오류:', err);
            return res.status(500).json({ error: '회원가입 중 오류가 발생했습니다.' });
        }
        res.status(201).json({ message: '회원가입 성공', userId: id });
    });
});
// 로그인 api
app.post('/api/signin', (req, res) => {
    const { id, pw } = req.body;
    const query = 'SELECT * FROM HM.users WHERE id = ? AND pw = ?';
    db.query(query, [id, pw], (err, result) => {
        if (err) {
            console.log('여기서에러?')
            return res.status(500).json({ message: '아이디나 비밀번호가 잘못됨' });
        }
        console.log(result);
        if (result.length > 0) {
            const user = result[0];
            res.status(200).json({
                message: '로그인 성공',
                user: {
                    id: user.id,
                    name: user.name,
                },
            })
        }
        else {
            res.status(401).json({
                message: '아이디나 비밀번호가 틀림'
            })
        }
    })
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
// 데이터 수정
app.put('/api/update', (req, res) => {
    const { id, name, number } = req.body;
    if (!id || !name || !number) {
        return res.status(400).json({ message: '작성 다 해라'});
    }
    // 데이터 조회 및 업데이트
    const selectQuery = 'SELECT * FROM people WHERE id = ?';
    const updateQuery = `UPDATE people SET name = ?, number = ? WHERE id = ?`;

    // 데이터 조회
    db.query(selectQuery, [id], (err, result) => {
        if (err) {
            console.error('데이터 조회 오류: ', err);
            return res.status(500).json({ message: '데이터베이스 조회 오류가 발생함.' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: '해당 사용자를 찾을 수 없다.' });
        }
        // 데이터 업데이트
        db.query(updateQuery, [name, number, id], (err, updateResult) => {
            if (err) {
                console.error('업데이트 오류: ', err);
                return res.status(500).json({ message: '데이터 업데이트 중 오류 발생' });
            }
            res.json({
                message: '사용자 정보가 성공적으로 업데이트 되었다.',
                updateData: { id, name, number }
            });
        });
    });
});
// 기본 루트
app.get('/',(req, res)=>{
    res.send("이곳은 백이다");
})

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});