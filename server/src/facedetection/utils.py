import numpy as np
import cv2
import os
import json

def get_fd_cords(img):
	cascade_dir = 'static/cascades/data/haarcascade_frontalface_alt2.xml'
	base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

	path = os.path.normpath(os.path.join(base_dir, cascade_dir))

	face_cascade = cv2.CascadeClassifier(path)

	image = np.asarray(bytearray(img.read()), dtype="uint8")

	gray = cv2.imdecode(image, cv2.IMREAD_GRAYSCALE) # COLOR_BGR2GRAY

	faces = face_cascade.detectMultiScale(gray, 1.1, 5)

	cords = []
	for (x, y, w, h) in faces:
		cords.append({'x': int(x), 'y': int(y), 'xw': int(x + w), 'yh': int(y + h)})

	return json.dumps(cords)