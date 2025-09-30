import UploadForm from "@/components/UploadForm";
import QRCodeDisplay from "@/components/QRCodeDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function Upload() {
  const measurementUrl = `${window.location.origin}/measurement/sample-123`;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2" data-testid="text-page-title">Upload Sample</h1>
          <p className="text-muted-foreground">
            Submit a geotagged sand image for ML-powered analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <UploadForm />
          </div>

          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium mb-1">Image Quality</h4>
                  <p className="text-muted-foreground">
                    Use clear, well-lit images of sand samples. Microscopic or close-up shots work best.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">GPS Coordinates</h4>
                  <p className="text-muted-foreground">
                    Ensure accurate latitude and longitude for proper mapping and analysis.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Location Info</h4>
                  <p className="text-muted-foreground">
                    Add location names to help identify and categorize beach sites.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div>
              <QRCodeDisplay measurementId="sample-123" value={measurementUrl} />
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Each measurement generates a unique QR code for easy access
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
