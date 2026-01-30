# IT3040 Assignment 1 - Singlish Translator Automation Testing

**Student Information**
- **Name:** N.D.K.G.D.K.B Manawasinghe
- **Student ID:** IT23850064

## Project Overview

This project tests the SwiftTranslator website (https://www.swifttranslator.com/) to check how accurately it converts Singlish text into Sinhala. I have used Playwright to automate the testing process and created 35 test cases covering different scenarios.

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

Make sure you have Node.js installed on your computer before proceeding.

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

The test suite includes 35 test cases covering multiple scenarios:

-  **24 Positive Functional Tests** - Validate correct Singlish to Sinhala conversion
-  **10 Negative Functional Tests** - Verify error handling and edge cases
-  **1 UI Test** - Ensure real-time output updates work properly

**Total Test Cases:** 35

**Module:** IT3040 – IT Project Management  
