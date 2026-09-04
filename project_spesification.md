## ServiceLink Sri Lanka

Project Scope & MVP Specification For AI-Assisted Development

Project concept: A web-based local service discovery platform that helps Sri Lankan users find, compare, and request trusted service providers in their area.

## 1. Problem Statement

People in Sri Lanka often struggle to find reliable local service providers when they need services such as carpentry, bike repair, plumbing, electrical work, caregiving, or cleaning. Users may not know where providers are located, whether their work is trustworthy, what they normally charge, whether they are available, or what previous work looks like. This creates uncertainty, wasted time, and dependence on personal contacts or scattered online information.

## 2. Proposed Solution

Build ServiceLink Sri Lanka, a responsive web platform where users can search for local service providers by service category and location, filter and compare providers, view detailed provider profiles, and submit a service request.

## 3. Target Users

| User group | Need |
| --- | --- |
| Customers | Find a suitable, nearby and trustworthy service provider quickly. |
| Service providers | Show their services, location, experience, price range and previous work to potential customers. |

## 4. Core MVP Features

| Feature | Scope |
| --- | --- |
| 1. Service Search | Select a service category and location, then display matching providers. |
| 2. Provider Filtering | Filter results by location, rating and estimated price range. |
| 3. Provider Profile | Show provider name, image, category, location, rating, reviews, experience, price range, availability, previous w |
| 4. Request a Service | Customer submits name, phone number, location, service, description and preferred date. |
| 5. Form Validation | Required fields and meaningful friendly error messages for invalid or missing input. |
| 6. Provider Registration | Simple form for a provider to submit service details. For the MVP, this can use local/sample data rather than a |
| 7. Ratings & Reviews | Display realistic sample ratings and customer reviews on provider profiles. |
| 8. Responsive UI | The application must work on desktop and mobile screens. |

## 5. Main User Flow

Home Select Service Select Location Search View Results Compare Providers Open Provider Profile Request Service Confirmation

Primary demonstration scenario: A user needs a bike mechanic. They search for bike mechanics in Nugegoda, compare ratings/prices/experience, inspect a provider profile and submit a service request.

## 6. Main Screens

| Screen | Main content |
| --- | --- |
| Home / Landing | Project purpose, search controls, service categories, problem/solution explanation. |


| Screen | Main content |
| --- | --- |
| Search Results | Provider cards, filters, sorting/processing, rating, price and location. |
| Provider Profile | Detailed provider information, reviews, price range, availability, previous work and request button. |
| Request Service | Customer request form with validation and success confirmation. |
| Provider Registration | Provider details form and submission confirmation. |

## 7. Sample Service Categories

Carpenter • Bike Mechanic • Plumber • Electrician • Caregiver • Cleaner

## Sample locations

Colombo • Nugegoda • Maharagama • Kottawa • Malabe • Dehiwala


## 8. Provider Data Model

Use simple local/sample data for the hackathon. A provider record should contain:

| Field | Example |
| --- | --- |
| id | 1 |
| name | Kasun Motor Works |
| service | Bike Mechanic |
| location | Nugegoda |
| rating | 4.8 |
| reviewCount | 48 |
| experience | 8 years |
| minPrice | 1500 |
| maxPrice | 6000 |
| available | true |
| description | Motorcycle servicing and repairs |
| previousWork | Array of image URLs/placeholders |

## 9. Functional Requirements

- Users can search providers by service category.

- Users can search/filter providers by location.

- Users can filter by rating and/or price range.

- Search results update according to selected filters.

- Users can open a provider profile.

- Provider profiles display relevant service information.

- Users can submit a service request.

- The request form validates required/invalid fields.

- Users receive a clear success/error message after submission.

- Navigation works between the main screens.

- The UI is responsive on mobile and desktop.

## 10. Out of Scope for the 4-Hour MVP

Do NOT build these unless the core MVP is already complete: real payment processing, real-time chat, complex authentication/authorization, live GPS tracking, advanced provider verification, production-grade review moderation, sophisticated booking calendars, large-scale database infrastructure, or a full marketplace transaction system.

## 11. Optional AI Feature

AI Service Finder: Allow a user to describe a problem in natural language, for example “My bathroom pipe is leaking.” The system recommends the most relevant category, such as Plumber, and sends the user to the appropriate provider search. This is optional and should only be added after the core MVP works.

## 12. Recommended Technical Approach


Keep the stack simple and fast to deploy. A suitable approach is a React-based frontend with a lightweight local data layer or simple backend/API if the team already knows one. Use reusable components for Navbar, SearchForm, FilterPanel, ProviderCard, ProviderProfile and ServiceRequestForm. Store sample data in JSON/JavaScript initially to reduce setup time.

Important: Choose the framework your team can explain confidently. The assignment permits any technology stack and AI tools, but team members must understand and be able to explain submitted code.

## 13. Development Priority

| Priority | Build |
| --- | --- |
| P0 | Project setup + sample provider data + routing/navigation |
| P0 | Home page + service/location search |
| P0 | Search results + filtering |
| P0 | Provider profile |
| P0 | Service request form + validation |
| P0 | Responsive layout + testing |
| P1 | Provider registration |
| P1 | Reviews/ratings display |
| P2 | AI service recommendation |

## 14. Suggested Team Split

Member 1 — UI: Home, navigation, responsive design.

Member 2 — Functional: Search, filtering, provider cards/profile.

Member 3 — Forms: Request form, validation, provider registration.

Member 4 — Integration/Ship: Testing, Git, deployment, demo preparation.

Roles can overlap. Every registered member must contribute and everyone should write code.

## 15. 4-Hour Execution Plan

| Time | Focus |
| --- | --- |
| 0–20 min | Lock scope, agree UI flow, assign work, create repository. |
| 20–45 min | Design screens/components and prepare sample data. |
| 45–175 min | Build the functional MVP. |
| 175–205 min | Test, fix validation/UI issues, polish. |
| 205–225 min | Deploy and verify public link. |
| 225–240 min | Record 2-minute demo and complete submission. |

## 16. Demo Script / Acceptance Scenario

- 1. Open ServiceLink Sri Lanka.

- 2. Explain: “A user needs a reliable bike mechanic but does not know whom to trust or what they charge.”

- 3. Select Bike Mechanic and Nugegoda.

- 4. Show filtered providers and compare rating/price/location.

- 5. Open one provider profile and show reviews, experience, price range and previous work.

- 6. Click Request Service and submit the form.

- 7. Demonstrate validation with one invalid field if useful, then submit successfully.

- 8. Briefly state the impact: faster discovery, more transparency, and easier access to local services.


## 17. Definition of Done

The MVP is complete when the application has a clear landing page, explains the Sri Lankan problem, contains at least two working solution features, accepts and validates user input, supports search/filtering, has working navigation, includes realistic sample data, works on desktop/mobile, is publicly deployed, and can be demonstrated end-to-end.

## 18. AI Development Instructions

When using an AI coding assistant, implement the MVP incrementally. Do not ask the AI to generate an entire complex application at once. Give it one feature at a time, run/test the result, then continue. Keep the code simple enough that every team member can explain it during the evaluation.

Suggested prompt style: “Build only the Search Results component for ServiceLink Sri Lanka. Use this provider data structure: [data]. Add filtering by service, location, rating and price. Keep the component simple and explain the logic after the code.”
