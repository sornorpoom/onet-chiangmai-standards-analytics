const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'คะแนน onet รายมาตรฐาน 65 66 67 68 รายสังกัด');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.csv'));

const standardDescriptions = {
  // ภาษาไทย
  "ท 1.1": "การอ่าน (กระบวนการอ่านสร้างความรู้ ความคิด วิเคราะห์ วิจารณ์)",
  "ท 2.1": "การเขียน (กระบวนการเขียนสื่อความ สื่อสารอย่างมีประสิทธิภาพ)",
  "ท 3.1": "การฟัง การดู และการพูด (ฟัง/ดูอย่างมีวิจารณญาณ และพูดแสดงความรู้ ความคิด)",
  "ท 4.1": "หลักการใช้ภาษาไทย (ธรรมชาติ กฎเกณฑ์ และการเปลี่ยนแปลงของภาษา)",
  "ท 5.1": "วรรณคดีและวรรณกรรม (ความเข้าใจ วิเคราะห์ วิจารณ์ และคุณค่าวรรณคดี)",
  
  // คณิตศาสตร์
  "ค 1.1": "จำนวนและพีชคณิต (ระบบจำนวน การดำเนินการ และผลที่เกิดขึ้น)",
  "ค 1.2": "แบบรูปและความสัมพันธ์ (แบบรูป ฟังก์ชัน ลำดับและอนุกรม)",
  "ค 1.3": "นิพจน์ สมการ และอสมการ (การแก้ปัญหาด้วยสมการ/อสมการ)",
  "ค 2.1": "การวัดและเรขาคณิต (การวัดและคาดคะเนขนาดของสิ่งที่ต้องการวัด)",
  "ค 2.2": "เรขาคณิต (รูปเรขาคณิตและทฤษฎีบททางเรขาคณิต)",
  "ค 3.1": "สถิติและความน่าจะเป็น (กระบวนการทางสถิติและการนำไปใช้)",
  "ค 3.2": "ความน่าจะเป็น (หลักการนับเบื้องต้นและความน่าจะเป็น)",

  // วิทยาศาสตร์
  "ว 1.1": "วิทยาศาสตร์ชีวภาพ (ความหลากหลายของระบบนิเวศและสิ่งแวดล้อม)",
  "ว 1.2": "สิ่งมีชีวิต (สมบัติ หน่วยพื้นฐาน และการดำรงชีวิตของพืชและสัตว์)",
  "ว 1.3": "พันธุศาสตร์ (การถ่ายทอดลักษณะทางพันธุกรรมและความหลากหลายทางชีวภาพ)",
  "ว 2.1": "วิทยาศาสตร์กายภาพ (สมบัติของสสาร องค์ประกอบ และแรงยึดเหนี่ยว)",
  "ว 2.2": "แรงและการเคลื่อนที่ (ธรรมชาติของแรง ผลของแรง และการเคลื่อนที่)",
  "ว 2.3": "พลังงาน (การเปลี่ยนแปลง การถ่ายโอนพลังงาน คลื่น และแสง)",
  "ว 3.1": "วิทยาศาสตร์โลกและอวกาศ (ดาราศาสตร์ ระบบสุริยะ และเทคโนโลยีอวกาศ)",
  "ว 3.2": "โลกและการเปลี่ยนแปลง (กระบวนการเปลี่ยนแปลงลมฟ้าอากาศ ธรณีพิบัติ)",
  "ว 4.1": "การออกแบบและเทคโนโลยี (แนวคิดหลักของเทคโนโลยีเพื่อแก้ปัญหา)",
  "ว 4.2": "วิทยาการคำนวณ (การคิดเชิงคำนวณและเทคโนโลยีดิจิทัล)",

  // ภาษาอังกฤษ
  "ต 1.1": "ภาษาเพื่อการสื่อสาร (เข้าใจและตีความเรื่องที่ฟังและอ่านจากสื่อ)",
  "ต 1.2": "ทักษะการสื่อสาร (แลกเปลี่ยนข้อมูลข่าวสาร แสดงความรู้สึกและความคิดเห็น)",
  "ต 1.3": "การนำเสนอข้อมูล (นำเสนอข้อมูลและความคิดเห็นโดยการพูดและการเขียน)",
  "ต 2.1": "ภาษาและวัฒนธรรม (เข้าใจความสัมพันธ์ระหว่างภาษากับวัฒนธรรม)",
  "ต 2.2": "การเปรียบเทียบภาษาและวัฒนธรรม (ความเหมือนและความต่างทางภาษา/วัฒนธรรม)",
  "ต 4.1": "ภาษากับความสัมพันธ์กับชุมชนและโลก (การใช้ภาษาในสถานการณ์ต่าง ๆ)"
};

const allData = [];

files.forEach(fileName => {
  const isP6 = fileName.includes('ป.6');
  const isM3 = fileName.includes('ม.3');
  const level = isP6 ? 'ป.6' : (isM3 ? 'ม.3' : 'ไม่ระบุ');
  let subject = '';
  if (fileName.includes('คณิตศาสตร์')) subject = 'คณิตศาสตร์';
  else if (fileName.includes('ภาษาไทย')) subject = 'ภาษาไทย';
  else if (fileName.includes('ภาษาอังกฤษ')) subject = 'ภาษาอังกฤษ';
  else if (fileName.includes('วิทยาศาสตร์')) subject = 'วิทยาศาสตร์';

  const raw = fs.readFileSync(path.join(dir, fileName), 'utf8');
  const lines = raw.split(/\r?\n/).filter(l => l.trim() && l.replace(/,/g, '').trim() !== '');
  if (lines.length <= 1) return;

  const headerLine = lines[0].replace(/^\uFEFF/, '');
  const headers = headerLine.split(',').map(h => h.trim());

  const yearIdx = headers.findIndex(h => h.includes('ปี'));
  const affilIdx = headers.lastIndexOf('คำอธิบายลำดับย่อย') !== -1 ? headers.lastIndexOf('คำอธิบายลำดับย่อย') : headers.findIndex(h => h.includes('คำอธิบาย'));
  const countIdx = headers.findIndex(h => h.includes('จำนวนผู้เข้าสอบ'));

  const standards = [];
  headers.forEach((h, idx) => {
    const meanMatch = h.match(/^([ก-๙a-zA-Z0-9\.\s]+)\s*\(Mean\)$/);
    if (meanMatch) {
      const code = meanMatch[1].trim();
      const sdColName = `${code} (S.D.)`;
      const sdIdx = headers.indexOf(sdColName);
      standards.push({ code, meanIdx: idx, sdIdx });
    }
  });

  for (let i = 1; i < lines.length; i++) {
    const parts = lines[i].split(',').map(p => p.trim());
    if (parts.length < headers.length) continue;
    const year = parseInt(parts[yearIdx], 10);
    const affiliation = parts[affilIdx];
    const studentCount = parseInt(parts[countIdx], 10) || 0;

    if (!year || !affiliation) continue;

    const stdScores = {};
    standards.forEach(std => {
      const meanVal = parseFloat(parts[std.meanIdx]);
      const sdVal = std.sdIdx !== -1 ? parseFloat(parts[std.sdIdx]) : null;
      stdScores[std.code] = {
        mean: isNaN(meanVal) ? null : meanVal,
        sd: isNaN(sdVal) ? null : sdVal,
        desc: standardDescriptions[std.code] || ""
      };
    });

    allData.push({
      level,
      subject,
      year,
      affiliation,
      studentCount,
      standards: stdScores
    });
  }
});

console.log('Total parsed rows:', allData.length);
fs.writeFileSync(path.join(__dirname, 'data_parsed.json'), JSON.stringify({
  standardDescriptions,
  records: allData
}, null, 2), 'utf8');

console.log('Successfully saved to data_parsed.json');
