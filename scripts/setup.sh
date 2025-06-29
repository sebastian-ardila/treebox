#!/bin/bash

# TreeBox Project Setup Script
# This script sets up the development environment for the TreeBox project

set -e  # Exit on any error

echo "🌳 TreeBox Project Setup"
echo "======================="

# Check Node.js version
echo "📋 Checking prerequisites..."
node_version=$(node -v | cut -d'v' -f2)
required_version="18.0.0"

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js ${required_version} or higher."
    exit 1
fi

# Simple version comparison
if [[ "$(printf '%s\n' "$required_version" "$node_version" | sort -V | head -n1)" != "$required_version" ]]; then
    echo "❌ Node.js version ${node_version} is less than required ${required_version}"
    exit 1
fi

echo "✅ Node.js version ${node_version} meets requirements"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm is available"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Check if backend exists and has package.json
if [ -f "backend/package.json" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
else
    echo "ℹ️  Backend not yet implemented - skipping backend dependencies"
fi

# Run initial build to verify everything works
echo "🔨 Running initial frontend build to verify setup..."
cd frontend
npm run build
cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Available commands:"
echo "Frontend development:"
echo "  cd frontend && npm run dev    - Start development server"
echo "  cd frontend && npm run build  - Build for production"
echo "  cd frontend && npm run lint   - Run ESLint"
echo "  cd frontend && npm run preview - Preview production build"
echo ""
echo "Backend development:"
echo "  cd backend && npm run dev     - When backend is implemented"
echo ""
echo "🚀 Happy coding!"