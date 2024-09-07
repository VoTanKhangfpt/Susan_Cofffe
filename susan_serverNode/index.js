const exp = require("express");
const app = exp();
const port = 3000;
var cors = require('cors')
const jwt = require("node-jsonwebtoken");
const fs = require("fs");
const PRIVATE_KEY = fs.readFileSync("private-key.txt");
const maxAge = 3 * 60 * 60; //3 giờ - thời gian sống của token
const { adminAuth } = require("./auth.js");
const corsOpt = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOpt));
app.use(exp.json());


const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/susan_2024');

app.get("/", (req, res) => { res.json("{'thongbao':'API NodeJS'}") });

//other path
app.get('/san_pham/:id', async function (req, res, next) {
    let id = req.params.id;
    if (isNaN(id) == true) return res.json({ 'thongbao': 'Sản phẩm không tồn tại' });
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    let sp = await SpModel.findOne({ id: id });
    if (sp == null) res.json({ 'thongbao': 'Sản phẩm không có' })
    else res.json(sp);
});
app.get('/san_pham_moi/', async (req, res) => {
    let limit = Number(req.query.limit == undefined ? 6 : req.query.limit);
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    listsp = await SpModel.find({ an_hien: true })
        .sort({ 'updated_at': -1 })
        .limit(limit)
        .exec();
    res.json(listsp);
});
app.get('/san_pham_quan_tam', async function (req, res) {
    let limit = Number(req.query.limit == undefined ? 6 : req.query.limit);
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    listsp = await SpModel.find({ an_hien: 1 })
        .sort({ 'luot_xem': -1 })
        .limit(limit)
        .exec();
    res.json(listsp);
});
app.get('/san_pham_trong_loai/:id_loai', async function (req, res) {
    let id_loai = req.params.id_loai;
    if (isNaN(id_loai)) return res.json({ 'thongbao': `Không có sp trong loại ${id_loai}` });
    let page = Number(req.query.page == undefined ? 1 : req.query.page);
    let limit = 8;
    let startRow = (page - 1) * limit;
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    listsp = await SpModel.find({ an_hien: 1, id_loai: id_loai })
        .sort({ 'updated_at': -1 })
        .skip(startRow)
        .limit(limit)
        .exec();
    res.json(listsp);
});
app.get('/san_pham_trong_loai/:id_loai/dem', async function (req, res) {
    let id_loai = req.params.id_loai;
    if (isNaN(id_loai)) return res.json({ 'total': 0 });
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    const dem = await SpModel.countDocuments({ an_hien: 1, id_loai: id_loai });
    res.json({ total: dem });
});
app.get('/san_pham_moi_trong_loai/:id_loai', async function (req, res) {
    let id_loai = req.params.id_loai;
    if (isNaN(id_loai)) return res.json([]);
    let limit = req.query.limit || 6;
    if (isNaN(limit)) return res.json([]);

    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    listsp = await SpModel.find({ an_hien: 1, id_loai: id_loai })
        .sort({ 'updated_at': -1 })
        .limit(limit)
        .exec();
    res.json(listsp);
});

app.get('/loai', async function (req, res) {
    const LoaiSchema = require('./model/schemaLoai.js');
    const LoaiModel = await conn.model('loai', LoaiSchema);
    listloai = await LoaiModel.find({ an_hien: 1 })
        .sort({ 'thu_tu': 1 })
        .exec();
    res.json(listloai);
});
app.get('/loai/:id', async function (req, res) {
    let id = req.params.id;
    if (isNaN(id) == true) return res.json({ 'thongbao': 'Loại không tồn tại' });
    const LoaiSchema = require('./model/schemaLoai.js');
    const LoaiModel = await conn.model('loai', LoaiSchema);
    let loai = await LoaiModel.findOne({ id: id });
    res.json(loai);
});
app.get('/san_pham_lien_quan/:id/:limit', async function (req, res) {
    let id = Number(req.params.id);  //NaN nếu id là chữ
    let limit = Number(req.params.limit);  //NaN nếu limit là chữ
    console.log(limit, isNaN(limit))
    if (isNaN(id) === true || id <= 0) return res.json({ 'thongbao': 'Sản phẩm không tồn tại' });
    if (isNaN(limit) === true || limit <= 1) limit = 1;
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    let sp = await SpModel.findOne({ id: id });
    if (sp === null) res.json({ 'thongbao': 'Sản phẩm không có' })
    let id_loai = sp.id_loai;
    listsp = await SpModel.find({ an_hien: 1, id_loai: id_loai, id: { "$ne": id } })
        .sort({ 'updated_at': -1 }).limit(limit).exec();
    res.json(listsp);
});

app.get('/tim_kiem', async function (req, res) {
    let tukhoa = req.query.tukhoa == undefined ? 'xxxyyyzzz' : req.query.tukhoa;
    let limit = Number(req.query.limit == undefined ? 6 : req.query.limit);
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    listsp = await SpModel.find({ an_hien: 1, ten_sp: { $regex: tukhoa, $options: 'i' } })
        .sort({ 'updated_at': -1 })
        .limit(limit)
        .exec();
    res.json(listsp);
});

app.post('/luu_binh_luan', async function (req, res) {
    let bl = {
        ho_ten: req.body.ho_ten,
        noi_dung: req.body.noi_dung,
        id_user: Number(req.body.id_user),
        id_sp: Number(req.body.id_sp),
        an_hien: true,
    };
    if (bl.ho_ten == undefined) return res.status(401).json({ "thongbao": "Họ tên chưa có" });
    if (bl.noi_dung == undefined) return res.status(401).json({ "thongbao": "Nội dung chưa có" });
    if (isNaN(bl.id_sp) == true) return res.status(401).json({ "thongbao": "id_sp không có" });
    if (isNaN(bl.id_user) == true) return res.status(401).json({ "thongbao": "id_user không có" });

    const BinhLuanSchema = require('./model/schemaBinhLuan.js');
    const BinhLuanModel = await conn.model('binh_luan', BinhLuanSchema);
    const doc = await BinhLuanModel.find({}).select("id")
        .sort({ "id": -1 }).limit(1).exec();
    let id_bl = doc[0].id + 1;
    bl.id = id_bl;
    await BinhLuanModel.create(bl);
    return res.json({ "thongbao": "Đã lưu bình luận. Cảm ơn bạn" });
});

app.get('/lay_binh_luan/:id_sp/', async function (req, res) {
    let id_sp = req.params.id_sp;
    if (isNaN(id_sp)) return res.json([]);
    let limit = req.query.limit || 100;
    if (isNaN(limit) == true) return res.json([]);
    const BLSchema = require('./model/schemaBinhLuan.js');
    const BLModel = await conn.model('binh_luan', BLSchema);
    listBL = await BLModel.find({ an_hien: true, id_sp: id_sp })
        .sort({ 'updated_at': -1 }).limit(limit).exec();
    res.json(listBL);
});
app.post('/luu_don_hang/', async (req, res) => {
    let dh = {
        id_user: Number(req.body.id_user),
        ten_nguoi_nhan: req.body.ten_nguoi_nhan,
        dia_chi: req.body.dia_chi,
        email: req.body.email,
        dien_thoai: req.body.dien_thoai,
        trang_thai: 0,
        thoi_diem_mua: new Date()
    };
    if (isNaN(dh.id_user))
        return res.status(401).json({ "thongbao": "id_user chưa có", "id": "-1" });
    if (dh.ten_nguoi_nhan == undefined || dh.ten_nguoi_nhan == "")
        return res.status(401).json({ "thongbao": "ten_nguoi_nhan chưa có", "id": "-1" });
    if (dh.dia_chi == undefined || dh.dia_chi == "")
        return res.status(401).json({ "thongbao": "dia_chi chưa có", "id": "-1" });
    if (dh.email == undefined || dh.email == "")
        return res.status(401).json({ "thongbao": "email chưa có", "id": "-1" });
    if (dh.dien_thoai == undefined || dh.dien_thoai == "")
        return res.status(401).json({ "thongbao": "dien_thoai chưa có", "id": "-1" });

    const DHSchema = require('./model/schemaDonHang.js');
    const DHModel = await conn.model('don_hang', DHSchema);
    const doc = await DHModel.find({}).select("id").sort({ "id": -1 }).limit(1).exec();
    let id_dh = doc[0].id + 1;
    dh.id = id_dh;
    await DHModel.create(dh);
    return res.status(200).json({ 'thongbao': 'Đã chèn đơn hàng', 'id': dh.id });
});
app.post('/luu_1sp_trong_gio_hang/', async (req, res) => {
    let dhct = {
        id_dh: Number(req.body.id_dh),
        id_sp: Number(req.body.id_sp),
        ten_sp: req.body.ten_sp,
        gia_mua: Number(req.body.gia_mua),
        so_luong: req.body.so_luong,
        sku: req.body.sku
    };
    if (isNaN(dhct.id_dh)) return res.status(401).json({ "thongbao": "id_dh chưa có" });
    if (isNaN(dhct.id_sp)) return res.status(401).json({ "thongbao": "id_sp chưa có" });
    if (dhct.ten_sp == undefined || dhct.ten_sp == "")
        return res.status(401).json({ "thongbao": "ten_sp chưa có" });
    if (isNaN(dhct.gia_mua) || dhct.gia_mua <= 0)
        return res.status(401).json({ "thongbao": "giá mua chưa có" });
    if (isNaN(dhct.so_luong) || dhct.so_luong <= 0)
        return res.status(401).json({ "thongbao": "số lượng chưa có" });
    if (dhct.sku == undefined) return res.status(401).json({ "thongbao": "sku chưa có" });

    const DHCTSchema = require('./model/schemaDonHangChiTiet.js');
    const DHCTModel = await conn.model('don_hang_chi_tiet', DHCTSchema);
    const doc = await DHCTModel.find({}).select("id").sort({ "id": -1 }).limit(1).exec();
    let id_dhct = doc[0].id + 1;
    dhct.id = id_dhct;
    console.log("dhct=", dhct);
    await DHCTModel.create(dhct);
    return res.status(200).json({ 'thongbao': 'Đã chèn 1 sp vào đơn hàng', 'id': dhct.id });
});

//Phần quản trị
app.post('/admin/sp', adminAuth, async function (req, res) {
    let sp = {
        ten_sp: req.body.ten_sp,
        id_loai: req.body.id_loai,
        gia: req.body.gia || 0,
        hinh: req.body.hinh || "",
        sku: req.body.sku || "",
        an_hien: req.body.an_hien || true,
        luot_xem: req.body.luot_xem || 0,
        tags: req.body.tags || "",
    };
    if (sp.ten_sp == undefined) return res.json({ "thongbao": "ten_sp chưa có" });
    if (sp.id_loai == undefined) return res.json({ "thongbao": "id_loai chưa có" });
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    const doc = await SpModel.find({}).select("id").sort({ "id": -1 }).limit(1).exec();
    let id_sp = doc[0].id + 1;
    sp.id = id_sp;
    console.log("sp=", sp);
    await SpModel.create(sp);
    return res.json({ "thongbao": "Đã chèn 1 sp", "id": sp.id });
});
app.get('/admin/sp', adminAuth, async function (req, res) {
    let page = Number(req.query.page == undefined ? 1 : req.query.page);
    let limit = Number(req.query.limit == undefined ? 3 : req.query.limit);
    let id_loai = Number(req.query.id_loai == undefined ? -1 : req.query.id_loai);

    let startRow = (page - 1) * limit;
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);

    if (id_loai <= 0)
        listsp = await SpModel.find({}).sort({ 'id': -1 }).skip(startRow).limit(limit).exec();
    else
        listsp = await SpModel.find({ id_loai: id_loai }).sort({ 'id': -1 }).skip(startRow).limit(limit).exec();

    res.json(listsp);
});
app.get('/admin/sp/dem', adminAuth, async function (req, res) {
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    let id_loai = Number(req.query.id_loai == undefined ? -1 : req.query.id_loai);
    //const dem  = await SpModel.countDocuments({});
    let dem = 0;
    if (id_loai <= 0) dem = await SpModel.countDocuments({});
    else dem = await SpModel.countDocuments({ id_loai: id_loai });

    res.json({ total: dem });
});
app.get('/admin/sp/laycacloai', adminAuth, async function (req, res) {
    const LoaiSchema = require('./model/schemaLoai.js');
    const LoaiModel = await conn.model('loai', LoaiSchema);
    listloai = await LoaiModel.find({}).select({ "id": 1, "ten_loai": 1, "_id": 0 })
        .sort({ 'thu_tu': 1 })
        .exec();
    res.json(listloai);
});
app.delete('/admin/sp/:id', adminAuth, async function (req, res, next) {
    let id = req.params.id;
    if (isNaN(id) == true) return res.json({ 'thongbao': 'Sản phẩm không tồn tại' });
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    await SpModel.deleteOne({ id: id });
    res.json({ 'thongbao': 'Đã xóa sản phẩm' });
});
app.put('/admin/sp/:id', adminAuth, async function (req, res, next) {
    let id = req.params.id;
    if (isNaN(id) === true) return res.json({ 'thongbao': 'Sản phẩm không tồn tại' });
    if (req.body.ten_sp === undefined) res.json({ 'thongbao': 'Tên sản phẩm không có' });
    if (req.body.id_loai === undefined) res.json({ 'thongbao': 'id_loai không có' });
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    let sp = {
        id: id,
        ten_sp: req.body.ten_sp,
        id_loai: req.body.id_loai,
        gia: req.body.gia,
        sku: req.body.sku,
        hinh: req.body.hinh,
        an_hien: req.body.an_hien,
        luot_xem: req.body.luot_xem,
        tags: req.body.tags,
        updated_at: Date.now()
    }
    await SpModel.updateOne({ id: id }, sp);
    res.json({ 'thongbao': 'Đã cập nhật sản phẩm' });
});
app.get('/admin/sp/:id', adminAuth, async function (req, res, next) {
    let id = req.params.id;
    if (isNaN(id) == true) return res.json({ 'thongbao': 'Sản phẩm không tồn tại' });
    const SpSchema = require('./model/schemaSP.js');
    const SpModel = await conn.model('san_pham', SpSchema);
    let sp = await SpModel.findOne({ id: id });
    if (sp == null) res.json({ 'thongbao': 'Sản phẩm không có' })
    else res.json(sp);
});


//Authencation
app.post("/login", async function (req, res) {
    const email = req.body.email;
    const pass = req.body.pass;
    const kq = await checkUserPass(email, pass);
    console.log("kq=", kq);
    if (kq == true) {
        const user = await getUserInfo(email);
        let payload = { id: user.id, ho_ten: user.ho_ten, email: user.email, role: user.role }
        const token = jwt.sign(payload, PRIVATE_KEY, { expiresIn: maxAge });
        //res.cookie("jwt", token, { httpOnly: true,  maxAge: maxAge * 1000});// 3 giờ (ms)
        res.setHeader('Authorization', 'Bearer ' + token); //gửi thêm token trong header
        res.status(200).json({ token: token, expiresIn: maxAge, user: user }) // dùng chính
    }
    else res.status(401).json({ thongbao: "Đăng nhập thất bại" });
}) // app.post

const checkUserPass = async (email, pass) => {
    const UserSchema = require('./model/schemaUser.js');
    const UserModel = await conn.model('users', UserSchema);
    let user = await UserModel.findOne({ email: email });
    if (user === null) return false;// Email chưa là thành viên    
    var bcrypt = require('bcryptjs');
    var salt = bcrypt.genSaltSync(10);
    var pass_db = user.password;
    let ketqua = bcrypt.compareSync(pass, pass_db); // false
    console.log("ketqua=", ketqua);
    return ketqua;
}
const getUserInfo = async (email) => {
    const UserSchema = require('./model/schemaUser.js');
    const UserModel = await conn.model('users', UserSchema);
    let user = await UserModel.findOne({ email: email })
        .select({ "id": 1, "ho_ten": 1, "_id": 0, "email": 1, "role": 1 });
    return user;
}


//Amin - loại
app.post('/admin/loai',adminAuth, async function (req, res) {
    let loai = {
        ten_loai: req.body.ten_loai,
        thu_tu: req.body.thu_tu || 0,
        an_hien: req.body.an_hien || true,
    };
    if (loai.ten_loai == undefined) return res.json({ "thongbao": "ten_loai chưa có" });
    const LoaiSchema = require('./model/schemaLoai.js');
    const LoaiModel = await conn.model('loai', LoaiSchema);
    const doc = await LoaiModel.find({}).select("id")
        .sort({ "id": -1 }).limit(1).exec();
    let id_loai = doc[0].id + 1;
    loai.id = id_loai;
    console.log("loai=", loai);
    await LoaiModel.create(loai);
    return res.json({ "thongbao": "Đã chèn 1 loai id: " + loai.id });
});




app.listen(port, () => console.log(`Ung dung dang chay voi port ${port}`));
