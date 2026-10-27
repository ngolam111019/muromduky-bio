/* =========================================================
   Nhận email và tiến độ đọc từ guide.html, lưu vào Google Sheet.
   Cách cài: xem README.md, mục 5.
   ========================================================= */
const GUIDE_URL = "https://THAY_LINK_CUA_BAN/guide.html";   // link trang cẩm nang, dùng trong email chào mừng
const SEND_WELCOME = true;                                  // false nếu không muốn gửi email chào mừng
const SENDER_NAME = "Lâm Solobiz";

const LEADS = "Leads";
const LOG = "Tiến độ";
const LEAD_HEADERS = ["Đăng ký lúc", "Tên", "Email", "Nguồn", "Thiết bị", "Số phần đã xong", "Tổng số phần", "Phần gần nhất", "Cập nhật lúc"];
const LOG_HEADERS = ["Thời gian", "Email", "Mã phần", "Tên phần", "Trạng thái"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const email = String(d.email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 120) return ok();

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const leads = sheet(ss, LEADS, LEAD_HEADERS);
    const now = new Date();
    const row = findRow(leads, email);

    if (d.type === "lead") {
      if (row) {
        leads.getRange(row, 9).setValue(now);
      } else {
        leads.appendRow([now, clean(d.name), email, clean(d.source), clean(d.device), num(d.doneCount), num(d.total), "", now]);
        if (SEND_WELCOME) welcome(email, clean(d.name));
      }
    } else if (d.type === "progress") {
      sheet(ss, LOG, LOG_HEADERS).appendRow([now, email, clean(d.section), clean(d.title), d.done ? "Hoàn thành" : "Bỏ đánh dấu"]);
      if (row) leads.getRange(row, 6, 1, 4).setValues([[num(d.doneCount), num(d.total), clean(d.title), now]]);
    }
    return ok();
  } catch (err) {
    return ok();
  } finally {
    lock.releaseLock();
  }
}

function sheet(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
  return sh;
}

function findRow(sh, email) {
  const cell = sh.getRange("C:C").createTextFinder(email).matchEntireCell(true).findNext();
  return cell ? cell.getRow() : 0;
}

// Cắt ngắn và chặn công thức (=, +, -, @) để dữ liệu người dùng không chạy được trong Sheet
function clean(v) {
  const s = String(v == null ? "" : v).slice(0, 200);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function num(v) {
  const n = Number(v);
  return isFinite(n) ? n : "";
}

function welcome(email, name) {
  const html =
    "<p>Chào " + (name ? name.replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])) : "bạn") + ",</p>" +
    "<p>Cảm ơn bạn đã đăng ký nhận <b>Cẩm nang làm video hoạt hình AI</b>. Đây là link để bạn đọc bất cứ lúc nào, trên bất kỳ máy nào:</p>" +
    '<p><a href="' + GUIDE_URL + '">👉 Mở cẩm nang</a></p>' +
    "<p>Đọc xong phần nào, bấm nút <b>Hoàn thành</b> ở cuối phần đó để đánh dấu nhé.</p>" +
    "<p>Chúc bạn làm video vui!<br>Lâm</p>";
  try {
    MailApp.sendEmail({ to: email, subject: "🎁 Cẩm nang làm video hoạt hình AI của bạn", htmlBody: html, name: SENDER_NAME });
  } catch (err) {}
}

function ok() {
  return ContentService.createTextOutput("ok");
}
