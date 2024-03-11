import sys
import numpy as np
#import pydub
from scipy.io import wavfile
import scipy.fftpack as fft
import matplotlib.pyplot as plt # just for testing
import os.path

# prompt user for file
path = ("")

path = input("File path: ")
while(os.path.exists(path) != True):
    path = input("File not found. Please try again: ")
while(path.split(".")[1] != "wav"):
    path = input("." + path.split(".")[1] + " not supported. Please try again: ")
with open('path.txt', 'w') as output:
    output.write(path)
 # load audio (just wav files atm), fs is the sampling freq. and y is both audio channels as an Nx2 matrix
fs, y = wavfile.read(path)

# mean of left and right channels
yM = np.mean(y, axis=1) * 10**-4

buf_time = 0.034 #sec
buf_size = int(buf_time*fs)

data = np.empty(int(yM.size/25))

offset = 0

# extract audio samples
while len(yM) > 0:
    buf, yM = yM[:buf_size], yM[buf_size:]

    N = len(buf)
    t = np.linspace(0, buf_time, buf_size)
    
    # calculate fourier transform of sample
    Y = fft.fft(buf)
    magY = np.absolute(fft.fftshift(Y))
    amplitudes = np.empty(25)
    bin_size = int(buf_size/25)
    for i in range(25):
        try:
            amplitudes[i] = np.mean(magY[bin_size*i:bin_size*i + bin_size])
        except:
            continue
    try:
        data[offset:offset+25] = amplitudes
    except:
        pass
    offset += 25

data_str = str([val for val in data])[1:-1]
with open('data.txt', 'w') as output:
    output.write(data_str)

print('done')

PORT = 8000

if sys.version_info < (3, 0):
    import SimpleHTTPServer
    import SocketServer

    class Handler(SimpleHTTPServer.SimpleHTTPRequestHandler):
        pass

    Handler.extensions_map = {
        '.manifest': 'text/cache-manifest',
        '.html': 'text/html',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.svg': 'image/svg+xml',
        '.css': 'text/css',
        '.js':  'application/x-javascript',
        '': 'application/octet-stream', # Default
    }
    
    httpd = SocketServer.TCPServer(("", PORT), Handler)

    print("serving at port", PORT)
    httpd.serve_forever()


else:
    import http.server
    from http.server import HTTPServer, BaseHTTPRequestHandler
    import socketserver

    Handler = http.server.SimpleHTTPRequestHandler

    Handler.extensions_map={
        '.manifest': 'text/cache-manifest',
        '.html': 'text/html',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.svg': 'image/svg+xml',
        '.css': 'text/css',
        '.js':  'application/x-javascript',
        '': 'application/octet-stream', # Default
    }

    httpd = socketserver.TCPServer(("", PORT), Handler)

    print("serving at port", PORT)
    httpd.serve_forever()
