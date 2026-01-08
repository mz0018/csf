import generateQrUrl from "../services/generateQrUrl";

const TEMPLATE = (queueNumber, expiresAt, qrDataUrl, userName) => `
<!DOCTYPE html>
<html>
<head>
<style>
  body {
    font-family: Arial, sans-serif;
    padding: 10px;
    width: 350px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  .ticket {
    display: flex;
    gap: 15px;
    align-items: center;
  }
  .qr {
    width: 100px;
    height: 100px;
    flex-shrink: 0;
  }
  .info {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100px;
  }
  .user-name {
    font-weight: bold;
    font-size: 18px;
  }
  .label {
    font-size: 12px;
    color: gray;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .queue-number {
    font-size: 32px;
    font-weight: bold;
    margin-top: 5px;
  }
  .expires {
    font-size: 12px;
    color: gray;
    text-align: right;
    margin-top: 10px;
  }
</style>
</head>
<body>
  <div class="ticket">
    <img class="qr" src="${qrDataUrl}" alt="QR Code" />
    <div class="info">
      <div>
        <div class="label">Client Satisfactory FeedBack</div>
      </div>
      <div>
        <div class="label">Queue Number</div>
        <div class="queue-number">${queueNumber}</div>
      </div>
    </div>
  </div>
  <div class="expires">Exp: ${expiresAt}</div>
</body>
</html>
`;

const formatDate = (date) => {
  const d = new Date(date);
  const hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const h12 = hours % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
};

const usePrintHook = () => {
  const printQueueTicket = async (queueNumber, expiresAt, userName) => {
    const expiresFormatted = formatDate(expiresAt);
    const qrText = `${import.meta.env.VITE_QR_CODE}`;
    const qrDataUrl = await generateQrUrl(qrText);

    const html = TEMPLATE(queueNumber, expiresFormatted, qrDataUrl, userName);

    const iframe = document.createElement("iframe");
    Object.assign(iframe.style, {
      position: "fixed",
      width: "0",
      height: "0",
      border: "0",
      left: "-9999px",
    });
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();

    const img = iframe.contentWindow.document.querySelector("img");
    if (img) {
      img.onload = () => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        setTimeout(() => document.body.removeChild(iframe), 100);
      };
      img.onerror = () => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        setTimeout(() => document.body.removeChild(iframe), 100);
      };
    } else {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => document.body.removeChild(iframe), 100);
    }
  };

  return { printQueueTicket };
};

export default usePrintHook;
