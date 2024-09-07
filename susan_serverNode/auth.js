const jwt = require("node-jsonwebtoken");
const fs = require("fs");
const PRIVATE_KEY = fs.readFileSync("private-key.txt");
const maxAge = 3 * 60 * 60;
const roleAdmin = 1;
exports.adminAuth = (req, res, next) => { //const token = req.cookies.jwt
    let token = req.headers.authorization; //Bearer 52A2b39agsdg2342
    if (!token) {
        return res.status(401).json({ thongbao: "Không có token! Không phận sự miễn vào :)" })
    }
    token = token.split(' ')[1]; //52A2b39agsdg2342
  
    jwt.verify(token, PRIVATE_KEY, (err, datadDecoded) => {
        if (err) return res.status(401).json({ thongbao: "Lỗi test token: " + err })
        if (datadDecoded.role !== 1) {
            return res.status(401).json({ thongbao: "Bạn không đủ quyền để vào" })
        } else next(); //cho phép pass test 
    })
}