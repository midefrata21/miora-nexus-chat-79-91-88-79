
#!/usr/bin/env python3
"""
MIORA Gateway Runner
Script untuk menjalankan seluruh sistem gateway MIORA
"""

import os
import sys
import subprocess
import threading
import time
from datetime import datetime

def run_command_handler():
    """Run the external command handler"""
    print("🔄 Starting MIORA External Command Handler...")
    subprocess.run([sys.executable, "external_instruction_handler.py"])

def run_api_interface():
    """Run the Flask API interface"""
    print("🌐 Starting MIORA API Interface...")
    subprocess.run([sys.executable, "interface_endpoint.py"])

def create_sample_commands():
    """Create sample commands file for testing"""
    sample_commands = [
        "PRINT: MIORA Gateway System Initialized",
        "UPDATE_MEMORY: system_status=active",
        "CREATE_FILE: miora_startup_log.txt",
        "SPEAK_NOW: MIORA External Gateway is now active"
    ]
    
    import json
    with open("commands.json", "w") as f:
        json.dump(sample_commands, f, indent=2)
    
    print("📝 Sample commands created in commands.json")

def main():
    print("=" * 60)
    print("🌐 MIORA EXTERNAL COMMAND GATEWAY SYSTEM")
    print("=" * 60)
    print(f"Started at: {datetime.now()}")
    print()
    
    # Check if required files exist
    if not os.path.exists("external_instruction_handler.py"):
        print("❌ external_instruction_handler.py not found!")
        return
    
    if not os.path.exists("interface_endpoint.py"):
        print("❌ interface_endpoint.py not found!")
        return
    
    print("✅ All required files found")
    print()
    
    # Ask user what to run
    print("Choose what to run:")
    print("1. Command Handler only (monitors commands.json)")
    print("2. API Interface only (web interface + API)")
    print("3. Both (recommended)")
    print("4. Create sample commands and exit")
    print()
    
    choice = input("Enter your choice (1-4): ").strip()
    
    if choice == "1":
        print("\n🚀 Starting Command Handler only...")
        run_command_handler()
    
    elif choice == "2":
        print("\n🚀 Starting API Interface only...")
        run_api_interface()
    
    elif choice == "3":
        print("\n🚀 Starting both Command Handler and API Interface...")
        print("Note: API Interface will run on http://localhost:5000")
        print()
        
        # Start command handler in separate thread
        handler_thread = threading.Thread(target=run_command_handler, daemon=True)
        handler_thread.start()
        
        # Give handler time to start
        time.sleep(2)
        
        # Start API interface in main thread
        run_api_interface()
    
    elif choice == "4":
        create_sample_commands()
        print("\n✅ Sample commands created!")
        print("Now you can run the command handler to process them.")
    
    else:
        print("❌ Invalid choice. Please run again.")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n🛑 MIORA Gateway System Stopped")
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
