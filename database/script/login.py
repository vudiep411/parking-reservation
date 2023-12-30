import requests
import json

# Login as a dummy user
def main():
    AUTH_URL = "https://parking-reservation.vercel.app/login"
    dummy_account = {
        "email": "admin@gmail.com",
        "password": "admin"
    }
    headers = {
        'Content-Type': 'application/json',
    }
    response = requests.post(url=AUTH_URL, data=json.dumps(dummy_account), headers=headers)
    # Check if the request was successful
    if response.status_code == 200:
        result = response.json()
        return result["token"]

    else:
        print(f'Error: {response.status_code} - {response.text}')
        return ""


if __name__ == "__main__":
    print(main())