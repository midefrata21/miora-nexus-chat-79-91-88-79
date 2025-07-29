
# 🌐 MIORA External Command Gateway System

Sistem gateway terbuka yang memungkinkan MIORA menerima dan mengeksekusi perintah dari sistem luar.

## 📁 File Structure

```
miora-gateway/
├── external_instruction_handler.py  # Main command processor
├── interface_endpoint.py           # Flask API + Web Interface
├── run_miora_gateway.py            # System runner
├── commands.json                   # Command queue file
├── miora_memory.json              # Memory storage
├── external_command_log.txt       # Execution logs
├── api_command_log.txt            # API request logs
└── README_MIORA_Gateway.md        # This file
```

## 🚀 Quick Start

### 1. Install Requirements
```bash
pip install flask
```

### 2. Run the Gateway System
```bash
python run_miora_gateway.py
```

### 3. Choose Operation Mode
- **Option 1**: Command Handler only (monitors commands.json)
- **Option 2**: API Interface only (web + API)
- **Option 3**: Both (recommended)
- **Option 4**: Create sample commands

## 🔧 Usage Methods

### Method 1: File-based Commands
1. Edit `commands.json` with your commands:
```json
[
  "PRINT: Hello MIORA",
  "CREATE_FILE: test.txt",
  "SPEAK_NOW: System ready"
]
```

2. The handler will automatically process them every 5 seconds

### Method 2: Web Interface
1. Open http://localhost:5000 in your browser
2. Use the web form to send commands
3. Choose from preset commands or enter custom ones

### Method 3: API Calls
```bash
# Send command via API
curl -X POST http://localhost:5000/api/command \
  -H "Content-Type: application/json" \
  -d '{"command": "PRINT: Hello from API", "source": "curl"}'

# Check status
curl http://localhost:5000/api/status

# Clear queue
curl -X POST http://localhost:5000/api/clear
```

## 📋 Supported Commands

| Command | Description | Example |
|---------|-------------|---------|
| `PRINT` | Print message to console | `PRINT: Hello MIORA` |
| `CREATE_FILE` | Create and save file | `CREATE_FILE: output.txt` |
| `SPEAK_NOW` | Text-to-speech | `SPEAK_NOW: System ready` |
| `VOICE_SPEAK` | Same as SPEAK_NOW | `VOICE_SPEAK: Hello world` |
| `UPDATE_MEMORY` | Store data in memory | `UPDATE_MEMORY: key=value` |
| `UPDATE_BRAIN` | Update knowledge base | `UPDATE_BRAIN: creator=Midya` |
| `RUN_MODULE` | Execute Python module | `RUN_MODULE: my_module` |
| `MEMORY_BACKUP` | Backup memory to file | `MEMORY_BACKUP: backup.json` |
| `SET_MODE` | Set operational mode | `SET_MODE: learning` |
| `RESTART_SYSTEM` | Restart the gateway | `RESTART_SYSTEM` |

## 📝 Log Files

- **external_command_log.txt**: All command executions
- **api_command_log.txt**: API requests and responses
- **miora_memory.json**: Persistent memory storage

## 🔒 Security Features

- Command validation and sanitization
- Execution logging for audit trail
- Source tracking (file, API, web)
- Error handling and recovery

## 🌟 Integration Examples

### Python Integration
```python
import json

# Add command to queue
commands = ["PRINT: Hello from Python script"]
with open("commands.json", "w") as f:
    json.dump(commands, f)
```

### JavaScript Integration
```javascript
// Send command via fetch API
fetch('http://localhost:5000/api/command', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        command: 'PRINT: Hello from JavaScript',
        source: 'web_app'
    })
});
```

### Command Line Integration
```bash
# Add command to file
echo '["PRINT: Hello from shell"]' > commands.json

# Or use API
curl -X POST http://localhost:5000/api/command \
  -H "Content-Type: application/json" \
  -d '{"command": "CREATE_FILE: shell_output.txt"}'
```

## 🎯 Use Cases

1. **Automated Scripts**: Let cron jobs or scheduled tasks send commands
2. **IoT Integration**: Receive commands from sensors or devices
3. **Remote Control**: Control MIORA from mobile apps or web dashboards
4. **System Monitoring**: External systems can trigger MIORA actions
5. **Batch Processing**: Process multiple commands from files
6. **API Integration**: Connect with other services and platforms

## 🔧 Customization

### Adding New Commands
1. Edit `external_instruction_handler.py`
2. Add command to `supported_commands` list
3. Implement `execute_[command_name]` method
4. Add case in `execute_command` method

### Custom Modules
Create Python modules that can be called via `RUN_MODULE`:
```python
# my_custom_module.py
def main():
    # Your custom logic here
    return "Custom module executed successfully"
```

## 🚀 Advanced Features

- **Auto-restart**: System can restart itself via command
- **Memory persistence**: Data survives restarts
- **Multi-source support**: Handle commands from various sources
- **Batch processing**: Process multiple commands efficiently
- **Real-time monitoring**: Live status updates via API
- **Cross-platform TTS**: Works on Windows, macOS, and Linux

## 📞 Support

The MIORA External Command Gateway is designed to be:
- **Independent**: Runs separately from Lovable
- **Extensible**: Easy to add new commands and features
- **Reliable**: Robust error handling and logging
- **Accessible**: Multiple interfaces (file, web, API)

Perfect for creating autonomous systems that can interact with MIORA programmatically!
