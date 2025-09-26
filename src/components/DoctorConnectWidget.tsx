import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Phone, Mail, MapPin, Search } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  contact: string;
  email: string;
  region: string;
  experience: string;
}

interface DoctorConnectWidgetProps {
  userRegion: string;
}

export function DoctorConnectWidget({ userRegion }: DoctorConnectWidgetProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendations, setRecommendations] = useState<Doctor[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const doctorDatabase: Doctor[] = [
    // North India Doctors
    { id: '1', name: 'Dr. Rajesh Kumar', specialty: 'General Medicine', contact: '+91-9876543210', email: 'rajesh@clinic.com', region: 'north', experience: '15 years' },
    { id: '2', name: 'Dr. Priya Sharma', specialty: 'Pediatrics', contact: '+91-9876543211', email: 'priya@hospital.com', region: 'north', experience: '12 years' },
    { id: '3', name: 'Dr. Amit Singh', specialty: 'Cardiology', contact: '+91-9876543212', email: 'amit@heart.com', region: 'north', experience: '18 years' },
    { id: '4', name: 'Dr. Neha Gupta', specialty: 'Dermatology', contact: '+91-9876543213', email: 'neha@skin.com', region: 'north', experience: '10 years' },
    { id: '5', name: 'Dr. Suresh Aggarwal', specialty: 'Orthopedics', contact: '+91-9876543214', email: 'suresh@bones.com', region: 'north', experience: '20 years' },

    // South India Doctors  
    { id: '6', name: 'Dr. Venkatesh Iyer', specialty: 'General Medicine', contact: '+91-9876543215', email: 'venkatesh@clinic.com', region: 'south', experience: '14 years' },
    { id: '7', name: 'Dr. Lakshmi Nair', specialty: 'Gynecology', contact: '+91-9876543216', email: 'lakshmi@women.com', region: 'south', experience: '16 years' },
    { id: '8', name: 'Dr. Ravi Kumar', specialty: 'Neurology', contact: '+91-9876543217', email: 'ravi@neuro.com', region: 'south', experience: '22 years' },
    { id: '9', name: 'Dr. Meera Reddy', specialty: 'Endocrinology', contact: '+91-9876543218', email: 'meera@diabetes.com', region: 'south', experience: '13 years' },
    { id: '10', name: 'Dr. Krishnan Pillai', specialty: 'Gastroenterology', contact: '+91-9876543219', email: 'krishnan@gastro.com', region: 'south', experience: '17 years' },

    // East India Doctors
    { id: '11', name: 'Dr. Debashis Roy', specialty: 'General Medicine', contact: '+91-9876543220', email: 'debashis@clinic.com', region: 'east', experience: '19 years' },
    { id: '12', name: 'Dr. Sujata Sen', specialty: 'Psychiatry', contact: '+91-9876543221', email: 'sujata@mind.com', region: 'east', experience: '11 years' },
    { id: '13', name: 'Dr. Anirban Das', specialty: 'Pulmonology', contact: '+91-9876543222', email: 'anirban@lung.com', region: 'east', experience: '15 years' },
    { id: '14', name: 'Dr. Rina Chatterjee', specialty: 'Ophthalmology', contact: '+91-9876543223', email: 'rina@eye.com', region: 'east', experience: '12 years' },
    { id: '15', name: 'Dr. Subir Ghosh', specialty: 'Urology', contact: '+91-9876543224', email: 'subir@kidney.com', region: 'east', experience: '21 years' },

    // West India Doctors
    { id: '16', name: 'Dr. Kiran Patel', specialty: 'General Medicine', contact: '+91-9876543225', email: 'kiran@clinic.com', region: 'west', experience: '16 years' },
    { id: '17', name: 'Dr. Anjali Desai', specialty: 'Rheumatology', contact: '+91-9876543226', email: 'anjali@joints.com', region: 'west', experience: '14 years' },
    { id: '18', name: 'Dr. Mahesh Shah', specialty: 'Oncology', contact: '+91-9876543227', email: 'mahesh@cancer.com', region: 'west', experience: '25 years' },
    { id: '19', name: 'Dr. Kavita Joshi', specialty: 'ENT', contact: '+91-9876543228', email: 'kavita@throat.com', region: 'west', experience: '13 years' },
    { id: '20', name: 'Dr. Vikram Mehta', specialty: 'Plastic Surgery', contact: '+91-9876543229', email: 'vikram@plastic.com', region: 'west', experience: '18 years' },

    // Central India Doctors
    { id: '21', name: 'Dr. Ashok Tiwari', specialty: 'General Medicine', contact: '+91-9876543230', email: 'ashok@clinic.com', region: 'central', experience: '17 years' },
    { id: '22', name: 'Dr. Sunita Verma', specialty: 'Pediatrics', contact: '+91-9876543231', email: 'sunita@children.com', region: 'central', experience: '12 years' },
    { id: '23', name: 'Dr. Ramesh Yadav', specialty: 'General Surgery', contact: '+91-9876543232', email: 'ramesh@surgery.com', region: 'central', experience: '20 years' },
    { id: '24', name: 'Dr. Geeta Agrawal', specialty: 'Radiology', contact: '+91-9876543233', email: 'geeta@scan.com', region: 'central', experience: '15 years' },
    { id: '25', name: 'Dr. Manoj Dubey', specialty: 'Anesthesiology', contact: '+91-9876543234', email: 'manoj@anesthesia.com', region: 'central', experience: '14 years' },
  ];

  const generateRecommendations = (problem: string) => {
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let filtered = doctorDatabase.filter(doc => doc.region === userRegion);
      
      // If we have a specific problem, prioritize relevant specialists
      const problem_lower = problem.toLowerCase();
      if (problem_lower.includes('heart') || problem_lower.includes('chest pain')) {
        filtered = filtered.sort((a, b) => a.specialty === 'Cardiology' ? -1 : 1);
      } else if (problem_lower.includes('skin') || problem_lower.includes('rash')) {
        filtered = filtered.sort((a, b) => a.specialty === 'Dermatology' ? -1 : 1);
      } else if (problem_lower.includes('child') || problem_lower.includes('baby')) {
        filtered = filtered.sort((a, b) => a.specialty === 'Pediatrics' ? -1 : 1);
      } else if (problem_lower.includes('mental') || problem_lower.includes('depression')) {
        filtered = filtered.sort((a, b) => a.specialty === 'Psychiatry' ? -1 : 1);
      } else if (problem_lower.includes('eye') || problem_lower.includes('vision')) {
        filtered = filtered.sort((a, b) => a.specialty === 'Ophthalmology' ? -1 : 1);
      }
      
      // Always include at least one general medicine doctor
      const generalDocs = filtered.filter(doc => doc.specialty === 'General Medicine');
      const specialists = filtered.filter(doc => doc.specialty !== 'General Medicine');
      
      const final = [...generalDocs.slice(0, 2), ...specialists.slice(0, 3)].slice(0, 5);
      
      setRecommendations(final);
      setIsSearching(false);
    }, 1000);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    generateRecommendations(searchTerm);
  };

  return (
    <Card className="widget-card h-96">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-primary" />
          Doctor Connect
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Find trusted doctors in your region based on your health concern
        </p>
      </CardHeader>
      
      <CardContent className="flex flex-col h-full pb-4">
        <div className="space-y-4 mb-4">
          <div className="flex gap-2">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Describe your health concern..."
              className="flex-1"
              disabled={isSearching}
            />
            <Button onClick={handleSearch} disabled={isSearching || !searchTerm.trim()}>
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {userRegion && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Showing doctors in {userRegion.charAt(0).toUpperCase() + userRegion.slice(1)} India
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-3">
          {isSearching ? (
            <div className="text-center py-8">
              <div className="thinking-dots justify-center mb-4">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p className="text-sm text-muted-foreground">Finding the best doctors for you...</p>
            </div>
          ) : recommendations.length > 0 ? (
            recommendations.map((doctor) => (
              <Card key={doctor.id} className="p-3 border shadow-sm hover:shadow-md transition-smooth">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-sm text-primary">{doctor.name}</h4>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {doctor.specialty}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{doctor.experience}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <Phone className="h-3 w-3 text-primary" />
                      <span>{doctor.contact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Mail className="h-3 w-3 text-primary" />
                      <span>{doctor.email}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-8">
              <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground">
                Describe your health concern to get personalized doctor recommendations
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Nani will suggest the best doctors in your region
              </p>
            </div>
          )}
        </div>
        
        {recommendations.length > 0 && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              💛 Remember beta, these doctors are suggestions based on your region. 
              Always verify credentials and book appointments directly.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}