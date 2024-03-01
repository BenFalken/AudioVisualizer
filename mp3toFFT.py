import numpy as np
import pydub
from scipy.io import wavfile
import scipy.fftpack as fft
import matplotlib.pyplot as plt # just for testing


 # load audio (just wav files atm), fs is the sampling freq. and y is both audio channels as an Nx2 matrix
fs, y = wavfile.read('jellyfish_jam.wav')

##s = open("spec.txt", "w")
##dat = open("y.txt","w")

# mean of left and right channels
yM = np.mean(y, axis=1) * 10**-4

buf_time = 0.017 #sec
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



## def audioread(x):
##    audio = pydub.AudioSegment.from_mp3(x)
##    y = np.array(a.get_array_of_samples())
##    fs = a.frame_rate
##    if a.channels == 2:
##        y = y.reshape((-1, 2))
##    return fs, y
##
##sr, x = audioread('sample_cropped.mp3')
##print(x)

