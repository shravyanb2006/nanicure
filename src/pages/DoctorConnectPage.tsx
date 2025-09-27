import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope, Search, Phone, Mail, MapPin, ArrowLeft } from "lucide-react";
import { HamburgerMenu } from "@/components/HamburgerMenu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { profileManager } from '@/utils/profileManager';
import doctorsData from "@/data/doctors.json";
import doctorsExpandedData from "@/data/doctors_expanded.json";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  region: string;
  state: string;
  contact: string;
  email: string;
  keywords: string[];
  experience?: number;
  qualifications?: string[];
  hospital?: string;
  consultationFee?: string;
  availability?: string;
  rating?: number;
}

const DoctorConnectPage = () => {
  const navigate = useNavigate();
  const profile = profileManager.getProfile();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(profile?.region || "");
  const [recommendations, setRecommendations] = useState<Doctor[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    // Combine both doctor datasets
    const combined = [
      ...doctorsData.doctors,
      ...(doctorsExpandedData.doctors || [])
    ];
    setAllDoctors(combined);
    
    // Auto-search based on user region on load
    if (profile?.region) {
      performSearch("", profile.region);
    }
  }, []);

  const performSearch = (query: string = searchTerm, region: string = selectedRegion) => {
    let filtered = [...allDoctors];
    
    // Enhanced search algorithm with scoring
    const scoredDoctors = filtered.map(doctor => {
      let score = 0;
      const queryLower = query.toLowerCase();
      
      // Region matching (highest priority)
      if (region && region !== "all") {
        if (doctor.region?.toLowerCase().includes(region.toLowerCase())) {
          score += 0.4;
        } else if (doctor.state?.toLowerCase().includes(region.toLowerCase())) {
          score += 0.2;
        }
      }
      
      if (query) {
        // Specialty matching
        if (doctor.specialty?.toLowerCase().includes(queryLower)) {
          score += 0.3;
        }
        
        // Keywords matching
        const keywordMatches = doctor.keywords?.filter(keyword => 
          keyword.toLowerCase().includes(queryLower) || 
          queryLower.includes(keyword.toLowerCase())
        ).length || 0;
        score += keywordMatches * 0.1;
        
        // Name matching
        if (doctor.name?.toLowerCase().includes(queryLower)) {
          score += 0.2;
        }
        
        // Advanced symptom matching
        const healthSymptoms = {
          'heart': ['cardiologist', 'cardiology', 'heart', 'chest pain'],
          'brain': ['neurologist', 'neurology', 'brain', 'headache'],
          'skin': ['dermatologist', 'dermatology', 'skin', 'rash'],
          'bone': ['orthopedic', 'orthopedics', 'bone', 'joint'],
          'eye': ['ophthalmologist', 'eye', 'vision'],
          'child': ['pediatrician', 'pediatrics', 'children', 'baby'],
          'woman': ['gynecologist', 'gynecology', 'pregnancy', 'women'],
          'mental': ['psychiatrist', 'psychology', 'depression', 'anxiety']
        };
        
        for (const [symptom, terms] of Object.entries(healthSymptoms)) {
          if (queryLower.includes(symptom)) {
            if (terms.some(term => 
              doctor.specialty?.toLowerCase().includes(term) || 
              doctor.keywords?.some(k => k.toLowerCase().includes(term))
            )) {
              score += 0.25;
            }
          }
        }
      }
      
      return { doctor, score };
    });
    
    // Sort by score and get top results
    let results = scoredDoctors
      .filter(item => item.score > 0 || !query) // Show all if no query
      .sort((a, b) => b.score - a.score)
      .map(item => item.doctor);
    
    // Ensure we always return some results
    if (results.length === 0 && allDoctors.length > 0) {
      // Fallback to general practitioners in user's region or any region
      results = allDoctors.filter(doctor => 
        doctor.specialty?.toLowerCase().includes('general') ||
        doctor.specialty?.toLowerCase().includes('physician') ||
        doctor.specialty?.toLowerCase().includes('family')
      ).slice(0, 5);
      
      // If still no results, show top 5 doctors
      if (results.length === 0) {
        results = allDoctors.slice(0, 5);
      }
    }
    
    setRecommendations(results.slice(0, showAll ? results.length : 8));
  };

  const handleSearch = () => {
    performSearch(searchTerm, selectedRegion);
  };

  const regions = [
    "North India",
    "South India", 
    "East India",
    "West India",
    "Central India"
  ];

  return (
    <div className="min-h-screen bg-background indian-motifs">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/companions')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <HamburgerMenu currentPage="doctor-connect" />
        </div>
        
        <div className="lotus-divider mb-8">
          <span>🩺</span>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="calligraphy-title text-4xl mb-2 text-primary">
            Doctor Connect
          </h1>
          <p className="nani-description text-lg">
            Find trusted doctors in your region for specialized care
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8 shadow-warm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Find Your Doctor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Input
                placeholder="Search by symptoms, condition, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Select value={selectedRegion} onValueChange={(value) => {
                setSelectedRegion(value);
                profileManager.updateProfile({ region: value });
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleSearch} className="w-full btn-nani">
                <Search className="h-4 w-4 mr-2" />
                Search Doctors
              </Button>
            </div>
            
            <div className="gradient-sage rounded-lg p-4 border border-primary/20">
              <p className="text-sm text-primary">
                💡 <strong>Nani's Tips:</strong> Try searching by symptoms like "chest pain", "diabetes care", or "child fever". 
                Always verify credentials and for emergencies call 108 immediately.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Recommendations */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-center">🔍 Quick Search Categories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              className="btn-nani-secondary"
              onClick={() => {
                setSearchTerm("general physician");
                performSearch("general physician", selectedRegion);
              }}
            >
              👨‍⚕️ General Care
            </Button>
            <Button 
              variant="outline"
              className="btn-nani-secondary"
              onClick={() => {
                setSearchTerm("pediatrician");
                performSearch("pediatrician", selectedRegion);
              }}
            >
              👶 Child Care
            </Button>
            <Button 
              variant="outline"
              className="btn-nani-secondary"
              onClick={() => {
                setSearchTerm("gynecologist");
                performSearch("gynecologist", selectedRegion);
              }}
            >
              👩 Women's Health
            </Button>
            <Button 
              variant="outline"
              className="btn-nani-secondary"
              onClick={() => {
                setSearchTerm("cardiologist");
                performSearch("cardiologist", selectedRegion);
              }}
            >
              ❤️ Heart Care
            </Button>
            <Button 
              variant="outline"
              className="btn-nani-secondary"
              onClick={() => {
                setSearchTerm("orthopedic");
                performSearch("orthopedic", selectedRegion);
              }}
            >
              🦴 Bone & Joints
            </Button>
            <Button 
              variant="outline"
              className="btn-nani-secondary"
              onClick={() => {
                setSearchTerm("dermatologist");
                performSearch("dermatologist", selectedRegion);
              }}
            >
              ✨ Skin Care
            </Button>
            <Button 
              variant="outline"
              className="btn-nani-secondary"
              onClick={() => {
                setSearchTerm("neurologist");
                performSearch("neurologist", selectedRegion);
              }}
            >
              🧠 Brain & Nerves
            </Button>
            <Button 
              variant="outline"
              className="btn-nani-secondary"
              onClick={() => {
                setSearchTerm("emergency");
                performSearch("emergency", selectedRegion);
              }}
            >
              🚨 Emergency
            </Button>
          </div>
        </div>

        {/* Doctor Recommendations */}
        {recommendations.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              🩺 Recommended Doctors ({recommendations.length} found)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((doctor) => (
                <Card key={doctor.id} className="widget-card hover:shadow-glow transition-smooth">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="h-5 w-5 text-primary" />
                      {doctor.name}
                    </CardTitle>
                    <p className="text-primary font-medium text-sm">{doctor.specialty}</p>
                    {doctor.experience && (
                      <p className="text-xs text-muted-foreground">
                        🎓 {doctor.experience}+ years experience
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {doctor.state}, {doctor.region}
                      </div>
                      {doctor.hospital && (
                        <div className="text-sm text-muted-foreground">
                          🏥 {doctor.hospital}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-green-600" />
                        <a href={`tel:${doctor.contact}`} className="text-primary hover:underline font-medium">
                          {doctor.contact}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <a href={`mailto:${doctor.email}`} className="text-primary hover:underline truncate">
                          {doctor.email}
                        </a>
                      </div>
                      {doctor.consultationFee && (
                        <div className="text-sm text-green-600 font-medium">
                          💰 ₹{doctor.consultationFee}
                        </div>
                      )}
                      {doctor.availability && (
                        <div className="text-sm text-orange-600">
                          ⏰ {doctor.availability}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {doctor.keywords.slice(0, 4).map((keyword, index) => (
                        <span key={index} className="text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded-full">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="btn-nani flex-1" asChild>
                        <a href={`tel:${doctor.contact}`}>
                          📞 Call Now
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`mailto:${doctor.email}`}>
                          ✉️ Email
                        </a>
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

        {recommendations.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Stethoscope className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No doctors found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or region, or use our quick categories above.
              </p>
              <Button onClick={() => performSearch("general", selectedRegion)}>
                🔍 Find General Doctors
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Emergency & Disclaimer */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="gradient-warm border-red-200">
            <CardContent className="pt-6">
              <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                🚨 Emergency Services
              </h3>
              <p className="text-sm text-red-700">
                For medical emergencies, call <strong>108</strong> (National Ambulance) or <strong>102</strong> (Free Ambulance). 
                Don't wait - seek immediate help for chest pain, breathing difficulty, severe bleeding, or unconsciousness.
              </p>
            </CardContent>
          </Card>
          
          <Card className="gradient-sage border-primary/20">
            <CardContent className="pt-6">
              <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                ⚠️ Medical Disclaimer
              </h3>
              <p className="text-sm text-primary">
                Listed doctors are for reference only. Always verify credentials and current availability. 
                NaniCure helps you find healthcare providers but is not responsible for medical services quality.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorConnectPage;