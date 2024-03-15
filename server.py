import sys
import numpy as np
#import pydub
from scipy.io import wavfile
import scipy.fftpack as fft
import matplotlib.pyplot as plt # just for testing
import os.path
import json

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
data_str = str([val for val in yM])[1:-1]
with open('data.txt', 'w') as output:
    output.write(data_str)

print('done')

def make_fft(buf):
    if len(buf) == 0:
        return [0 for _ in range(25)]
    N = len(buf)
    # calculate fourier transform of sample
    Y = fft.fft(buf)
    magY = np.absolute(fft.fftshift(Y))
    amplitudes = []
    bin_size = int(N/25)
    for i in range(25):
        try:
            amplitudes.append(np.mean(magY[bin_size*i:bin_size*i + bin_size]))
        except:
            amplitudes.append(0)
    return amplitudes

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
    from http.server import HTTPServer, BaseHTTPRequestHandler, SimpleHTTPRequestHandler
    import socketserver
    import simplejson

    
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
    

    class S(SimpleHTTPRequestHandler):
        def _set_headers(self):
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()

        def do_GET(self):
            print ("MY SERVER: I got a GET request.")
            if self.path == '/':
                print ("MY SERVER: The GET request is for the root URL.")
                self.path = 'index.html'
            return http.server.SimpleHTTPRequestHandler.do_GET(self)

        def do_HEAD(self):
            self._set_headers()

        def do_POST(self):
            content_length = int(self.headers['Content-Length'])
            # Read the POST data
            post_data = self.rfile.read(content_length).decode('utf-8')
            # Parse the POST data
            post_params = json.loads(post_data)
            # Retrieve any parameters sent from the client
            chunk = post_params.get('param')

            # Construct response data
            response_data = {'result': make_fft(chunk)}
            
            # Send response
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response_data).encode('utf-8'))
    
    S.extensions_map={
        '.manifest': 'text/cache-manifest',
        '.html': 'text/html',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.svg': 'image/svg+xml',
        '.css': 'text/css',
        '.js':  'application/x-javascript',
        '': 'application/octet-stream', # Default
    }


    httpd = socketserver.TCPServer(("", PORT), S)

    print("serving at port", PORT)
    httpd.serve_forever()
