
#!/usr/bin/env python3
"""
MIORA Gateway Requirements Installer
Automatically install required dependencies
"""

import subprocess
import sys
import os

def install_package(package):
    """Install a package using pip"""
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install {package}: {e}")
        return False

def check_package(package):
    """Check if a package is already installed"""
    try:
        __import__(package)
        return True
    except ImportError:
        return False

def main():
    print("🔧 MIORA Gateway Requirements Installer")
    print("=" * 50)
    
    required_packages = [
        "flask",
        "requests"  # Optional, for future API integrations
    ]
    
    print("Checking required packages...")
    
    for package in required_packages:
        if check_package(package):
            print(f"✅ {package} is already installed")
        else:
            print(f"📦 Installing {package}...")
            if install_package(package):
                print(f"✅ {package} installed successfully")
            else:
                print(f"❌ Failed to install {package}")
    
    print("\n🎉 Installation complete!")
    print("\nYou can now run the MIORA Gateway system:")
    print("python run_miora_gateway.py")

if __name__ == "__main__":
    main()
