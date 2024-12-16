import os

from dotenv import load_dotenv
import paramiko

load_dotenv()

#Establish SFTP (Secure File Transfer Protocol) between Rasberry PI and This PC
transport = paramiko.Transport(os.getenv("RASPBERRY_PI_IP"), 22) # Port 22 is SFTC. Port 21 is FTC
transport.connect(username=os.getenv("RASPBERRY_PI_USERNAME"), password=os.getenv("RASPBERRY_PI_PASSWORD"))
SFTP = paramiko.SFTPClient.from_transport(transport)

def add_image_to_raspberry_pi(localImageLocation):
    try:
        image_id = count_files("/home/pi/MathIt/images")
        remoteImageLocation = "/home/pi/MathIt/images/" + str(image_id) + ".jpg"
        SFTP.put(localImageLocation, remoteImageLocation)

        return str(image_id)
    except Exception as error:
        print("Problem with uploading Image to the Rasberry PI: ")
        raise error
   

def retrieve_image_from_raspberry_pi(image_id):
    remote_image_location = "/home/pi/MathIt/images/" + image_id + ".jpg"
    
    try:
        local_image_location = "../frontend/src/assets/temp/" + image_id + ".jpg"
        SFTP.get(remote_image_location, local_image_location)
    except Exception as error:
        print("Problem Getting the image from the Rasberry PI: ")
        raise error  

# This function attempts to remove an image from the raspberry pi
# It returns 1 if it was successful and 0 otherwise. 
def remove_image_from_raspberry_pi(image_id):
    image_location = "/home/pi/MathIt/images/" + image_id
    try:
        SFTP.remove(image_location)
        return 1
    except Exception as error:
        print("Problem removing the image. Maybe it does not exist. ")
        raise error

def close_SFTP_connection():
    SFTP.close()
    transport.close()

def count_files(directory):
    try:
        file_list = SFTP.listdir(directory)
        return len(file_list)
    except Exception as error:
        print("Error in counting the files " + error)
        raise error