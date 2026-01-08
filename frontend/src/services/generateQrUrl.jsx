import QRCode from "qrcode";

const generateQrUrl = async (text) => {
    try {
        return await QRCode.toDataURL(text);
    } catch (err) {
        console.error("QR generation failed:", err);
        return null;
    }
};

export default generateQrUrl;
