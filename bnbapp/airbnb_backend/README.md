# Airbnb Backend Authentication System

This project is a backend implementation for an Airbnb-like system, focusing on authentication for users, hosts, and administrators. It is built using Django and follows a modular structure to separate concerns.

## Project Structure

```
airbnb_backend
├── src
│   ├── accounts          # User account management
│   ├── hosts             # Host management
│   ├── authentication     # Authentication logic
│   ├── core              # Core project settings and configurations
│   └── manage.py         # Command-line utility for managing the project
├── requirements.txt      # Project dependencies
└── README.md             # Project documentation
```

## Features

- User registration and profile management
- Host registration and management
- Custom authentication backends
- RESTful API endpoints for accounts and hosts

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd airbnb_backend
   ```
3. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage

To run the development server, use the following command:
```
python src/manage.py runserver
```

## License

This project is licensed under the MIT License.