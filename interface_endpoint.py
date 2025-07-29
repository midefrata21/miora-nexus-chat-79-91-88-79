
#!/usr/bin/env python3
"""
MIORA External Interface API Endpoint
Flask API untuk menerima perintah dari sistem luar melalui HTTP
"""

from flask import Flask, request, jsonify, render_template_string
import json
import os
from datetime import datetime
from typing import Dict, List, Any

app = Flask(__name__)

class MIORAAPIInterface:
    def __init__(self):
        self.commands_file = "commands.json"
        self.api_log_file = "api_command_log.txt"
        
    def add_command(self, command: str, source: str = "api") -> bool:
        """Add command to the queue"""
        try:
            # Read existing commands
            commands = []
            if os.path.exists(self.commands_file):
                with open(self.commands_file, 'r', encoding='utf-8') as f:
                    commands = json.load(f)
            
            # Add new command
            commands.append(command)
            
            # Save updated commands
            with open(self.commands_file, 'w', encoding='utf-8') as f:
                json.dump(commands, f, indent=2, ensure_ascii=False)
            
            # Log API request
            self.log_api_request(command, source, True)
            return True
            
        except Exception as e:
            self.log_api_request(command, source, False, str(e))
            return False
    
    def log_api_request(self, command: str, source: str, success: bool, error: str = None):
        """Log API requests"""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        status = "✅ SUCCESS" if success else "❌ FAILED"
        
        log_entry = f"[{timestamp}] API REQUEST {status}\n"
        log_entry += f"Source: {source}\n"
        log_entry += f"Command: {command}\n"
        if error:
            log_entry += f"Error: {error}\n"
        log_entry += "-" * 40 + "\n\n"
        
        with open(self.api_log_file, 'a', encoding='utf-8') as f:
            f.write(log_entry)

# Initialize API interface
api_interface = MIORAAPIInterface()

# HTML Template for Web Interface
WEB_INTERFACE_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <title>🌐 MIORA External Command Interface</title>
    <meta charset="utf-8">
    <style>
        body { 
            font-family: Arial, sans-serif; 
            background: #1a1a1a; 
            color: #ffffff; 
            margin: 0; 
            padding: 20px; 
        }
        .container { 
            max-width: 800px; 
            margin: 0 auto; 
            background: #2d2d2d; 
            padding: 30px; 
            border-radius: 10px; 
        }
        h1 { 
            color: #4CAF50; 
            text-align: center; 
            margin-bottom: 30px; 
        }
        .form-group { 
            margin-bottom: 20px; 
        }
        label { 
            display: block; 
            margin-bottom: 5px; 
            color: #cccccc; 
        }
        input, textarea, select { 
            width: 100%; 
            padding: 10px; 
            background: #3d3d3d; 
            border: 1px solid #555; 
            border-radius: 5px; 
            color: #ffffff; 
            font-size: 14px; 
        }
        button { 
            background: #4CAF50; 
            color: white; 
            padding: 12px 24px; 
            border: none; 
            border-radius: 5px; 
            cursor: pointer; 
            font-size: 16px; 
            width: 100%; 
        }
        button:hover { 
            background: #45a049; 
        }
        .commands-list { 
            background: #3d3d3d; 
            padding: 15px; 
            border-radius: 5px; 
            margin-top: 20px; 
        }
        .command-item { 
            background: #4d4d4d; 
            padding: 8px; 
            margin: 5px 0; 
            border-radius: 3px; 
            font-family: monospace; 
        }
        .status { 
            padding: 10px; 
            margin: 10px 0; 
            border-radius: 5px; 
            text-align: center; 
        }
        .success { 
            background: #2d5a2d; 
            color: #90EE90; 
        }
        .error { 
            background: #5a2d2d; 
            color: #FF6B6B; 
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🌐 MIORA External Command Interface</h1>
        
        <div class="form-group">
            <label for="command">Enter Command:</label>
            <input type="text" id="command" placeholder="e.g., PRINT: Hello MIORA" />
        </div>
        
        <div class="form-group">
            <label for="preset">Or choose preset command:</label>
            <select id="preset" onchange="usePreset()">
                <option value="">Select preset...</option>
                <option value="PRINT: Hello from external system">Print Hello</option>
                <option value="CREATE_FILE: test_file.txt">Create Test File</option>
                <option value="SPEAK_NOW: MIORA is ready">Voice Test</option>
                <option value="UPDATE_MEMORY: test_key=test_value">Update Memory</option>
                <option value="MEMORY_BACKUP: backup.json">Backup Memory</option>
                <option value="RUN_MODULE: test_module">Run Module</option>
            </select>
        </div>
        
        <button onclick="sendCommand()">🚀 Send Command</button>
        
        <div id="status"></div>
        
        <div class="commands-list">
            <h3>📋 Supported Commands:</h3>
            <div class="command-item">PRINT: [message] - Print message to console</div>
            <div class="command-item">CREATE_FILE: [filename] - Create a new file</div>
            <div class="command-item">SPEAK_NOW: [text] - Text-to-speech</div>
            <div class="command-item">UPDATE_MEMORY: [key=value] - Update memory</div>
            <div class="command-item">RUN_MODULE: [module_name] - Execute module</div>
            <div class="command-item">MEMORY_BACKUP: [filename] - Backup memory</div>
            <div class="command-item">RESTART_SYSTEM - Restart MIORA</div>
            <div class="command-item">UPDATE_BRAIN: [knowledge] - Update brain knowledge</div>
            <div class="command-item">SET_MODE: [mode] - Set operational mode</div>
        </div>
    </div>

    <script>
        function usePreset() {
            const preset = document.getElementById('preset').value;
            document.getElementById('command').value = preset;
        }

        function sendCommand() {
            const command = document.getElementById('command').value.trim();
            const statusDiv = document.getElementById('status');
            
            if (!command) {
                statusDiv.innerHTML = '<div class="status error">❌ Please enter a command</div>';
                return;
            }
            
            statusDiv.innerHTML = '<div class="status">⏳ Sending command...</div>';
            
            fetch('/api/command', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    command: command,
                    source: 'web_interface'
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    statusDiv.innerHTML = '<div class="status success">✅ Command sent successfully!</div>';
                    document.getElementById('command').value = '';
                    document.getElementById('preset').value = '';
                } else {
                    statusDiv.innerHTML = '<div class="status error">❌ Error: ' + data.message + '</div>';
                }
            })
            .catch(error => {
                statusDiv.innerHTML = '<div class="status error">❌ Network error: ' + error.message + '</div>';
            });
        }
        
        // Allow Enter key to send command
        document.getElementById('command').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendCommand();
            }
        });
    </script>
</body>
</html>
"""

@app.route('/')
def index():
    """Web interface for sending commands"""
    return render_template_string(WEB_INTERFACE_TEMPLATE)

@app.route('/api/command', methods=['POST'])
def add_command():
    """API endpoint to add command to queue"""
    try:
        data = request.json
        command = data.get('command', '').strip()
        source = data.get('source', 'api')
        
        if not command:
            return jsonify({
                'success': False,
                'message': 'Command is required'
            }), 400
        
        success = api_interface.add_command(command, source)
        
        if success:
            return jsonify({
                'success': True,
                'message': 'Command added to queue successfully',
                'command': command
            })
        else:
            return jsonify({
                'success': False,
                'message': 'Failed to add command to queue'
            }), 500
            
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/status', methods=['GET'])
def get_status():
    """Get current status and queue information"""
    try:
        # Read current commands
        commands = []
        if os.path.exists(api_interface.commands_file):
            with open(api_interface.commands_file, 'r', encoding='utf-8') as f:
                commands = json.load(f)
        
        return jsonify({
            'success': True,
            'queue_size': len(commands),
            'commands': commands,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/clear', methods=['POST'])
def clear_queue():
    """Clear the command queue"""
    try:
        with open(api_interface.commands_file, 'w') as f:
            json.dump([], f)
        
        api_interface.log_api_request("CLEAR_QUEUE", "api", True)
        
        return jsonify({
            'success': True,
            'message': 'Command queue cleared successfully'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

if __name__ == '__main__':
    print("🌐 MIORA External Interface API Starting...")
    print("📱 Web Interface: http://localhost:5000")
    print("🔌 API Endpoint: http://localhost:5000/api/command")
    print("📊 Status Check: http://localhost:5000/api/status")
    print("🧹 Clear Queue: http://localhost:5000/api/clear")
    print("\nPress Ctrl+C to stop")
    
    app.run(host='0.0.0.0', port=5000, debug=False)
