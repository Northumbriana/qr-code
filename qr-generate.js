const fs = require("fs");
const path = require("path");
const QRCode = require("qrcode");

const outputDir = "./qrcodes";

// List of URLs to encode
const urls = [
    "https://northumbriana.org.uk/",
    "https://northumbriana.org.uk/gathering",
    "https://northumbriana.org.uk/gathering/programme/",
    "https://northumbriana.org.uk/language-society",
    "https://northumbriana.org.uk/events",
    "https://northumbriana.org.uk/antiquarian-society",
    "https://northumbriana.org.uk/magazine",
    "https://northumbriana.org.uk/contact"
];

const options = {
    errorCorrectionLevel: "M", // L, M, Q, H
    margin: 2,
    width: 600
};

async function generate() {
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    for (const url of urls) {
        const safeName = url
            .replace(/^https?:\/\//, "")
            .replace(/[^\w\d]+/g, "_")
            .replace(/_+$/, "");

        const pngPath = path.join(outputDir, `${safeName}.png`);
        const svgPath = path.join(outputDir, `${safeName}.svg`);

        try {
            await QRCode.toFile(pngPath, url, options);
            await QRCode.toFile(svgPath, url, { ...options, type: "svg" });

            console.log(`Generated QR for ${url}`);
        } catch (err) {
            console.error(`Failed for ${url}`, err);
        }
    }
}

generate();