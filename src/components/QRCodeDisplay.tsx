
import React from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QrCode, Download, Printer } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface QRCodeDisplayProps {
  value: string;
  title: string;
  subtitle?: string;
  patientName?: string;
  showDownload?: boolean;
  showPrint?: boolean;
  size?: number;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
  value,
  title,
  subtitle,
  patientName,
  showDownload = true,
  showPrint = true,
  size = 256
}) => {
  const [qrCodeUrl, setQrCodeUrl] = React.useState<string>('');

  React.useEffect(() => {
    const generateQR = async () => {
      try {
        const url = await QRCode.toDataURL(value, {
          width: size,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          },
          errorCorrectionLevel: 'M'
        });
        setQrCodeUrl(url);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQR();
  }, [value, size]);

  const handleDownload = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${title.replace(/\s+/g, '_')}_QR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "QR Code Downloaded",
      description: "QR code has been saved to your downloads folder."
    });
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    if (printWindow && qrCodeUrl) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>SmartMedConnect - ${title}</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                margin: 40px;
                background: white;
              }
              .header { 
                font-size: 24px; 
                font-weight: bold; 
                margin-bottom: 20px;
                color: #333;
              }
              .qr-container { 
                margin: 30px 0; 
                border: 2px solid #ddd;
                padding: 20px;
                display: inline-block;
              }
              .info { 
                font-size: 16px; 
                margin: 10px 0;
                color: #666;
              }
              .instructions {
                margin-top: 30px;
                font-size: 14px;
                color: #888;
                border-top: 1px solid #eee;
                padding-top: 20px;
              }
              @media print {
                body { margin: 0; }
              }
            </style>
          </head>
          <body>
            <div class="header">SmartMedConnect</div>
            <div class="qr-container">
              <img src="${qrCodeUrl}" alt="QR Code" />
            </div>
            <div class="info"><strong>${title}</strong></div>
            ${subtitle ? `<div class="info">${subtitle}</div>` : ''}
            ${patientName ? `<div class="info">Patient: ${patientName}</div>` : ''}
            <div class="instructions">
              Present this QR code to hospital staff for instant access to your medical information.
              <br>For emergency assistance, call 911 or your local emergency number.
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();

      toast({
        title: "Print Dialog Opened",
        description: "QR code is ready to print."
      });
    }
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(value).then(() => {
      toast({
        title: "ID Copied",
        description: "Patient ID has been copied to clipboard."
      });
    });
  };

  return (
    <Card className="p-6 text-center">
      <div className="space-y-4">
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 inline-block">
          {qrCodeUrl ? (
            <img 
              src={qrCodeUrl} 
              alt="QR Code" 
              className="mx-auto block"
              style={{ width: size, height: size }}
            />
          ) : (
            <div 
              className="flex items-center justify-center bg-gray-100 rounded"
              style={{ width: size, height: size }}
            >
              <QrCode className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
          {patientName && <p className="text-gray-700 font-medium">Patient: {patientName}</p>}
        </div>

        <div className="text-lg font-mono bg-blue-50 border border-blue-200 rounded px-4 py-2 inline-block">
          {value}
        </div>

        <div className="flex gap-2 justify-center flex-wrap">
          <Button onClick={handleCopyId} variant="outline" size="sm">
            Copy ID
          </Button>
          {showDownload && (
            <Button onClick={handleDownload} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download QR
            </Button>
          )}
          {showPrint && (
            <Button onClick={handlePrint} variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              Print QR
            </Button>
          )}
        </div>

        <div className="text-sm text-gray-600 bg-green-50 border border-green-200 rounded p-3">
          <p className="font-semibold mb-1">Instructions:</p>
          <p>Show this QR code to hospital staff for instant access to your medical information.</p>
        </div>
      </div>
    </Card>
  );
};

export default QRCodeDisplay;
