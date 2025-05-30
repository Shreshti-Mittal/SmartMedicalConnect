# Smart Medical Connect 🏥
*Universal Healthcare Platform for Seamless Medical Record Management*

🌐 **Live Demo**: [https://smart-medical-connect.vercel.app/](https://smart-medical-connect.vercel.app/)

## Problem Statement

Healthcare systems worldwide face critical challenges that SmartMedConnect solves:

### 🚨 **Critical Issues Addressed:**
- **Medical Records Fragmentation**: Patient records are scattered across different hospitals, leading to incomplete care
- **Emergency Care Delays**: Critical time lost accessing patient history during life-threatening emergencies  
- **Accessibility Barriers**: Limited solutions for patients with literacy challenges or disabilities
- **Universal Access Gap**: No unified platform for seamless healthcare across different institutions
- **Cross-Hospital Communication**: Poor information flow between healthcare providers
- **Emergency Patient Identification**: Difficulty accessing medical history for unconscious patients

## Approach & Solution

SmartMedConnect is a revolutionary healthcare platform that creates a **universal patient identity system**, enabling instant medical record access across all healthcare providers through innovative QR code technology.

### 🎯 **Core Innovation**
- **QR Code-Based Patient Identification**: Instant access to complete medical history with a simple scan
- **Emergency-Ready Architecture**: Designed to work even when patients are unconscious or unable to communicate
- **Voice-First Accessibility**: Built-in voice input supports patients with literacy challenges
- **Cross-Hospital Continuity**: Medical records seamlessly follow patients across any healthcare facility
- **Dual Interface System**: Separate optimised interfaces for patients and hospital staff

## Features

### 🔐 **Patient Portal** - Complete Health Management
- ✅ **Secure Registration & Authentication** - Protected patient data access
- ✅ **Comprehensive Profile Management** - Medical history, allergies, emergency contacts, medications
- ✅ **Voice Input Support** - Accessibility features for patients with literacy challenges  
- ✅ **Medical Document Upload & Storage** - Secure cloud storage for prescriptions, test results, reports
- ✅ **QR Code Generation** - Unique patient QR codes for instant hospital access
- ✅ **Emergency Patient Registration** - System for unconscious/unresponsive patients
- ✅ **Personal Health Dashboard** - Complete overview of medical information
- ✅ **Cross-Platform Access** - Works on mobile, tablet, and desktop devices

### 🏥 **Hospital Staff Dashboard** - Professional Medical Interface  
- ✅ **QR Code Scanner Interface** - Camera-based patient lookup system
- ✅ **Manual Patient Search** - Search by name, ID, or emergency contact
- ✅ **Complete Patient Profile Access** - Full medical history, documents, allergies, medications
- ✅ **Treatment Notes Management** - Add, update, and manage patient treatment records
- ✅ **Emergency Patient Management** - Specialized interface for critical cases
- ✅ **Cross-Hospital Record Access** - View complete medical history from any healthcare provider
- ✅ **Professional Healthcare UI** - Designed specifically for medical staff workflow
- ✅ **Real-time Updates** - Live synchronization across all hospital systems

### 🚨 **Emergency Management System** - Life-Saving Features
- ✅ **Unconscious Patient Support** - Emergency contacts can register patients remotely
- ✅ **Instant Medical History Access** - Critical patient information via QR code scanning
- ✅ **Critical Information Display** - Prominent display of allergies, chronic conditions, emergency contacts
- ✅ **Emergency Contact Integration** - Automatic notification system for patient families
- ✅ **Multi-Hospital Coordination** - Seamless patient handoff between healthcare facilities
- ✅ **Rapid Response Interface** - Streamlined UI for emergency situations

## Tech Stack

### 🎨 **Frontend Development**
- **React.js** - Modern component-based UI framework
- **JavaScript (ES6+)** - Latest ECMAScript features and syntax
- **CSS3 & Responsive Design** - Mobile-first, cross-device compatibility
- **HTML5** - Semantic markup and modern web standards

### 🔧 **Web APIs & Integration**
- **Web Speech API** - Voice input and accessibility features
- **QR Code Generation** - Dynamic QR code creation and management
- **Camera API** - QR code scanning functionality for hospital staff
- **File Upload API** - Medical document storage and retrieval

### 🗄️ **Backend & Database**
- **Supabase** - Complete Backend-as-a-Service platform
- **PostgreSQL** - Robust, ACID-compliant relational database
- **Supabase Realtime** - Live data synchronisation across all clients
- **Row Level Security (RLS)** - HIPAA-compliant data protection

### 🔐 **Authentication & Security**
- **Supabase Auth** - Secure user authentication and session management
- **JWT Tokens** - Stateless authentication with automatic token refresh
- **Bcrypt Password Hashing** - Secure credential storage
- **Role-based Access Control** - Separate permissions for patients and hospital staff

### 📁 **File Storage & Management**
- **Supabase Storage** - Secure, scalable medical document storage
- **Multi-format Support** - Handle various document types (PDF, images, etc.)
- **Access Control Policies** - Protected medical document access
- **CDN Integration** - Fast, global file delivery

### 🚀 **Deployment & Infrastructure**
- **Vercel** - Modern web deployment platform
- **Git Integration** - Continuous deployment from GitHub
- **Edge Network** - Global CDN for optimal performance
- **HTTPS/SSL** - Secure data transmission

### 📊 **Database Schema Design**
- **patients** - Comprehensive user profiles and medical information
- **emergency_patients** - Emergency registration and unconscious patient system
- **medical_documents** - File storage references and metadata
- **hospital_visits** - Treatment history and cross-hospital tracking
- **staff_users** - Hospital staff management and authentication

## Live Demo & Testing

🌐 **Live Website**: [https://smart-medical-connect.vercel.app/](https://smart-medical-connect.vercel.app/)
📱 **Fully Responsive**: Optimised for mobile, tablet, and desktop devices
⚡ **Real-time Features**: Live data synchronisation across all interfaces

### 🧪 **Test the Platform:**
1. **Create Patient Account** - Register as a new patient and explore the dashboard
2. **Emergency Registration** - Test the emergency patient registration system
3. **QR Code Generation** - Generate your patient QR code
4. **Hospital Staff Access** - Switch to the hospital dashboard and scan QR codes
5. **Voice Input** - Try the accessibility voice input features
6. **Document Upload** - Test medical document storage and retrieval

### 👥 **Demo Accounts** (Optional):
- **Patient Demo**: Create your account to test full functionality
- **Hospital Staff**: Use the hospital dashboard with any generated patient QR code

## Screenshots

### 🏠 **Patient Dashboard**
*Complete patient profile management with medical history, documents, and QR code generation*

![image](https://github.com/user-attachments/assets/103d10cb-4dd9-4003-bfc0-e96c7a9c060b)


### 🏥 **Hospital Staff Interface**  
![image](https://github.com/user-attachments/assets/a67d4799-e839-4cca-a391-cfd4b681e8bd)

*Professional medical staff interface with QR scanning and patient lookup capabilities*

### 📱 **QR Code System**
![image](https://github.com/user-attachments/assets/0637fc71-6e72-471f-8220-538300a9eaf9)

*Dynamic QR code generation for patients and scanning interface for hospital staff*

### 🚨 **Emergency Management**
![image](https://github.com/user-attachments/assets/936f9b5b-1dd8-4632-a790-ae5a08d51ed8)

*Specialised emergency patient registration and critical information access*

### 📄 **Document Management**
![image](https://github.com/user-attachments/assets/692afe38-4dcc-4b45-b33b-2066ed793eff)

*Secure medical document upload, storage, and retrieval system*


## Installation & Run Instructions

### 📋 **Prerequisites**
```bash
Node.js (v16.0.0 or higher)
npm (v7.0.0 or higher) or yarn (v1.22.0 or higher)
Git (for cloning the repository)
Modern web browser (Chrome, Firefox, Safari, Edge)
```

### 🚀 **Quick Start - Local Development**

#### 1. **Clone the Repository**
```bash
git clone https://github.com/[Shrshti-Mittal]/smartmedconnect.git
cd smartmedconnect
```

#### 2. **Install Dependencies**
```bash
# Using npm
npm install

# Or using yarn  
yarn install
```

#### 3. **Environment Setup**
```bash
# Create environment file
cp .env.example .env.local

# Add your Supabase credentials to .env.local:
NEXT_PUBLIC_SUPABASE_URL=https://squzevnsyszajkkfzgub.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxdXpldm5zeXN6YWpra2Z6Z3ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxOTkwMjgsImV4cCI6MjA2Mzc3NTAyOH0.cYG9ymQuOj_hxiiPKEKfUQ4P5U_dSC5NpVxYk5Ge8Fc
```

#### 4. **Start Development Server**
```bash
# Using npm
npm run dev

# Or using yarn
yarn dev

# Application will be available at:
# http://localhost:3000
```

#### 5. **Access the Application**
- Open your browser and navigate to `http://localhost:3000`
- Create a new patient account or explore the hospital staff dashboard
- Test QR code generation and scanning features

### 🌐 **Production Deployment**

#### **Vercel Deployment** (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod

# Follow the prompts to configure your deployment
```


### 🔧 **Environment Variables**
```env
# Required Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://squzevnsyszajkkfzgub.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxdXpldm5zeXN6YWpra2Z6Z3ViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxOTkwMjgsImV4cCI6MjA2Mzc3NTAyOH0.cYG9ymQuOj_hxiiPKEKfUQ4P5U_dSC5NpVxYk5Ge8Fc


### 🧪 **Testing the Application**
```bash
# Run in development mode
npm run dev

# Build production version
npm run build

# Start production server locally
npm start

# Run tests (if implemented)
npm test
```

### 📱 **Browser Compatibility**
- ✅ Chrome 70+
- ✅ Firefox 65+  
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### ⚠️ **Important Notes**
- Ensure your Supabase project has the correct RLS policies configured
- Camera access required for QR code scanning (hospital staff features)
- Microphone access required for voice input features
- HTTPS is required for camera and microphone access in production

## Database Schema

### Core Tables
- **patients** - User profiles and medical information
- **emergency_patients** - Emergency registration system
- **medical_documents** - File storage references
- **hospital_visits** - Treatment history tracking
- **staff_users** - Hospital staff management

## Security & Compliance

- **HIPAA Considerations** - Secure data handling practices
- **Data Encryption** - All sensitive data encrypted
- **Access Controls** - Role-based permissions
- **Audit Logging** - Track all data access and modifications

## Impact & Use Cases

### Primary Benefits
1. **Reduced Emergency Response Time** - Instant access to critical medical information
2. **Improved Care Continuity** - Complete medical history across all providers
3. **Enhanced Accessibility** - Voice input for diverse patient populations
4. **Universal Healthcare Access** - Works across any hospital or clinic

### Target Users
- **Patients** - Centralized medical record management
- **Emergency Responders** - Critical information access
- **Hospital Staff** - Streamlined patient lookup and care
- **Healthcare Systems** - Improved operational efficiency

## Future Enhancements

- **Multi-language Support** - Serve diverse populations
- **Insurance Integration** - Direct claims processing
- **Telemedicine Features** - Remote consultation capabilities
- **AI-Powered Insights** - Predictive health analytics
- **Blockchain Integration** - Immutable medical records

## Contact & Support

**Developer**: Shreshti Mittal
**Email**: shreshti19@gmail.com
**Project Link**: [https://github.com/your-username/smartmedconnect](https://github.com/your-username/smartmedconnect)

---

## Acknowledgments

Special thanks to the healthcare professionals who provided insights into real-world healthcare challenges and workflow requirements.

---

*SmartMedConnect - Connecting Healthcare, Saving Lives* 🏥💙
