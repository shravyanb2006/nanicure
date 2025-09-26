import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Search, Phone, Mail, MapPin, ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import doctorsData from "@/data/doctors.json";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  region: string;
  state: string;
  contact: string;
  email: string;
  keywords: string[];
}

const DoctorConnectPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [recommendations, setRecommendations] = useState<Doctor[]>([]);
  const [showAll, setShowAll] = useState(false);

  const handleSearch = () => {
    let filtered = doctorsData.doctors;
    
    if (selectedRegion) {
      filtered = filtered.filter(doctor => doctor.region === selectedRegion);
    }
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(doctor => 
        doctor.specialty.toLowerCase().includes(searchLower) ||
        doctor.keywords.some(keyword => keyword.toLowerCase().includes(searchLower)) ||
        doctor.name.toLowerCase().includes(searchLower)
      );
    }
    
    setRecommendations(filtered.slice(0, showAll ? filtered.length : 8));
  };

  const regions = [
    "North India",
    "South India", 
    "East India",
    "West India",
    "Central India"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuClick={() => {}}
        selectedRegion=""
        onRegionChange={() => {}}
        onLoginClick={() => {}}
        isLoggedIn={false}
        userName=""
      />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4 font-serif">
              Doctor Connect
            </h1>
            <p className="text-lg text-muted-foreground">
              Find trusted doctors in your region for specialized care
            </p>
          </div>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Find Your Doctor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Input
                placeholder="Search by problem or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Regions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleSearch} className="w-full">
                <Search className="h-4 w-4 mr-2" />
                Search Doctors
              </Button>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                💡 <strong>Nani's Tip:</strong> Always verify doctor credentials and book appointments in advance. For emergencies, call local emergency services immediately.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Recommendations */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("general physician");
                setRecommendations(doctorsData.doctors.filter(d => d.specialty.toLowerCase().includes("general")).slice(0, 5));
              }}
            >
              General Physicians
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm("pediatrician");
                setRecommendations(doctorsData.doctors.filter(d => d.specialty.toLowerCase().includes("pediatric")).slice(0, 5));
              }}
            >
              Child Specialists
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm("gynecologist");
                setRecommendations(doctorsData.doctors.filter(d => d.specialty.toLowerCase().includes("gynec")).slice(0, 5));
              }}
            >
              Women's Health
            </Button>
          </div>
        </div>

        {/* Doctor Recommendations */}
        {recommendations.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Recommended Doctors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((doctor) => (
                <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="h-5 w-5 text-primary" />
                      {doctor.name}
                    </CardTitle>
                    <p className="text-primary font-medium">{doctor.specialty}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {doctor.state}, {doctor.region}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4" />
                        <a href={`tel:${doctor.contact}`} className="text-primary hover:underline">
                          {doctor.contact}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${doctor.email}`} className="text-primary hover:underline">
                          {doctor.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {doctor.keywords.slice(0, 3).map((keyword, index) => (
                        <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <a href={`tel:${doctor.contact}`}>Call Now</a>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`mailto:${doctor.email}`}>Email</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {!showAll && recommendations.length >= 8 && (
              <div className="text-center mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowAll(true);
                    handleSearch();
                  }}
                >
                  Show More Doctors
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Disclaimer */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardContent className="pt-6">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Medical Disclaimer:</strong> The doctors listed are for reference only. Always verify credentials, 
              check current availability, and book appointments directly. For medical emergencies, contact emergency services immediately. 
              NaniCure is not responsible for the quality of medical services provided by listed practitioners.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorConnectPage;