# Trang link bio – @muromduky

Trang link bio một file, không cần build, chạy ngay trên GitHub Pages.

```
link-bio/
├── index.html           ← trang chính (sửa link trong phần CONFIG)
├── guide.html           ← trang cẩm nang (nội dung + CONFIG ở cuối file)
├── apps-script/Code.gs  ← code lưu email và tiến độ vào Google Sheet
├── assets/cover.jpg     ← ảnh đầu trang
├── assets/og.jpg        ← ảnh hiện khi chia sẻ link (1200×630)
├── assets/guide/        ← ảnh kết quả và ảnh chụp hướng dẫn
└── README.md
```

## 1. Điền link của bạn

Mở `index.html`, tìm khối `const CONFIG = {` và thay các link có chữ `THAY_...`:

| Nút | Thay bằng |
| --- | --- |
| Cẩm nang làm video AI | Đã trỏ sẵn tới `guide.html` (xem mục 2) |
| Nhóm Zalo | Link mời nhóm Zalo (`https://zalo.me/g/...`) |
| Nhận làm video AI | Link Zalo cá nhân (`https://zalo.me/<số điện thoại>`) |
| Công cụ của Lâm | Đang để `""` nên nút bị ẩn. Điền link khi công cụ sẵn sàng. |

Nút nào để `url: ""` thì tự ẩn. Muốn thêm nút, copy một dòng `{ icon: ..., title: ..., sub: ..., url: ..., id: ... }`.

Link không phải Zalo hoặc TikTok sẽ tự được gắn `utm_source=tiktok&utm_medium=bio&utm_content=<id>`, để bạn biết người xem đến từ nút nào.

## 2. Trang cẩm nang (`guide.html`)

- Người xem đọc Phần 1 miễn phí. Từ Phần 2 trở đi phải nhập **tên và email** mới mở được.
- Mỗi phần có thời gian đọc (tự tính theo số chữ) và nút **Hoàn thành**. Tiến độ lưu trên trình duyệt của người đọc, đồng thời gửi về Google Sheet (mục 5).
- Trang mở được ngay trong TikTok, không cần chuyển sang trình duyệt.

**Việc cần làm trước khi đăng:**

1. Tìm chữ `Lâm điền` trong `guide.html`. Mỗi chỗ là một khung đỏ nét đứt, thay khung đó bằng nội dung thật của bạn.
2. Sửa phần `CONFIG` ở cuối file: số liệu kênh (`stats`), link Google Sheet (`sheetUrl`), thông tin nhận tiền trà sữa (`tea`).
3. Thêm ảnh vào `assets/guide/` (mục 6). Ảnh nào chưa có thì trang hiện khung "Ảnh sẽ có ở đây".

## 3. Đưa lên GitHub Pages

1. Tạo repo mới trên GitHub, ví dụ `muromduky` (để **Public**).
2. Upload cả thư mục: `index.html`, thư mục `assets/`.
3. Vào **Settings → Pages**, phần **Source** chọn `Deploy from a branch`, nhánh `main`, thư mục `/ (root)`, bấm **Save**.
4. Đợi 1–2 phút, link sẽ là: `https://<tên-github>.github.io/muromduky/`

Sau khi có link, mở `index.html`, sửa dòng `og:image` thành đường dẫn đầy đủ để ảnh xem trước hiện khi chia sẻ:

```html
<meta property="og:image" content="https://<tên-github>.github.io/muromduky/assets/og.jpg">
```

**Tên miền riêng (tuỳ chọn):** mua tên miền (ví dụ `muromduky.com`), vào **Settings → Pages → Custom domain**, rồi trỏ DNS theo hướng dẫn của GitHub.

## 4. Gắn vào TikTok

**Hồ sơ → Sửa hồ sơ → Trang web**, dán link. Tài khoản cá nhân cần đủ 1.000 follower mới thêm được link. Tài khoản Business thì thêm được ngay.

## 5. Lưu email và tiến độ vào Google Sheet

1. Tạo một Google Sheet mới, đặt tên ví dụ "Cẩm nang – người đọc".
2. Trong Sheet, vào **Tiện ích mở rộng → Apps Script**.
3. Xoá code có sẵn, dán toàn bộ nội dung `apps-script/Code.gs`. Sửa dòng `GUIDE_URL` thành link `guide.html` thật của bạn. Bấm 💾 **Lưu**.
4. Bấm **Triển khai → Tùy chọn triển khai mới**. Ở ô loại, chọn **Ứng dụng web**:
   - **Thực thi dưới dạng:** Tôi
   - **Người có quyền truy cập:** Bất kỳ ai
5. Bấm **Triển khai**, cho phép quyền truy cập khi Google hỏi (bấm *Nâng cao → Đi tới… (không an toàn)*, vì đây là script của chính bạn).
6. Copy **URL ứng dụng web** (dạng `https://script.google.com/macros/s/.../exec`), dán vào `sheetUrl` trong `guide.html`.

Sheet sẽ tự tạo 2 tab:

- **Leads:** mỗi người một dòng, gồm tên, email, nguồn vào, số phần đã đọc xong, phần gần nhất.
- **Tiến độ:** mỗi lần bấm Hoàn thành là một dòng. Xem tab này để biết người đọc hay bỏ ở phần nào.

Người đăng ký mới sẽ nhận email chào mừng có link cẩm nang. Gmail miễn phí gửi tối đa khoảng 100 email/ngày. Muốn tắt, sửa `SEND_WELCOME = false`.

**Khi sửa `Code.gs` sau này:** vào **Triển khai → Quản lý triển khai → ✏️ → Phiên bản: Phiên bản mới → Triển khai**. Làm vậy thì URL giữ nguyên, không phải dán lại.

## 6. Ảnh cho cẩm nang

Đặt ảnh vào `assets/guide/` với đúng tên dưới đây (nên là ảnh `.jpg`, chiều ngang khoảng 1080px, dưới 300KB):

| Tên file | Nội dung |
| --- | --- |
| `ket-qua-1.jpg` | Thu nhập (che số tài khoản, thông tin cá nhân) |
| `ket-qua-2.jpg` | Lượt xem |
| `ket-qua-3.jpg` | Follower và lượt thích |
| `p2-nhan-vat.jpg` | Ảnh gốc nhân vật mẫu |
| `p3-flow-trang-chu.jpg` | Trang chủ Google Flow |
| `p5-buoc-1.jpg` | Flow: bấm New project |
| `p5-buoc-2.jpg` | Flow: chọn chế độ tạo video |
| `p5-buoc-3.jpg` | Flow: tải ảnh nhân vật |
| `p5-buoc-4.jpg` | Flow: dán prompt, bấm tạo |
| `p5-buoc-5.jpg` | Flow: chọn bản đẹp nhất |
| `p5-buoc-7.jpg` | Flow: tải clip về |
| `p6-capcut.jpg` | Dựng video trong CapCut |

Ảnh hướng dẫn nên có **số thứ tự hoặc mũi tên đỏ** chỉ vào nút cần bấm.

## Ghi chú

- Ô "LIVE" trên ảnh tự đếm ngược tới 20h theo giờ Việt Nam. Từ 20h đến 21h30 ô này chuyển thành "ĐANG LIVE" và có chấm đỏ nhấp nháy. Đổi giờ hoặc thời lượng live ở `liveHour` và `liveDurationMin`.
- Khi chuyển sang nhân vật riêng của bạn, chỉ cần thay `assets/cover.jpg`, `assets/og.jpg` và tiêu đề trong `index.html`.
