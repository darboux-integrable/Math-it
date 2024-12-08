import os

from dotenv import load_dotenv
import paramiko

load_dotenv()

#Establish SFTP (Secure File Transfer Protocol) between Rasberry PI and This PC
transport = paramiko.Transport(os.getenv("RASBERRY_PI_IP"), 22) # Port 22 is SFTC. Port 21 is FTC
transport.connect(username=os.getenv("RASBERRY_PI_USERNAME"), password=os.getenv("RASBERRY_PI_PASSWORD"))
SFTP = paramiko.SFTPClient.from_transport(transport)

def add_image_to_rasberry_pi(localImageLocation):
    try:
        image_id = count_files("/home/pi/MathIt")
        remoteImageLocation = "/home/pi/MathIt/" + image_id
        SFTP.put(localImageLocation, remoteImageLocation)
    except Exception as error:
        print("Problem with uploading Image to the Rasberry PI: " + error)   

def retrieve_image_from_rasberry_pi(imageID):
    try:
        remoteImageLocation = "/home/pi/MathIt/" + imageID
        localImageLocation = "../frontend/src/assets/rasberryPIImages"
        SFTP.get(remoteImageLocation, localImageLocation)
    except Exception as error:
        print("Problem Getting the image from the Rasberry PI: " + error)  

def close_SFTP_connection():
    SFTP.close()
    transport.close()

def count_files(remote_dir):
    count = 0
    for entry in SFTP.listdir_attr(remote_dir):
        if entry.is_dir():
            continue  # Skip directories
        count += 1
    return count