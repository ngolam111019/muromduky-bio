# Trang link bio – @muromduky

Trang link bio một file, không cần build, chạy ngay trên GitHub Pages.

```
link-bio/
├── index.html        ← trang chính (sửa link trong phần CONFIG)
├── assets/cover.jpg  ← ảnh đầu trang
├── assets/og.jpg     ← ảnh hiện khi chia sẻ link (1200×630)
└── README.md
```

## 1. Điền link của bạn

Mở `index.html`, tìm khối `const CONFIG = {` và thay các link có chữ `THAY_...`:

| Nút | Thay bằng |
| --- | --- |
| Cẩm nang làm video AI | Link Google Form nhận cẩm nang (xem mục 2) |
| Nhóm Zalo | Link mời nhóm Zalo (`https://zalo.me/g/...`) |
| Nhận làm video AI | Link Zalo cá nhân (`https://zalo.me/<số điện thoại>`) |
| Công cụ của Lâm | Đang để `""` nên nút bị ẩn. Điền link khi công cụ sẵn sàng. |

Nút nào để `url: ""` thì tự ẩn. Muốn thêm nút, copy một dòng `{ icon: ..., title: ..., sub: ..., url: ..., id: ... }`.

Link không phải Zalo hoặc TikTok sẽ tự được gắn `utm_source=tiktok&utm_medium=bio&utm_content=<id>`, để bạn biết người xem đến từ nút nào.

## 2. Tạo form nhận cẩm nang (Google Form)

1. Vào forms.google.com, tạo form "Nhận cẩm nang làm video AI miễn phí".
2. Thêm 2 câu hỏi: **Tên** và **Email hoặc số Zalo** (bắt buộc).
3. Thêm một dòng mô tả: *"Mình sẽ gửi cẩm nang và thỉnh thoảng gửi mẹo làm video AI. Bạn có thể nhắn để huỷ nhận tin bất cứ lúc nào."*
4. Vào **Cài đặt → Bản trình bày → Thông báo xác nhận**, dán link cẩm nang vào đó. Người điền xong sẽ nhận link ngay.
5. Bấm **Gửi → biểu tượng link → Rút gọn URL**, dán vào nút Cẩm nang.

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

## Ghi chú

- Ô "LIVE" trên ảnh tự đếm ngược tới 20h theo giờ Việt Nam. Từ 20h đến 21h30 ô này chuyển thành "ĐANG LIVE" và có chấm đỏ nhấp nháy. Đổi giờ hoặc thời lượng live ở `liveHour` và `liveDurationMin`.
- Khi chuyển sang nhân vật riêng của bạn, chỉ cần thay `assets/cover.jpg`, `assets/og.jpg` và tiêu đề trong `index.html`.
