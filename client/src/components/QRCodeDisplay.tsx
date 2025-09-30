import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface QRCodeDisplayProps {
  measurementId: string;
  value: string;
}

export default function QRCodeDisplay({ measurementId, value }: QRCodeDisplayProps) {
  const handleDownload = () => {
    const svg = document.getElementById(`qr-${measurementId}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = `qr-${measurementId}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <Card data-testid={`card-qr-${measurementId}`}>
      <CardHeader>
        <CardTitle className="text-lg">Measurement QR Code</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <QRCodeSVG
          id={`qr-${measurementId}`}
          value={value}
          size={200}
          level="H"
          includeMargin
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          data-testid="button-download-qr"
        >
          <Download className="h-4 w-4 mr-2" />
          Download QR Code
        </Button>
      </CardContent>
    </Card>
  );
}
