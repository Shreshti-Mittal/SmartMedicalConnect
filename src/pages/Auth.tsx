
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    date_of_birth: '',
    gender: '',
    phone: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    insurance_info: {}
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signIn(loginData.email, loginData.password);
      
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Login Successful",
          description: "Welcome back to SmartMedConnect!"
        });
        navigate('/existing-patient');
      }
    } catch (error: any) {
      toast({
        title: "Login Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await signUp(
        signupData.email,
        signupData.password,
        {
          full_name: signupData.full_name,
          date_of_birth: signupData.date_of_birth,
          gender: signupData.gender,
          phone: signupData.phone,
          emergency_contact_name: signupData.emergency_contact_name,
          emergency_contact_phone: signupData.emergency_contact_phone,
          insurance_info: signupData.insurance_info
        }
      );
      
      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Registration Successful",
          description: "Welcome to SmartMedConnect! Please check your email to verify your account."
        });
        navigate('/existing-patient');
      }
    } catch (error: any) {
      toast({
        title: "Registration Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white hover:bg-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-white flex items-center justify-center">
                <User className="w-8 h-8 mr-3" />
                PATIENT AUTHENTICATION
              </h1>
              <p className="text-blue-100 mt-2">Secure access to your medical profile</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="p-8">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Welcome Back</h2>
                  <p className="text-gray-600">Sign in to access your medical profile</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Create Account</h2>
                  <p className="text-gray-600">Join SmartMedConnect today</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input
                      id="full-name"
                      placeholder="Enter your full name"
                      value={signupData.full_name}
                      onChange={(e) => setSignupData({...signupData, full_name: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={signupData.date_of_birth}
                        onChange={(e) => setSignupData({...signupData, date_of_birth: e.target.value})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select onValueChange={(value) => setSignupData({...signupData, gender: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={signupData.phone}
                      onChange={(e) => setSignupData({...signupData, phone: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergency-name">Emergency Contact Name</Label>
                    <Input
                      id="emergency-name"
                      placeholder="Emergency contact name"
                      value={signupData.emergency_contact_name}
                      onChange={(e) => setSignupData({...signupData, emergency_contact_name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergency-phone">Emergency Contact Phone</Label>
                    <Input
                      id="emergency-phone"
                      type="tel"
                      placeholder="Emergency contact phone"
                      value={signupData.emergency_contact_phone}
                      onChange={(e) => setSignupData({...signupData, emergency_contact_phone: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Create a password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

export default Auth;
