const TEMPLATE = (queueNumber, expiresAt) => `
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: Arial,sans-serif; text-align:center; padding:5px 10px; }
  h1 { font-size:30px; margin:8px 0; }
  p { font-size:10px; margin:2px 0; color:gray; }
</style>
</head>
<body>
  <h1>${queueNumber}</h1>
  <p>Exp: ${expiresAt}</p>
</body>
</html>
`;

const formatDate = (date) => {
  const d = new Date(date);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let h = d.getHours(), m = String(d.getMinutes()).padStart(2,"0");
  const ampm = h >= 12 ? "PM":"AM";
  h = h % 12 || 12;
  return `${months[d.getMonth()]} ${String(d.getDate()).padStart(2,"0")}, ${d.getFullYear()}, ${h}:${m} ${ampm}`;
};

const usePrintHook = () => {
  const printQueueTicket = (queueNumber, expiresAt) => {
    const html = TEMPLATE(queueNumber, formatDate(expiresAt));

    const iframe = document.createElement("iframe");
    Object.assign(iframe.style, { position:"fixed", width:"0", height:"0", border:"0", left:"-9999px" });
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();

    iframe.contentWindow.focus();
    iframe.contentWindow.print();
    setTimeout(() => document.body.removeChild(iframe), 100);
  };

  return { printQueueTicket };
};

export default usePrintHook;
