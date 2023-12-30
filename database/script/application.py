import requests
import json
from datetime import datetime, timedelta
import sys
import asyncio
import time

async def cancel(URL, token, id):
    headers = {
        'Content-Type': 'application/json',
        "Authorization": f"{token}"
    }
    res = requests.delete(url=f"{URL}/cancel", data=json.dumps({"reservation_id": id}), headers=headers)
    return res.json()

async def reserve(URL, token):
    start_time = datetime.utcnow()
    end_time = start_time + timedelta(hours=2)
    reserve_data = {
        "user_id": 7,
        "parking_spot_id": "A102",
        "start_time": start_time.strftime('%Y-%m-%d %H:%M:%S'),
        "end_time": end_time.strftime('%Y-%m-%d %H:%M:%S'),
        "license_plate": "A22222"
    }
    headers = {
        'Content-Type': 'application/json',
        "Authorization": f"{token}"
    }
    response = requests.post(url=f"{URL}/reservation", data=json.dumps(reserve_data), headers=headers)
    if response.status_code < 299:
        return response.json()
    else:
        print(f'Error: {response.status_code} - {response.text}')
        return None
    
async def main():
    if len(sys.argv) > 1:
        token = sys.argv[1]
    
        API_URL = "https://parking-reservation-1xfb.vercel.app"
        response = await reserve(API_URL, token)
        if response:
            id = response["reservation"]["id"]
            print(f"Deleting Reservation {id}")
            res = await cancel(API_URL, token, id)
            print(res["message"])
        else:
            print("Failed to make a reservation")
    else:
        print("Please provide a JWT token")

if __name__ == "__main__":
    asyncio.run(main())