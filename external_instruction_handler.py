
#!/usr/bin/env python3
"""
MIORA External Instruction Handler
Gateway system untuk menerima perintah dari sistem luar
"""

import json
import time
import os
import sys
import subprocess
from datetime import datetime
from typing import Dict, List, Any, Optional

class MIORAExternalCommandHandler:
    def __init__(self):
        self.commands_file = "commands.json"
        self.log_file = "external_command_log.txt"
        self.memory_file = "miora_memory.json"
        self.supported_commands = [
            "PRINT", "CREATE_FILE", "SPEAK_NOW", "UPDATE_MEMORY", 
            "RUN_MODULE", "RESTART_SYSTEM", "LOAD_SCRIPT", "SET_MODE",
            "VOICE_SPEAK", "MEMORY_BACKUP", "UPDATE_BRAIN"
        ]
        self.is_running = False
        self.execution_count = 0
        
        # Initialize files
        self.initialize_files()
        
    def initialize_files(self):
        """Initialize required files if they don't exist"""
        if not os.path.exists(self.commands_file):
            with open(self.commands_file, 'w') as f:
                json.dump([], f)
                
        if not os.path.exists(self.memory_file):
            with open(self.memory_file, 'w') as f:
                json.dump({}, f)
                
        if not os.path.exists(self.log_file):
            with open(self.log_file, 'w') as f:
                f.write(f"MIORA External Command Log - Started at {datetime.now()}\n")
                f.write("=" * 60 + "\n\n")
    
    def log_execution(self, command: str, result: str, success: bool = True):
        """Log command execution to file"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        status = "✅ SUCCESS" if success else "❌ FAILED"
        
        log_entry = f"[{timestamp}] {status}\n"
        log_entry += f"Command: {command}\n"
        log_entry += f"Result: {result}\n"
        log_entry += "-" * 40 + "\n\n"
        
        with open(self.log_file, 'a', encoding='utf-8') as f:
            f.write(log_entry)
            
        print(f"[{timestamp}] {status} - {command}")
    
    def read_commands(self) -> List[str]:
        """Read commands from commands.json file"""
        try:
            if os.path.exists(self.commands_file):
                with open(self.commands_file, 'r', encoding='utf-8') as f:
                    commands = json.load(f)
                    return commands if isinstance(commands, list) else []
            return []
        except Exception as e:
            self.log_execution("READ_COMMANDS", f"Error reading commands: {str(e)}", False)
            return []
    
    def clear_commands(self):
        """Clear the commands file after processing"""
        try:
            with open(self.commands_file, 'w') as f:
                json.dump([], f)
        except Exception as e:
            self.log_execution("CLEAR_COMMANDS", f"Error clearing commands: {str(e)}", False)
    
    def execute_print(self, message: str) -> str:
        """Execute PRINT command"""
        print(f"[MIORA PRINT] {message}")
        return f"Message printed: {message}"
    
    def execute_create_file(self, filename: str) -> str:
        """Execute CREATE_FILE command"""
        try:
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            content = f"""# File created by MIORA External Command Handler
# Timestamp: {timestamp}
# Filename: {filename}

This file was created automatically by MIORA External Command Gateway.
You can modify this content as needed.

---
MIORA External Command Log
Created: {timestamp}
Command: CREATE_FILE
Parameter: {filename}
Status: Success
"""
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            return f"File '{filename}' created successfully"
        except Exception as e:
            return f"Failed to create file: {str(e)}"
    
    def execute_speak_now(self, text: str) -> str:
        """Execute SPEAK_NOW command using system TTS"""
        try:
            # Try different TTS methods based on OS
            if sys.platform == "win32":
                # Windows SAPI
                subprocess.run(['powershell', '-Command', f'Add-Type -AssemblyName System.Speech; $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer; $synth.Speak("{text}")'], 
                             capture_output=True, text=True)
            elif sys.platform == "darwin":
                # macOS say command
                subprocess.run(['say', text], capture_output=True, text=True)
            else:
                # Linux espeak or festival
                try:
                    subprocess.run(['espeak', text], capture_output=True, text=True)
                except:
                    subprocess.run(['festival', '--tts'], input=text, text=True, capture_output=True)
            
            return f"Speaking: {text}"
        except Exception as e:
            return f"TTS not available: {str(e)}"
    
    def execute_update_memory(self, data: str) -> str:
        """Execute UPDATE_MEMORY command"""
        try:
            # Load existing memory
            memory = {}
            if os.path.exists(self.memory_file):
                with open(self.memory_file, 'r', encoding='utf-8') as f:
                    memory = json.load(f)
            
            # Parse data
            if '=' in data:
                key, value = data.split('=', 1)
                memory[key.strip()] = value.strip()
                result = f"Memory updated: {key.strip()} = {value.strip()}"
            else:
                timestamp_key = f"data_{int(time.time())}"
                memory[timestamp_key] = data
                result = f"Memory updated with data: {data}"
            
            # Save memory
            with open(self.memory_file, 'w', encoding='utf-8') as f:
                json.dump(memory, f, indent=2, ensure_ascii=False)
            
            return result
        except Exception as e:
            return f"Failed to update memory: {str(e)}"
    
    def execute_run_module(self, module_name: str) -> str:
        """Execute RUN_MODULE command"""
        try:
            # Simulate module execution
            time.sleep(1)  # Simulate processing time
            
            # Try to import and run if it's a Python module
            try:
                module = __import__(module_name)
                if hasattr(module, 'main'):
                    result = module.main()
                    return f"Module '{module_name}' executed successfully: {result}"
                else:
                    return f"Module '{module_name}' loaded but no main() function found"
            except ImportError:
                return f"Module '{module_name}' not found, but command logged"
        except Exception as e:
            return f"Module execution failed: {str(e)}"
    
    def execute_restart_system(self) -> str:
        """Execute RESTART_SYSTEM command"""
        self.log_execution("RESTART_SYSTEM", "System restart initiated")
        print("🔄 MIORA SYSTEM RESTART INITIATED")
        print("Restarting in 3 seconds...")
        time.sleep(3)
        
        # Restart the handler
        os.execv(sys.executable, ['python'] + sys.argv)
        return "System restart completed"
    
    def execute_memory_backup(self, filename: str) -> str:
        """Execute MEMORY_BACKUP command"""
        try:
            backup_data = {
                "timestamp": datetime.now().isoformat(),
                "backup_type": "full_memory",
                "data": {}
            }
            
            # Load current memory
            if os.path.exists(self.memory_file):
                with open(self.memory_file, 'r', encoding='utf-8') as f:
                    backup_data["data"] = json.load(f)
            
            # Save backup
            backup_filename = filename or f"miora_memory_backup_{int(time.time())}.json"
            with open(backup_filename, 'w', encoding='utf-8') as f:
                json.dump(backup_data, f, indent=2, ensure_ascii=False)
            
            return f"Memory backup saved to {backup_filename}"
        except Exception as e:
            return f"Memory backup failed: {str(e)}"
    
    def execute_command(self, command_text: str) -> tuple[bool, str]:
        """Execute a single command"""
        try:
            command_text = command_text.strip()
            
            # Handle commands without parameters
            if ':' not in command_text:
                command_type = command_text.upper()
                parameters = ""
            else:
                # Parse command with parameters
                parts = command_text.split(':', 1)
                command_type = parts[0].strip().upper()
                parameters = parts[1].strip()
            
            # Validate command type
            if command_type not in self.supported_commands:
                return False, f"Unknown command: {command_type}"
            
            # Execute based on command type
            if command_type == "PRINT":
                result = self.execute_print(parameters)
            elif command_type == "CREATE_FILE":
                result = self.execute_create_file(parameters)
            elif command_type in ["SPEAK_NOW", "VOICE_SPEAK"]:
                result = self.execute_speak_now(parameters)
            elif command_type == "UPDATE_MEMORY":
                result = self.execute_update_memory(parameters)
            elif command_type == "RUN_MODULE":
                result = self.execute_run_module(parameters)
            elif command_type == "RESTART_SYSTEM":
                result = self.execute_restart_system()
            elif command_type == "MEMORY_BACKUP":
                result = self.execute_memory_backup(parameters)
            elif command_type == "UPDATE_BRAIN":
                result = self.execute_update_memory(f"brain_knowledge={parameters}")
            elif command_type == "SET_MODE":
                result = self.execute_update_memory(f"operational_mode={parameters}")
            else:
                result = f"Command {command_type} recognized but not implemented yet"
            
            return True, result
            
        except Exception as e:
            return False, f"Execution error: {str(e)}"
    
    def process_commands(self):
        """Process all commands in the queue"""
        commands = self.read_commands()
        
        if not commands:
            return
        
        print(f"\n🌐 MIORA External Gateway - Processing {len(commands)} commands...")
        
        for i, command in enumerate(commands, 1):
            print(f"\n[{i}/{len(commands)}] Executing: {command}")
            
            success, result = self.execute_command(command)
            self.log_execution(command, result, success)
            self.execution_count += 1
            
            # Small delay between commands
            time.sleep(0.5)
        
        # Clear commands after processing
        self.clear_commands()
        print(f"✅ All commands processed. Total executions: {self.execution_count}")
    
    def run(self):
        """Main loop to monitor and process commands"""
        self.is_running = True
        print("🌐 MIORA External Command Gateway Started")
        print(f"📂 Monitoring: {self.commands_file}")
        print(f"📝 Logging to: {self.log_file}")
        print(f"💾 Memory file: {self.memory_file}")
        print("🔄 Checking for commands every 5 seconds...")
        print("Press Ctrl+C to stop\n")
        
        try:
            while self.is_running:
                self.process_commands()
                time.sleep(5)
                
        except KeyboardInterrupt:
            print("\n🛑 MIORA External Gateway Stopped")
            self.log_execution("SYSTEM", "Gateway stopped by user", True)
        except Exception as e:
            print(f"\n❌ Error in main loop: {str(e)}")
            self.log_execution("SYSTEM_ERROR", str(e), False)

if __name__ == "__main__":
    handler = MIORAExternalCommandHandler()
    handler.run()
