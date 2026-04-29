# Lumina | Future Version Roadmap

This document outlines the architectural shift and features planned for the next evolution of the Lumina Editorial Dashboard.

## 核心 Vision
Transform Lumina from a static link-saving dashboard into a dynamic, AI-powered personal intelligence hub for digital craft.

---

## 1. Multi-User & Authentication
- **System**: Integrate **Supabase** or **Firebase Auth**.
- **Features**: 
    - Secure user login and registration.
    - Personal link collections isolated per user.
    - Cloud-synced data for cross-device access.

## 2. Intelligence: Auto-Categorization
- **AI Integration**: Utilize the **Gemini API** (or OpenAI) to analyze links.
- **Workflow**:
    - Automatic fetching of link metadata (Title, Description, OpenGraph tags).
    - Intelligent categorization based on site content.
    - **Self-Evolving Filters**: The system will dynamically create new categories if a link doesn't fit the existing taxonomy.

## 3. Bulk Operations
- **Bulk Importer**: A premium "paste-and-go" interface for adding many URLs at once.
- **Auto-Processing**: Background workers to categorize and tag bulk uploads without blocking the UI.

## 4. Architectural Migration
- **Framework**: Move from vanilla HTML/JS to **Next.js** for better state management and server-side processing.
- **Backend**: **Supabase PostgreSQL** for robust data storage.
- **API Layer**: Serverless functions to securely handle API keys and AI processing.

## 5. UI/UX Evolution
- **Dynamic Grid**: The sidebar and bento grid will render based on real-time database data.
- **Search & Discovery**: High-speed, fuzzy search across all saved collections.
- **Editorial Personalization**: Allow users to customize their dashboard layout and branding.

---

## Technical Stack
- **Frontend**: Next.js, Vanilla CSS (Premium design system).
- **Backend/DB**: Supabase.
- **AI**: Gemini Pro API.
- **Hosting**: Vercel / Netlify.
