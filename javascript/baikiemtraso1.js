class hocSinh {
    constructor(maHS, hoTen, lopHoc, diemTB, hanhKiem) {
        this.maHS = maHS;     
        this.hoTen = hoTen;     
        this.lopHoc = lopHoc;   
        this.diemTB = diemTB;  
        this.hanhKiem = hanhKiem; 
    }
}

const quanLyTruongHoc = {
    daSach: [],          
    soLuongHocSinh: 0,    
    khoiTao(data = []) {
        this.daSach = [...data];
        this.soLuongHocSinh = data.length;
    },
    taoMaHS() {
        let nam = new Date().getFullYear();
        let stt = String(this.soLuongHocSinh + 1).padStart(3, "0"); 
        return `ma${nam}${stt}`;
    },
    themHocSinh(hs) {
        const maHS = this.taoMaHS();
        this.soLuongHocSinh++;
        const hsMoi = new hocSinh(
            maHS,
            hs.hoTen,
            hs.lopHoc,
            hs.diemTB,
            hs.hanhKiem
        );
        this.daSach.push(hsMoi);
        return maHS;
    },
    timHocSinh(maHS) {
        if (!maHS.startsWith("ma")) return null;
        return this.daSach.find(hs => hs.maHS === maHS) || null;
    },
    capNhapThongTin(maHS, duLieuMoi) {
        const hs = this.timHocSinh(maHS);
        if (!hs) return false;
        for (let key in duLieuMoi) {
            if (key !== "maHS" && hs.hasOwnProperty(key)) {
                hs[key] = duLieuMoi[key];
            }
        }
        return true;
    },
    xoaHS(maHS) {
        const index = this.daSach.findIndex(hs => hs.maHS === maHS);
        if (index === -1) return false;
        this.daSach.splice(index, 1);
        return true;
    },
    layDanhSachLop(tenLop) {
        return this.daSach.filter(hs => hs.lopHoc === tenLop);
    },
    thongKeHocLuc() {
        const kq = {
            Xuatsac: 0,
            Gioi: 0,
            Kha: 0,
            TrungBinh: 0,
            Kem: 0
        };
        this.daSach.forEach(hs => {
            if (hs.diemTB >= 9.0) kq.Xuatsac++;
            else if (hs.diemTB >= 8.0) kq.Gioi++;
            else if (hs.diemTB >= 6.5) kq.Kha++;
            else if (hs.diemTB >= 5.0) kq.TrungBinh++;
            else kq.Kem++;
        });
        return kq;
    },
    sapXepTheoDiem(kieuSapXep = "tang") {
        const danhSachCopy = [...this.daSach];
        danhSachCopy.sort((a, b) => {
            return kieuSapXep === "tang" ? a.diemTB - b.diemTB : b.diemTB - a.diemTB;
        });
        return danhSachCopy;
    }
};
//ví dụ sử dụng
// Khởi tạo dữ liệu ban đầu
const duLieuBanDau = [
    new hocSinh("ma2025001", "Trần Văn A", "12A1", 8.6, "Tốt"),
    new hocSinh("ma2025002", "Nguyễn Văn B", "12B1", 9.6, "Tốt"),
    new hocSinh("ma2025003", "Trần C", "12C1", 7.1, "Khá"),
    new hocSinh("ma2025004", "Lê Văn D", "12A2", 9.2, "Tốt")
];
quanLyTruongHoc.khoiTao(duLieuBanDau);

// Thêm học sinh mới
const maMoi = quanLyTruongHoc.themHocSinh({
    hoTen: "Lê Văn E",
    lopHoc: "12A1",
    diemTB: 6.5,
    hanhKiem: "Khá"
});
console.log("Mã mới: ", maMoi);

// Tìm học sinh
console.log("Tìm học sinh ma2025001:", quanLyTruongHoc.timHocSinh("ma2025001"));

// Cập nhật thông tin học sinh
quanLyTruongHoc.capNhapThongTin("ma2025001", { diemTB: 9.5 });
console.log("Sau cập nhật:", quanLyTruongHoc.timHocSinh("ma2025001"));

// Xóa học sinh
quanLyTruongHoc.xoaHS("ma2025003");
console.log("Danh sách sau khi xóa ma2025003:", quanLyTruongHoc.daSach);

// Lấy danh sách theo lớp
console.log("Danh sách lớp 12A1:", quanLyTruongHoc.layDanhSachLop("12A1"));

// Thống kê học lực
console.log("Thống kê học lực:", quanLyTruongHoc.thongKeHocLuc());

// Sắp xếp theo điểm giảm dần
console.log("Sắp xếp theo điểm giảm dần:", quanLyTruongHoc.sapXepTheoDiem("giam"));

// Sắp xếp theo điểm tăng dần
console.log("Sắp xếp theo điểm tăng dần:", quanLyTruongHoc.sapXepTheoDiem("tang"));