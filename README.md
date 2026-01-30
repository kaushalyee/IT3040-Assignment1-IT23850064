# IT3040 Assignment 1 - Singlish Translator Automation Testing

**Student Information**
- **Name:** Kaushalye Manawasinghe
- **Student ID:** IT23850064

## Project Overview

This repository contains comprehensive automated test cases for the SwiftTranslator system, which translates Singlish text to Sinhala. The testing framework was developed using Playwright as part of the IT3040 – ITPM Assignment 1 coursework.

## Technologies Used

- **Playwright** - End-to-end testing framework
- **Node.js** - JavaScript runtime environment
- **JavaScript** - Programming language

## Project Structure
```
├── tests/                  # Playwright test scripts
├── testData.js            # Test case input data
├── playwright.config.js   # Playwright configuration
└── package.json           # Dependencies and scripts
```

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your system before proceeding.

### Installation

1. **Install project dependencies**
```bash
   npm install
```

2. **Install Playwright browsers**
```bash
   npx playwright install
```

### Running Tests

**Execute all automated tests**
```bash
npx playwright test
```

**View the HTML test report**
```bash
npx playwright show-report
```

## Test Coverage

The test suite includes comprehensive coverage across multiple scenarios:

-  **24 Positive Functional Test Cases** - Validate expected system behavior
-  **10 Negative Functional Test Cases** - Verify error handling and edge cases
-  **1 UI Test Case** - Ensure user interface elements function correctly

**Total Test Cases:** 35

## Features Tested

- Singlish to Sinhala text translation
- Input validation
- Error handling and boundary conditions
- User interface responsiveness

---

**Course:** IT3040 – IT Project Management  
**Institution:** Sri Lanka Institute of Information Technology (SLIIT)
