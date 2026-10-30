import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  personal: {
    name: "Latheesh K",
    headline: "MCA Graduate | Web Developer | IT Support Specialist",
    roles: [
      "Full-Stack Web Developer",
      "MCA Graduate (VCET)",
      "IT Support Specialist",
      "AI & ML Enthusiast",
      "Software Systems Engineer"
    ],
    bioShort: "A motivated computer applications graduate based in Puttur, Karnataka. Specializing in modern full-stack web applications, database management, technical troubleshooting, and enterprise system support.",
    bioLong: [
      "I am an ambitious Master of Computer Applications (MCA) graduate from Vivekananda College of Engineering and Technology (VCET), Puttur, with a deep passion for designing performant, clean web solutions and resolving complex IT architectures.",
      "With specialized knowledge in database administration, software troubleshooting, computer networking (LAN/Wi-Fi diagnostics), and hands-on exposure to Machine Learning integration during my 3-month internship at Zephyr Technologies, I bridge the gap between software engineering and IT infrastructure reliability.",
      "Actively seeking an entry-level IT Executive, Web Developer, or Software Support Executive position to construct robust digital experiences and provide dependable technical operations."
    ],
    location: "Puttur, Karnataka, India",
    email: "latheeshacharya6456@gmail.com",
    phone: "+91-7736989322",
    github: "https://github.com/Latheeshk9322/portfolio-",
    linkedin: "https://linkedin.com",
    resumePdf: "/assets/latheesh_k_resume.pdf", // served from public/assets
    profilePhoto: "/assets/Latheesh_image.jpg",
    availability: "Available immediately for full-time on-site or remote roles",
  },

  stats: [
    {
      id: "projects",
      value: 8,
      suffix: "+",
      label: "Projects Completed",
      icon: "Terminal",
    },
    {
      id: "hackathons",
      value: 2,
      suffix: "",
      label: "Hackathon Wins",
      icon: "Trophy",
    },
    {
      id: "kscst",
      value: 1,
      suffix: " State",
      label: "KSCST State Selection",
      icon: "Award",
    },
    {
      id: "internship",
      value: 3,
      suffix: " Mos",
      label: "AI/ML Industry Internship",
      icon: "Briefcase",
    },
  ],

  skillsCategories: [
    {
      id: "languages-web",
      name: "Languages & Web Development",
      command: "npm install @latheesh/web-stack",
      icon: "Code2",
      skills: [
        { name: "JavaScript & React.js", level: 85, description: "Component state, hooks, virtual DOM, modern ES6+" },
        { name: "HTML5 / CSS3 / Tailwind", level: 90, description: "Semantic markup, responsive layouts, glassmorphism, flexbox/grid" },
        { name: "Python", level: 80, description: "Data manipulation, ML scripting, Flask APIs, automation" },
        { name: "Java", level: 75, description: "Object-oriented programming, Collections, Swing/GUI, JDBC" },
        { name: "PHP", level: 70, description: "Server-side scripting, form processing, session management" },
      ],
      chips: ["TypeScript", "REST APIs", "Vite", "Responsive Design", "JSON/AJAX"],
    },
    {
      id: "databases-tools",
      name: "Databases & Development Tools",
      command: "brew install @latheesh/dev-tools",
      icon: "Database",
      skills: [
        { name: "MySQL", level: 85, description: "Relational schema design, complex joins, indexing, query optimization" },
        { name: "PostgreSQL & MongoDB", level: 70, description: "Document stores, relational queries, migrations" },
        { name: "Git & GitHub", level: 85, description: "Branching workflows, PRs, merge conflict resolution, CI/CD" },
        { name: "VS Code & Tooling", level: 90, description: "Debugging, extensions, snippet authoring, linting" },
      ],
      chips: ["Git", "GitHub", "VS Code", "MS Excel", "Postman", "pgAdmin", "XAMPP"],
    },
    {
      id: "it-support-os",
      name: "IT Support & System Infrastructure",
      command: "sudo systemctl status it-support.service",
      icon: "Wrench",
      skills: [
        { name: "System & Hardware Troubleshooting", level: 90, description: "Hardware diagnostics, driver conflicts, crash dump analysis" },
        { name: "Software Installations & Configuration", level: 88, description: "Enterprise app rollouts, environment variables, licenses" },
        { name: "LAN / Wi-Fi & Network Diagnostics", level: 82, description: "TCP/IP, subnetting, DNS/DHCP, router config, ping/traceroute" },
        { name: "Windows OS Administration", level: 92, description: "Registry tweaks, services, event viewer, group policies" },
        { name: "Linux OS (CLI Basics)", level: 75, description: "Bash navigation, permissions, package management (apt/yum)" },
      ],
      chips: [
        "LAN/Wi-Fi Diagnostics",
        "User Technical Support",
        "Internet Troubleshooting",
        "Driver Installation",
        "Windows 10/11 Pro",
        "Ubuntu CLI",
      ],
    },
  ],

  timeline: [
    {
      id: "mca-vcet",
      type: "education",
      period: "2023 – 2025",
      title: "Master of Computer Applications (MCA)",
      organization: "Vivekananda College of Engineering and Technology (VCET)",
      location: "Puttur, Karnataka",
      badge: "Postgraduate Degree",
      commitHash: "c0mm1t_mca25",
      commitMessage: "feat(academic): complete MCA with distinction in enterprise software & networks",
      description: "Advanced training in relational and non-relational database architectures, distributed web systems, software testing methodology, enterprise routing protocols, and mobile application frameworks.",
      highlights: [
        "Specialized in full-stack web architecture, database management, and network security protocols.",
        "Winner of VCET College Code-A-Thon competitive programming contest.",
        "Demonstrated state-level IoT innovation selected by Karnataka State Council for Science and Technology (KSCST).",
        "Organized tech symposiums and academic seminars on modern software paradigms."
      ],
      techUsed: ["Java", "Python", "React", "MySQL", "Computer Networks", "Software Testing"],
    },
    {
      id: "internship-zephyr",
      type: "experience",
      period: "Nov 2024 – Jan 2025 (3 Months)",
      title: "AI & ML Intern",
      organization: "Zephyr Technologies and Solutions Pvt Ltd",
      location: "Mangalore, Karnataka",
      badge: "Industry Internship",
      commitHash: "c0mm1t_zephyr",
      commitMessage: "feat(ml): deploy predictive regression pipelines and data balance optimizers",
      description: "Hands-on engineering exposure during an intensive corporate internship program focusing on real-world dataset processing and machine learning workflows.",
      highlights: [
        "Developed end-to-end Machine Learning prediction systems using Python, Pandas, NumPy, and Scikit-Learn.",
        "Performed data sanitation, feature extraction, outlier removal, and dataset re-balancing techniques.",
        "Configured and evaluated predictive regression models, validating precision metrics (RMSE, R2 score).",
        "Gained hands-on experience in cloud-based model integration workflows and model version control."
      ],
      techUsed: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Jupyter", "Git"],
    },
    {
      id: "bca-vcet",
      type: "education",
      period: "2020 – 2023",
      title: "Bachelor of Computer Applications (BCA)",
      organization: "Vivekananda College of Engineering and Technology (VCET)",
      location: "Puttur, Karnataka",
      badge: "Undergraduate Degree",
      commitHash: "c0mm1t_bca23",
      commitMessage: "feat(foundation): graduate BCA with solid mastery of OOP, C++, Java & SQL",
      description: "Graduated with comprehensive foundations in Object-Oriented Programming (C++, Java), web technology standards, computer organization & hardware architectures, and relational SQL management.",
      highlights: [
        "Built core competency in data structures, algorithms, and modular procedural code.",
        "Led multiple academic team software projects in Java Swing and PHP/MySQL.",
        "Awarded 1st place in VCET College ISRO Quiz competition for aerospace and tech awareness."
      ],
      techUsed: ["C++", "Java", "PHP", "MySQL", "HTML5", "CSS3", "JavaScript"],
    },
  ],

  projects: [
    {
      id: "smart-ppe-camera",
      title: "Smart PPE Compliance Camera",
      subtitle: "Real-time safety gear detection using micro-controllers & edge camera modules",
      category: "iot",
      categoryLabel: "IoT / Embedded",
      description: "Real-time safety compliance monitoring system using Arduino and ESP32-CAM. Captures worker safety gear compliance. Highlighted for the KSCST State-level Project Demonstration.",
      fullOverview: "A smart hardware-software embedded solution engineered to address workplace safety hazards in industrial and construction zones. The system uses an ESP32-CAM optical sensor interfaced with an Arduino microcontroller to capture video feeds, identify whether personnel on site are wearing mandatory protective equipment (helmets, vests, goggles), and trigger automated audit logs.",
      architectureDetails: [
        "Edge-layer camera module (ESP32-CAM) capturing 720p image frames at periodic inspection intervals.",
        "Serial communication link between ESP32 and Arduino master controller for trigger actuation.",
        "Local buzzer warning circuit and IoT web dashboard reporting real-time non-compliance breaches.",
        "Selected and exhibited for the Karnataka State Council for Science and Technology (KSCST) 47th Series Project Exhibition."
      ],
      features: [
        "Live edge video frame capture via ESP32-CAM module",
        "Automated worker PPE compliance threshold verification",
        "Immediate audio-visual alarm triggering upon violation",
        "Historical violation logging to local database table",
        "Low-power consumption circuit optimized for long operating shifts"
      ],
      techStack: ["Arduino", "ESP32-CAM", "Embedded C++", "IoT Sensors", "HTTP REST", "Hardware Prototyping"],
      award: "KSCST State Selection",
      isSpecialSelection: true,
      githubUrl: "https://github.com/Latheeshk9322/portfolio-",
      icon: "Video",
      codeSnippet: {
        filename: "ESP32_PPE_Detector.ino",
        language: "cpp",
        code: `// Smart PPE Compliance Camera - Capture & Edge Analysis
#include "esp_camera.h"
#include <WiFi.h>

#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define ALARM_PIN         13

void setup() {
  Serial.begin(115200);
  pinMode(ALARM_PIN, OUTPUT);
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = 5;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.frame_size = FRAMESIZE_VGA;
  config.jpeg_quality = 12;
  
  if (esp_camera_init(&config) != ESP_OK) {
    Serial.println("ERR: Camera init failed");
    return;
  }
  Serial.println("STATUS: Camera ready. Monitoring PPE compliance...");
}

void loop() {
  camera_fb_t * fb = esp_camera_fb_get();
  if(!fb) {
    Serial.println("ERR: Frame buffer capture failed");
    return;
  }
  // Inspect image frame against compliance classifier
  bool ppeDetected = evaluateSafetyGear(fb->buf, fb->len);
  if (!ppeDetected) {
    digitalWrite(ALARM_PIN, HIGH);
    sendSafetyAlertLog("CRITICAL: PPE Missing on Station A");
  } else {
    digitalWrite(ALARM_PIN, LOW);
  }
  esp_camera_fb_return(fb);
  delay(1500);
}`
      },
      fileTree: [
        "firmware/",
        "  ├── ESP32_PPE_Detector.ino",
        "  ├── camera_pins.h",
        "  └── alert_system.cpp",
        "hardware_schematics/",
        "  ├── circuit_diagram.pdf",
        "  └── bom_components.csv",
        "README.md"
      ]
    },

    {
      id: "cricket-score-prediction",
      title: "Cricket Score Prediction System",
      subtitle: "Machine learning forecasting model trained on historical match and player data",
      category: "ml-ai",
      categoryLabel: "ML / Data Science",
      description: "A Python-based Machine Learning prediction algorithm designed to process historical cricket matches and player metrics. Forecasts final first-innings scores in real-time.",
      fullOverview: "A data science model that analyzes pitch conditions, current run rate, overs completed, wickets lost, and batting line-up statistics to accurately predict expected first-innings scores in competitive T20/ODI cricket matches. Implemented regression algorithms with Scikit-learn, yielding high correlation scores against real match datasets.",
      architectureDetails: [
        "Data ingestion pipeline loading multi-year IPL and International match ball-by-ball records.",
        "Feature engineering computing rolling run-rates, partnership dynamics, and bowler economy in current spell.",
        "Model training benchmarking Linear Regression, Random Forest Regressor, and Gradient Boosting.",
        "Interactive dashboard interface built to simulate real-time live match scenarios."
      ],
      features: [
        "Multi-variable regression algorithm trained on 50,000+ match overs",
        "Real-time score trajectory updating as each wicket or over updates",
        "Comprehensive feature importance analysis highlighting match swing factors",
        "Evaluated via Root Mean Squared Error (RMSE) and R² validation scores"
      ],
      techStack: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib", "Seaborn", "Jupyter"],
      githubUrl: "https://github.com/Latheeshk9322/portfolio-",
      icon: "TrendingUp",
      codeSnippet: {
        filename: "predict_score.py",
        language: "python",
        code: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import r2_score, mean_absolute_error

def train_cricket_predictor(dataset_path: str):
    df = pd.read_csv(dataset_path)
    # Feature extraction: rolling runs, wickets in last 5 overs
    features = ['runs', 'wickets', 'overs', 'runs_last_5', 'wickets_last_5']
    X = df[features]
    y = df['total_first_innings_runs']

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = RandomForestRegressor(n_estimators=100, max_depth=12, random_state=42)
    model.fit(X_train, y_train)

    predictions = model.predict(X_test)
    print(f"Model R² Score: {r2_score(y_test, predictions):.4f}")
    print(f"Mean Absolute Error: {mean_absolute_error(y_test, predictions):.2f} runs")
    return model`
      },
      fileTree: [
        "data/",
        "  ├── raw_matches.csv",
        "  └── processed_features.parquet",
        "models/",
        "  ├── score_regressor.pkl",
        "  └── train_pipeline.py",
        "notebooks/",
        "  └── exploratory_data_analysis.ipynb",
        "predict_score.py"
      ]
    },

    {
      id: "travel-expense-split",
      title: "Travel Expense Split App",
      subtitle: "Dynamic group expense computation engine with automated settlement matrices",
      category: "web-dev",
      categoryLabel: "Web Dev",
      description: "A clean, dynamic web application designed to compute group travel expense allocations, complete with custom charts and SVG visualizations. Winner of VCET CODE-A-THON.",
      fullOverview: "A web utility built during the VCET Code-A-Thon competition that simplifies expense splitting among travel groups. Allows users to record expenditures in different currencies, assign custom split ratios, and execute a debt minimization algorithm (graph flow) to reduce the net transactions required to settle up.",
      architectureDetails: [
        "Greedy debt-settlement algorithm optimizing transaction chains between net debtors and creditors.",
        "Interactive DOM rendering using pure modular JavaScript with instant recalculation on input.",
        "Visual expense breakdown rendered with dynamic SVG bar and doughnut charts.",
        "Local storage persistence allowing travelers to manage offline trip ledgers seamlessly."
      ],
      features: [
        "Custom unequal split ratios (percentage, exact amount, equal shares)",
        "Automated optimal transaction path minimizer (e.g. 5 debts resolved in 2 payments)",
        "Trip export to CSV/JSON format for easy sharing across travel companions",
        "1st Place winner at VCET College Competitive Code-A-Thon"
      ],
      techStack: ["JavaScript", "HTML5", "CSS3", "SVG Graphics", "Local Storage API", "Algorithms"],
      award: "1st Place VCET Code-A-Thon",
      isSpecialSelection: true,
      githubUrl: "https://github.com/Latheeshk9322/portfolio-",
      icon: "Calculator",
      codeSnippet: {
        filename: "debtMinimizer.js",
        language: "javascript",
        code: `// Optimal Debt Settlement Graph Algorithm
export function minimizeDebts(transactions) {
  const balances = {};
  
  // Calculate net balances for each person
  transactions.forEach(({ payer, amount, participants }) => {
    const splitAmount = amount / participants.length;
    balances[payer] = (balances[payer] || 0) + amount;
    participants.forEach(p => {
      balances[p] = (balances[p] || 0) - splitAmount;
    });
  });

  const creditors = [];
  const debtors = [];
  Object.entries(balances).forEach(([person, balance]) => {
    if (balance > 0.01) creditors.push({ person, amount: balance });
    else if (balance < -0.01) debtors.push({ person, amount: -balance });
  });

  const settlements = [];
  let i = 0, j = 0;
  while (i < creditors.length && j < debtors.length) {
    const minAmount = Math.min(creditors[i].amount, debtors[j].amount);
    settlements.push({
      from: debtors[j].person,
      to: creditors[i].person,
      amount: Number(minAmount.toFixed(2))
    });
    creditors[i].amount -= minAmount;
    debtors[j].amount -= minAmount;
    if (creditors[i].amount < 0.01) i++;
    if (debtors[j].amount < 0.01) j++;
  }
  return settlements;
}`
      },
      fileTree: [
        "src/",
        "  ├── debtMinimizer.js",
        "  ├── chartVisualizer.js",
        "  ├── storage.js",
        "  └── app.js",
        "index.html",
        "style.css"
      ]
    },

    {
      id: "travel-booking-portal",
      title: "Travel Booking Portal",
      subtitle: "Full-stack travel booking application with destination management & dynamic reservations",
      category: "web-dev",
      categoryLabel: "Web Dev",
      description: "Full-stack travel booking application integrating dynamic pricing engines, online reservation flows, user review blocks, and an administrative dashboard panel.",
      fullOverview: "An enterprise-style travel and hospitality web platform designed for package exploration, room selection, and itinerary scheduling. Features responsive catalog browsing with faceted search filters (price range, ratings, duration, amenities).",
      architectureDetails: [
        "Relational database schema modeling users, destinations, booking transactions, and review ratings.",
        "Server-side session management and role-based access control (Traveler vs Administrator).",
        "Client-side reactive validation for checkout cards and traveler date scheduling."
      ],
      features: [
        "Faceted search and multi-criteria trip filtering",
        "Dynamic reservation summary with automated invoice generation",
        "Admin control dashboard to add, update, and manage travel packages",
        "Interactive customer reviews and star rating calculation engine"
      ],
      techStack: ["PHP", "MySQL", "JavaScript", "Bootstrap / CSS3", "Apache / XAMPP", "HTML5"],
      githubUrl: "https://github.com/Latheeshk9322/portfolio-",
      icon: "Plane",
      codeSnippet: {
        filename: "booking_controller.php",
        language: "php",
        code: `<?php
require_once 'db_config.php';

class BookingController {
    private $db;
    public function __construct($pdo) { $this->db = $pdo; }

    public function createBooking($userId, $packageId, $travelers, $travelDate) {
        $stmt = $this->db->prepare("SELECT price_per_person, available_seats FROM travel_packages WHERE id = ?");
        $stmt->execute([$packageId]);
        $package = $stmt->fetch();

        if (!$package || $package['available_seats'] < $travelers) {
            return ["status" => "error", "message" => "Insufficient seats available"];
        }

        $totalPrice = $package['price_per_person'] * $travelers;
        $bookingStmt = $this->db->prepare(
            "INSERT INTO bookings (user_id, package_id, num_travelers, total_amount, travel_date, status) 
             VALUES (?, ?, ?, ?, ?, 'CONFIRMED')"
        );
        $bookingStmt->execute([$userId, $packageId, $travelers, $totalPrice, $travelDate]);

        // Decrement available capacity atomically
        $updateStmt = $this->db->prepare("UPDATE travel_packages SET available_seats = available_seats - ? WHERE id = ?");
        $updateStmt->execute([$travelers, $packageId]);

        return ["status" => "success", "booking_id" => $this->db->lastInsertId(), "amount" => $totalPrice];
    }
}`
      },
      fileTree: [
        "api/",
        "  ├── booking_controller.php",
        "  ├── auth.php",
        "  └── packages.php",
        "views/",
        "  ├── index.php",
        "  ├── destination.php",
        "  └── checkout.php",
        "schema.sql"
      ]
    },

    {
      id: "solar-power-ecommerce",
      title: "Solar Power E-Commerce Platform",
      subtitle: "Hardware e-commerce web platform for renewable energy solutions & installations",
      category: "web-dev",
      categoryLabel: "Web Dev",
      description: "A responsive e-commerce web platform for exploring and buying solar power hardware solutions, detailed product specification sheets, and customer review interfaces.",
      fullOverview: "A specialized e-commerce web application tailored for renewable energy adoption. Showcases solar panels, inverters, backup batteries, and complete rooftop residential kits with automated wattage requirement calculators for prospective buyers.",
      architectureDetails: [
        "Rooftop solar capacity calculator estimating kW requirements based on customer electricity bill.",
        "Cart state management handling item additions, quantities, tax calculations, and discount coupons.",
        "Structured product detail pages with downloadable technical datasheets and warranty specs."
      ],
      features: [
        "Solar wattage calculator helping customers choose the correct inverter setup",
        "Interactive product catalog with category filtering and instant search",
        "Customer cart and checkout wizard with simulated payment step",
        "Responsive mobile-first grid supporting smartphones, tablets, and desktops"
      ],
      techStack: ["JavaScript", "HTML5", "CSS3", "PHP", "MySQL", "Responsive UI"],
      githubUrl: "https://github.com/Latheeshk9322/portfolio-",
      icon: "Sun",
      codeSnippet: {
        filename: "solarCalculator.js",
        language: "javascript",
        code: `// Calculates recommended Solar System Size (kW) from monthly power usage
export function calculateSolarRequirements({ monthlyKWh, averagePeakSunHours = 4.5 }) {
  // Add 20% system inefficiency buffer
  const dailyKWhRequired = (monthlyKWh / 30) * 1.20;
  const recommendedKwCapacity = dailyKWhRequired / averagePeakSunHours;
  
  // Standard 400W solar panel estimation
  const panelsCount = Math.ceil((recommendedKwCapacity * 1000) / 400);
  const estimatedAnnualSavingsINR = monthlyKWh * 12 * 7.5; // Avg 7.5 INR per unit

  return {
    recommendedKwCapacity: Number(recommendedKwCapacity.toFixed(2)),
    panelsCount,
    estimatedAnnualSavingsINR,
    inverterRatingKw: Math.ceil(recommendedKwCapacity)
  };
}`
      },
      fileTree: [
        "src/",
        "  ├── solarCalculator.js",
        "  ├── cartManager.js",
        "  └── catalogFilter.js",
        "products/",
        "  ├── panels.json",
        "  └── inverters.json",
        "index.html"
      ]
    },

    {
      id: "cgpa-calculator",
      title: "CGPA Calculator Web App",
      subtitle: "Dynamic grade assessment engine calculating university GPA and semester performance",
      category: "web-dev",
      categoryLabel: "Web Dev",
      description: "Highly interactive grade assessment page built using Angular, jQuery, and custom CSS grid features, calculating university grades dynamically in real-time.",
      fullOverview: "A productivity web application tailored for university students (specifically VTU and autonomous engineering grading schemes). Allows students to add course credits, select earned letter grades, dynamically calculate semester SGPA, and aggregate cumulative CGPA across multiple semesters.",
      architectureDetails: [
        "Stateful dynamic row generator enabling students to add or remove courses dynamically.",
        "Grading scheme matrix mapping letter grades (S, A, B, C, D, E, F) to grade points (10 to 0).",
        "Instant calculation engine using event listeners with validation guards against invalid inputs."
      ],
      features: [
        "Automatic conversion of university letter grades to numerical credit-weighted GPA",
        "Dynamic row addition/deletion without refreshing page state",
        "Visual grade summary with color-coded classification (Distinction, First Class, Pass)",
        "Local export feature to save GPA semester reports as PDF"
      ],
      techStack: ["Angular / jQuery", "JavaScript", "HTML5", "CSS Grid", "Bootstrap"],
      githubUrl: "https://github.com/Latheeshk9322/portfolio-",
      icon: "GraduationCap",
      codeSnippet: {
        filename: "gpaCalculator.ts",
        language: "typescript",
        code: `export interface CourseGrade {
  code: string;
  credits: number;
  grade: 'O' | 'S' | 'A' | 'B' | 'C' | 'D' | 'F';
}

const GRADE_POINTS: Record<string, number> = {
  O: 10, S: 10, A: 9, B: 8, C: 7, D: 6, F: 0
};

export function calculateSGPA(courses: CourseGrade[]): number {
  let totalPoints = 0;
  let totalCredits = 0;

  for (const course of courses) {
    const points = GRADE_POINTS[course.grade.toUpperCase()] ?? 0;
    totalPoints += points * course.credits;
    totalCredits += course.credits;
  }

  return totalCredits > 0 ? Number((totalPoints / totalCredits).toFixed(2)) : 0;
}`
      },
      fileTree: [
        "src/",
        "  ├── gpaCalculator.ts",
        "  ├── gradeMatrix.json",
        "  └── uiRenderer.js",
        "styles.css",
        "index.html"
      ]
    },

    {
      id: "food-waste-management",
      title: "Food Waste Management Platform",
      subtitle: "Social enterprise portal connecting food surplus donors with non-profit charities",
      category: "web-dev",
      categoryLabel: "Web Dev",
      description: "Social enterprise portal linking food merchants and hotels having surplus meals with local non-profit charities and volunteer distribution groups.",
      fullOverview: "A humanitarian technology platform created to minimize urban food wastage. Enables restaurants, banquet halls, and wedding caterers to log edible surplus food listings, notifying verified local food banks and volunteer NGOs in real time for timely distribution.",
      architectureDetails: [
        "Donor portal for rapid posting with shelf-life timers and food portion quantity specs.",
        "Geo-proximity matching algorithms suggesting nearby volunteer groups for rapid pickup.",
        "Claim status tracker tracking food pickup from confirmation to final delivery."
      ],
      features: [
        "Rapid surplus donation submission in under 60 seconds",
        "Real-time countdown timer before food perishable threshold is reached",
        "Volunteer claiming mechanism preventing double-pickups",
        "Impact tracker dashboard measuring total kilograms of food rescued"
      ],
      techStack: ["PHP", "MySQL", "JavaScript", "Google Maps API", "CSS3 / HTML5"],
      githubUrl: "https://github.com/Latheeshk9322/portfolio-",
      icon: "HeartHandshake",
      codeSnippet: {
        filename: "donationManager.php",
        language: "php",
        code: `<?php
class FoodDonationManager {
    private $pdo;
    public function __construct($pdo) { $this->pdo = $pdo; }

    public function registerSurplus($donorId, $foodType, $servings, $expiryHours, $location) {
        $expiryTimestamp = date('Y-m-d H:i:s', strtotime("+$expiryHours hours"));
        $stmt = $this->pdo->prepare(
            "INSERT INTO surplus_listings (donor_id, food_type, servings, expires_at, pickup_location, status) 
             VALUES (?, ?, ?, ?, ?, 'AVAILABLE')"
        );
        $stmt->execute([$donorId, $foodType, $servings, $expiryTimestamp, $location]);
        
        $listingId = $this->pdo->lastInsertId();
        $this->notifyNearbyVolunteers($listingId, $location, $servings);
        return $listingId;
    }
}`
      },
      fileTree: [
        "controllers/",
        "  ├── donationManager.php",
        "  └── volunteerClaims.php",
        "models/",
        "  └── listing.php",
        "views/",
        "  ├── donor_dashboard.html",
        "  └── listings_feed.html"
      ]
    },

    {
      id: "java-recipe-manager",
      title: "Java Recipe Manager",
      subtitle: "Desktop OOP application with recipe categorization, nutritional breakdown & SQL storage",
      category: "software",
      categoryLabel: "Software / Java",
      description: "A Java OOP application implementing recipe management, categorization algorithms, step-by-step guidance systems, and local SQL archiving systems.",
      fullOverview: "A software application built using Java Swing and JDBC to organize culinary recipes. Implements Object-Oriented design patterns (Singleton, Factory, DAO pattern) to handle recipe searching, ingredient scaling for varying serving sizes, and step-by-step cooking timers.",
      architectureDetails: [
        "Model-View-Controller (MVC) architecture separating Swing GUI panels from underlying business logic.",
        "Data Access Object (DAO) layer interfacing with MySQL database for persistent storage.",
        "Dynamic ingredient scaling algorithm computing exact quantities based on selected guest servings."
      ],
      features: [
        "Full CRUD operations for managing recipes, ingredients, and preparation steps",
        "Dynamic portion scaling (e.g. adjust 2-person recipe to 6 persons automatically)",
        "Fast keyword search across ingredients, tags (Vegan, Gluten-free), and prep time",
        "Export recipe cards to printable text and markdown files"
      ],
      techStack: ["Java", "OOP Principles", "Java Swing / GUI", "JDBC", "MySQL", "Desktop App"],
      githubUrl: "https://github.com/Latheeshk9322/portfolio-",
      icon: "Utensils",
      codeSnippet: {
        filename: "RecipeDaoImpl.java",
        language: "java",
        code: `package com.latheesh.recipe;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class RecipeDaoImpl implements RecipeDao {
    private final Connection connection;

    public RecipeDaoImpl(Connection connection) {
        this.connection = connection;
    }

    @Override
    public List<Recipe> searchByIngredient(String ingredient) throws SQLException {
        List<Recipe> results = new ArrayList<>();
        String sql = "SELECT r.* FROM recipes r " +
                     "JOIN recipe_ingredients ri ON r.id = ri.recipe_id " +
                     "WHERE LOWER(ri.ingredient_name) LIKE LOWER(?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, "%" + ingredient + "%");
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                results.add(new Recipe(
                    rs.getInt("id"),
                    rs.getString("title"),
                    rs.getString("category"),
                    rs.getInt("prep_time_minutes"),
                    rs.getInt("servings")
                ));
            }
        }
        return results;
    }
}`
      },
      fileTree: [
        "src/com/latheesh/recipe/",
        "  ├── Main.java",
        "  ├── Recipe.java",
        "  ├── RecipeDao.java",
        "  ├── RecipeDaoImpl.java",
        "  └── ui/RecipeViewerFrame.java",
        "db_schema.sql"
      ]
    }
  ],

  certificates: [
    {
      id: "cert-dristi-2025",
      title: "DRISTI-2025, 3rd International Conference",
      institution: "VCET College | IEEE",
      year: "2025",
      category: "Academic & Research",
      image: "/assets/c5.jpg",
      icon: "ShieldCheck",
      verified: true,
      awardBadge: "IEEE Conference"
    },
    {
      id: "cert-privacy-mooc",
      title: "MOOC Privacy, Security and Social Media",
      institution: "VTU University",
      year: "2024",
      category: "Cybersecurity & Web",
      image: "/assets/c1.jpg",
      icon: "Lock",
      verified: true,
      awardBadge: "VTU Certification"
    },
    {
      id: "cert-codeathon",
      title: "CODE-A-THON - 1st Place Winner",
      institution: "VCET College | Competitive Coding",
      year: "2024",
      category: "Competitive Programming",
      image: "/assets/c6.jpg",
      icon: "Trophy",
      verified: true,
      awardBadge: "1st Place Winner"
    },
    {
      id: "cert-ieee-mite",
      title: "IEEE Participation Certificate",
      institution: "MITE College | Technical Symposium",
      year: "2025",
      category: "Technical Symposium",
      image: "/assets/c4.jpg",
      icon: "Globe",
      verified: true,
      awardBadge: "IEEE Certificate"
    },
    {
      id: "cert-medha-2k25",
      title: "MEDHA-2K25 Participation Certificate",
      institution: "SDIT | National Tech Fest",
      year: "2025",
      category: "Competitive Coding",
      image: "/assets/c2.jpg",
      icon: "FileCheck",
      verified: true,
      awardBadge: "National Fest"
    },
    {
      id: "cert-aavirbhav-2k25",
      title: "AAVIRBHAV-2K25 Participation Certificate",
      institution: "St. Agnes College | IT Competition",
      year: "2025",
      category: "Competitive Coding",
      image: "/assets/c3.jpg",
      icon: "Award",
      verified: true,
      awardBadge: "IT Fest"
    }
  ],

  testimonials: [
    {
      id: "hackathon-coordinator",
      quote: "Latheesh demonstrated strong problem-solving skills during our competitive hackathons. His dedication to writing clean code and structuring analytical logic under tight schedules was highly impressive.",
      author: "Hackathon Coordinator",
      role: "Faculty & Event Convener",
      organization: "Vivekananda College of Engineering & Technology",
      avatarText: "HC"
    },
    {
      id: "zephyr-mentor",
      quote: "During his 3-month AI & ML internship with us, Latheesh showed a remarkable appetite for learning. He contributed effectively to preparing regression models and understanding AI workflow integrations.",
      author: "Zephyr Solutions Mentor",
      role: "AI/ML Technical Lead",
      organization: "Zephyr Technologies & Solutions Pvt Ltd",
      avatarText: "ZS"
    },
    {
      id: "hod-mca",
      quote: "Latheesh excels in coordinating IT setups and diagnosing networking issues. His calm approach to hardware diagnostics and user troubleshooting makes him an excellent candidate for software support teams.",
      author: "MCA Head of Department",
      role: "Department Chairperson",
      organization: "Vivekananda Engineering Department",
      avatarText: "HD"
    }
  ],

  faqChatbot: [
    {
      question: "What roles is Latheesh seeking?",
      answer: "Latheesh is actively seeking entry-level positions as an IT Executive, Software Support Executive, Web Developer, or Junior Software Engineer. He is ready to join immediately.",
      category: "Career"
    },
    {
      question: "What is Latheesh's educational background?",
      answer: "Latheesh holds a Master of Computer Applications (MCA) (2023–2025) and a Bachelor of Computer Applications (BCA) (2020–2023) from Vivekananda College of Engineering and Technology (VCET), Puttur.",
      category: "Education"
    },
    {
      question: "What are his key technical skills?",
      answer: "Frontend: JavaScript, React.js, HTML5, CSS3, Tailwind CSS. Backend & Languages: Python, Java, PHP. Databases: MySQL, PostgreSQL, MongoDB. IT Support: Network diagnostics (LAN/Wi-Fi), hardware troubleshooting, Windows & Linux administration.",
      category: "Skills"
    },
    {
      question: "Tell me about his internship experience.",
      answer: "He completed a 3-month AI & ML Internship at Zephyr Technologies & Solutions, Mangalore (Nov 2024 – Jan 2025), building predictive regression models and handling data preprocessing with Python.",
      category: "Experience"
    },
    {
      question: "What notable awards or recognitions has he received?",
      answer: "1st Place in the VCET College CODE-A-THON hackathon, selection by the Karnataka State Council for Science and Technology (KSCST) for his Smart PPE Camera project, and 1st place in the ISRO Quiz competition.",
      category: "Awards"
    }
  ],

  emailConfig: {
    serviceId: "service_xwop2gj",
    templateId: "template_1lbd95q",
    publicKey: "XHcX4leV_EWGbip30",
    recipientEmail: "latheeshacharya6456@gmail.com",
    autoReplyMessage: "Thanks for contacting Latheesh K. We have received your message and will get back to you shortly. Keep in touch with us!",
    web3FormsAccessKey: "", // Optional Web3Forms access key
  }
};
