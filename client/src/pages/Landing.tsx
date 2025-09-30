import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Waves, 
  MapPin, 
  BarChart3, 
  Upload, 
  Telescope,
  Database,
  QrCode,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-cyan-950 dark:to-blue-950">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 pt-12">
          <div className="inline-flex items-center gap-3 mb-6 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text">
            <Waves className="h-16 w-16 text-cyan-500" />
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
            SamundraManthan
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-4 max-w-3xl mx-auto">
            AI-Powered Beach Sediment Analysis Platform
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Monitor and analyze coastal sediment patterns across Indian beaches with advanced machine learning, 
            real-time data visualization, and comprehensive analytics
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              onClick={() => window.location.href = '/api/login'}
            >
              <Telescope className="mr-2 h-5 w-5" />
              Log In to Get Started
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="border-cyan-200 hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
                  <MapPin className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold">Interactive Maps</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Visualize geotagged sand measurements across Indian coastlines with color-coded markers showing beach types and sediment data
              </p>
            </CardContent>
          </Card>

          <Card className="border-teal-200 hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold">Advanced Analytics</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Comprehensive charts and graphs showing grain size distribution, beach type trends, and sediment composition analysis
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">Temporal Trends</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Track changes in beach morphology over time, identify erosion patterns, and monitor coastal health with AI insights
              </p>
            </CardContent>
          </Card>

          <Card className="border-cyan-200 hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-lg">
                  <Zap className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold">Real-Time Processing</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Upload sand images via ESP devices or web interface and get instant AI-powered grain size classification
              </p>
            </CardContent>
          </Card>

          <Card className="border-teal-200 hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg">
                  <Database className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold">Data Export</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Download datasets in CSV, JSON, or Excel formats and integrate with other environmental or GIS systems via API
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <QrCode className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold">QR Code Integration</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Each measurement includes a QR code for instant access to full analytics and historical data from handheld devices
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-12 text-white mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-bold mb-4">
              Empowering Coastal Research
            </h2>
            <p className="text-xl mb-8 text-cyan-50">
              Join researchers, environmentalists, and policymakers in monitoring India's beaches 
              with cutting-edge AI technology and comprehensive data analytics
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-4xl font-bold mb-2">95%+</div>
                <div className="text-cyan-100">Prediction Accuracy</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">Real-time</div>
                <div className="text-cyan-100">Data Processing</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">Unlimited</div>
                <div className="text-cyan-100">Beach Locations</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-cyan-200">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 mx-auto">
                  1
                </div>
                <h4 className="font-semibold mb-2">Capture</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Upload geotagged sand images from ESP devices or web interface
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-teal-200">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 mx-auto">
                  2
                </div>
                <h4 className="font-semibold mb-2">Analyze</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  AI model classifies grain size with high confidence
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-blue-200">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 mx-auto">
                  3
                </div>
                <h4 className="font-semibold mb-2">Visualize</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  View results on interactive maps and analytics dashboards
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-cyan-200">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 mx-auto">
                  4
                </div>
                <h4 className="font-semibold mb-2">Monitor</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Track trends and export data for research and policy making
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            onClick={() => window.location.href = '/api/login'}
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
}
