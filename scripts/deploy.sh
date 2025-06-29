#!/bin/bash

# TreeBox Project Deployment Script
# This script handles deployment of frontend and future backend

set -e  # Exit on any error

# Configuration
FRONTEND_BUILD_DIR="frontend/dist"
BACKEND_BUILD_DIR="backend/dist"  # Future use

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if directory exists
check_directory() {
    if [ ! -d "$1" ]; then
        print_error "Directory $1 does not exist"
        return 1
    fi
}

# Function to build frontend
build_frontend() {
    print_status "Building frontend application..."
    
    cd frontend
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        print_status "Installing frontend dependencies..."
        npm install
    fi
    
    # Run linting
    print_status "Running ESLint..."
    npm run lint
    
    # Run build
    print_status "Building frontend..."
    npm run build
    
    cd ..
    
    if [ -d "$FRONTEND_BUILD_DIR" ]; then
        print_success "Frontend build completed successfully"
        print_status "Build output: $FRONTEND_BUILD_DIR"
    else
        print_error "Frontend build failed - no build directory found"
        exit 1
    fi
}

# Function to build backend (future implementation)
build_backend() {
    if [ -f "backend/package.json" ]; then
        print_status "Building backend application..."
        
        cd backend
        
        # Install dependencies if node_modules doesn't exist
        if [ ! -d "node_modules" ]; then
            print_status "Installing backend dependencies..."
            npm install
        fi
        
        # Run tests if they exist
        if npm run test --silent > /dev/null 2>&1; then
            print_status "Running backend tests..."
            npm run test
        fi
        
        # Run build if script exists
        if npm run build --silent > /dev/null 2>&1; then
            print_status "Building backend..."
            npm run build
        fi
        
        cd ..
        print_success "Backend build completed successfully"
    else
        print_warning "Backend not yet implemented - skipping backend build"
    fi
}

# Function to deploy to various platforms
deploy_frontend() {
    local platform=$1
    
    case $platform in
        "vercel")
            print_status "Deploying to Vercel..."
            if command -v vercel &> /dev/null; then
                cd frontend
                vercel --prod
                cd ..
                print_success "Deployed to Vercel successfully"
            else
                print_error "Vercel CLI not installed. Install with: npm i -g vercel"
                exit 1
            fi
            ;;
        "netlify")
            print_status "Deploying to Netlify..."
            if command -v netlify &> /dev/null; then
                cd frontend
                netlify deploy --prod --dir=dist
                cd ..
                print_success "Deployed to Netlify successfully"
            else
                print_error "Netlify CLI not installed. Install with: npm i -g netlify-cli"
                exit 1
            fi
            ;;
        "static")
            print_status "Preparing static deployment..."
            if [ -d "$FRONTEND_BUILD_DIR" ]; then
                print_success "Static files ready for deployment in $FRONTEND_BUILD_DIR"
                print_status "Upload the contents of $FRONTEND_BUILD_DIR to your web server"
            else
                print_error "No build directory found. Run build first."
                exit 1
            fi
            ;;
        *)
            print_error "Unknown deployment platform: $platform"
            print_status "Available platforms: vercel, netlify, static"
            exit 1
            ;;
    esac
}

# Main script logic
main() {
    echo "🚀 TreeBox Project Deployment"
    echo "============================"
    
    # Parse command line arguments
    DEPLOY_PLATFORM=""
    BUILD_ONLY=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --platform)
                DEPLOY_PLATFORM="$2"
                shift 2
                ;;
            --build-only)
                BUILD_ONLY=true
                shift
                ;;
            --help)
                echo "Usage: $0 [OPTIONS]"
                echo ""
                echo "Options:"
                echo "  --platform PLATFORM    Deploy to specific platform (vercel, netlify, static)"
                echo "  --build-only           Only build, don't deploy"
                echo "  --help                 Show this help message"
                echo ""
                echo "Examples:"
                echo "  $0 --build-only"
                echo "  $0 --platform vercel"
                echo "  $0 --platform netlify"
                echo "  $0 --platform static"
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                echo "Use --help for usage information"
                exit 1
                ;;
        esac
    done
    
    # Build applications
    print_status "Starting build process..."
    build_frontend
    build_backend
    
    # Deploy if requested
    if [ "$BUILD_ONLY" = true ]; then
        print_success "Build completed successfully (build-only mode)"
        exit 0
    fi
    
    if [ -n "$DEPLOY_PLATFORM" ]; then
        deploy_frontend "$DEPLOY_PLATFORM"
    else
        print_success "Build completed successfully"
        print_status "Use --platform [vercel|netlify|static] to deploy"
    fi
    
    print_success "Deployment process completed!"
}

# Run main function with all arguments
main "$@"