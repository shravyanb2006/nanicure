import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Upload, User, Stethoscope, Phone, Clock, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DoctorFormData {
  // Basic Info
  fullName: string;
  gender: string;
  age: string;
  profilePicture: File | null;
  
  // Professional Details
  qualification: string;
  specialization: string;
  experience: string;
  registrationNumber: string;
  hospitalName: string;
  
  // Contact Information
  mobile: string;
  email: string;
  clinicAddress: string;
  
  // Availability & Services
  workingHours: string;
  consultationModes: string[];
  
  // Authentication & Uploads
  governmentId: File | null;
  medicalCertificate: File | null;
  clinicProof: File | null;
}

const DoctorRegistrationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<DoctorFormData>({
    fullName: "",
    gender: "",
    age: "",
    profilePicture: null,
    qualification: "",
    specialization: "",
    experience: "",
    registrationNumber: "",
    hospitalName: "",
    mobile: "",
    email: "",
    clinicAddress: "",
    workingHours: "",
    consultationModes: [],
    governmentId: null,
    medicalCertificate: null,
    clinicProof: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof DoctorFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileChange = (field: keyof DoctorFormData, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleConsultationModeChange = (mode: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      consultationModes: checked 
        ? [...prev.consultationModes, mode]
        : prev.consultationModes.filter(m => m !== mode)
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Basic Info
        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        if (!formData.age || parseInt(formData.age) < 18) newErrors.age = "Valid age is required (18+)";
        break;

      case 2: // Professional Details
        if (!formData.qualification.trim()) newErrors.qualification = "Qualification is required";
        if (!formData.specialization) newErrors.specialization = "Specialization is required";
        if (!formData.experience || parseInt(formData.experience) < 0) newErrors.experience = "Experience is required";
        if (!formData.registrationNumber.trim()) newErrors.registrationNumber = "Registration number is required";
        if (!formData.hospitalName.trim()) newErrors.hospitalName = "Hospital/Clinic name is required";
        break;

      case 3: // Contact Information
        if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
          newErrors.mobile = "Valid 10-digit mobile number is required";
        }
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Valid email is required";
        }
        if (!formData.clinicAddress.trim()) newErrors.clinicAddress = "Clinic address is required";
        break;

      case 4: // Availability & Services
        if (!formData.workingHours.trim()) newErrors.workingHours = "Working hours are required";
        if (formData.consultationModes.length === 0) {
          newErrors.consultationModes = "At least one consultation mode is required";
        }
        break;

      case 5: // Documents
        if (!formData.governmentId) newErrors.governmentId = "Government ID is required";
        if (!formData.medicalCertificate) newErrors.medicalCertificate = "Medical certificate is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "शाबाश बेटा! 🌸",
        description: "Doctor registration successful! Welcome to NaniCure family. We'll review your documents and contact you soon.",
      });
      
      navigate("/doctor-connect");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error processing your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Basic Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Dr. Your Full Name"
                  className={errors.fullName ? "border-destructive" : ""}
                />
                {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className={errors.gender ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-sm text-destructive">{errors.gender}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange("age", e.target.value)}
                  placeholder="Your age"
                  min="18"
                  className={errors.age ? "border-destructive" : ""}
                />
                {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="profilePicture">Profile Picture (Optional)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange("profilePicture", e.target.files?.[0] || null)}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Stethoscope className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Professional Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="qualification">Qualification *</Label>
                <Input
                  id="qualification"
                  value={formData.qualification}
                  onChange={(e) => handleInputChange("qualification", e.target.value)}
                  placeholder="MBBS, MD, BAMS, etc."
                  className={errors.qualification ? "border-destructive" : ""}
                />
                {errors.qualification && <p className="text-sm text-destructive">{errors.qualification}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization *</Label>
                <Select value={formData.specialization} onValueChange={(value) => handleInputChange("specialization", value)}>
                  <SelectTrigger className={errors.specialization ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select Specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Medicine</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="gynecology">Gynecology</SelectItem>
                    <SelectItem value="ayurveda">Ayurveda</SelectItem>
                    <SelectItem value="homeopathy">Homeopathy</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.specialization && <p className="text-sm text-destructive">{errors.specialization}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience *</Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  placeholder="Years of practice"
                  min="0"
                  className={errors.experience ? "border-destructive" : ""}
                />
                {errors.experience && <p className="text-sm text-destructive">{errors.experience}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Medical Registration Number *</Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => handleInputChange("registrationNumber", e.target.value)}
                  placeholder="Medical Council Registration Number"
                  className={errors.registrationNumber ? "border-destructive" : ""}
                />
                {errors.registrationNumber && <p className="text-sm text-destructive">{errors.registrationNumber}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="hospitalName">Hospital/Clinic Name *</Label>
                <Input
                  id="hospitalName"
                  value={formData.hospitalName}
                  onChange={(e) => handleInputChange("hospitalName", e.target.value)}
                  placeholder="Name of affiliated hospital or clinic"
                  className={errors.hospitalName ? "border-destructive" : ""}
                />
                {errors.hospitalName && <p className="text-sm text-destructive">{errors.hospitalName}</p>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Phone className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Contact Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={errors.mobile ? "border-destructive" : ""}
                />
                {errors.mobile && <p className="text-sm text-destructive">{errors.mobile}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="clinicAddress">Clinic Address *</Label>
                <textarea
                  id="clinicAddress"
                  value={formData.clinicAddress}
                  onChange={(e) => handleInputChange("clinicAddress", e.target.value)}
                  placeholder="Complete address of your clinic/practice"
                  className={`w-full px-3 py-2 border rounded-md resize-none h-20 ${errors.clinicAddress ? "border-destructive" : "border-input"}`}
                />
                {errors.clinicAddress && <p className="text-sm text-destructive">{errors.clinicAddress}</p>}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Availability & Services</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workingHours">Working Hours *</Label>
                <Input
                  id="workingHours"
                  value={formData.workingHours}
                  onChange={(e) => handleInputChange("workingHours", e.target.value)}
                  placeholder="e.g., Mon-Fri: 9 AM - 6 PM, Sat: 9 AM - 2 PM"
                  className={errors.workingHours ? "border-destructive" : ""}
                />
                {errors.workingHours && <p className="text-sm text-destructive">{errors.workingHours}</p>}
              </div>

              <div className="space-y-2">
                <Label>Consultation Modes Available * {errors.consultationModes && <span className="text-destructive text-sm">({errors.consultationModes})</span>}</Label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: "in-person", label: "In-person Consultation" },
                    { id: "video", label: "Video Call" },
                    { id: "phone", label: "Phone Call" },
                    { id: "home-visit", label: "Home Visit" }
                  ].map((mode) => (
                    <div key={mode.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={mode.id}
                        checked={formData.consultationModes.includes(mode.id)}
                        onCheckedChange={(checked) => handleConsultationModeChange(mode.id, !!checked)}
                      />
                      <Label htmlFor={mode.id} className="text-sm font-normal">
                        {mode.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">Document Verification</h3>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="governmentId">Government ID (Aadhaar/PAN/Passport) *</Label>
                <Input
                  id="governmentId"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange("governmentId", e.target.files?.[0] || null)}
                  className={`file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 ${errors.governmentId ? "border-destructive" : ""}`}
                />
                {errors.governmentId && <p className="text-sm text-destructive">{errors.governmentId}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalCertificate">Medical Council Certificate *</Label>
                <Input
                  id="medicalCertificate"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange("medicalCertificate", e.target.files?.[0] || null)}
                  className={`file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 ${errors.medicalCertificate ? "border-destructive" : ""}`}
                />
                {errors.medicalCertificate && <p className="text-sm text-destructive">{errors.medicalCertificate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="clinicProof">Clinic Proof (Optional)</Label>
                <Input
                  id="clinicProof"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange("clinicProof", e.target.files?.[0] || null)}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
                <p className="text-sm text-muted-foreground">License or proof of clinic ownership/affiliation</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background indian-motifs">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/doctor-connect')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Doctor Connect
          </Button>
          
          <div className="lotus-divider mb-8">
            <span>🌸</span>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="calligraphy-title text-4xl mb-2 text-primary">
              Doctor Registration
            </h1>
            <p className="nani-description text-lg">
              Join the NaniCure family and help heal with traditional wisdom
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-smooth ${
                  step <= currentStep 
                    ? 'bg-primary text-primary-foreground shadow-glow' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-smooth" 
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Basic Info</span>
            <span>Professional</span>
            <span>Contact</span>
            <span>Availability</span>
            <span>Documents</span>
          </div>
        </div>

        <Card className="shadow-warm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Step {currentStep} of 5
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {renderStepContent()}
            
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 5 ? (
                <Button
                  onClick={nextStep}
                  className="btn-nani"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="btn-nani"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="thinking-dots">
                        <span></span><span></span><span></span>
                      </div>
                      Submitting...
                    </div>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Submit Registration
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorRegistrationPage;