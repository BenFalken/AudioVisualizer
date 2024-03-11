# imports
import matplotlib.pyplot as plt
import numpy as np
import wave, sys, os
from pydub import AudioSegment
 
# shows the sound waves
def visualize(name: str):
   
    # reading the audio file

    path = f"/Users/benfalken/Desktop/W24-Assignment-2/"

    #sound = AudioSegment.from_mp3(f"{path}.mp3")
    #sound.export(f"{path}.wav", format="wav")

    raw = wave.open(f"{path}{name}")

    print(raw)
     
    # reads all the frames 
    # -1 indicates all or max frames
    signal = raw.readframes(-1)
    signal = np.frombuffer(signal, dtype ="int16")
     
    # gets the frame rate
    f_rate = raw.getframerate()
 
    # to Plot the x-axis in seconds 
    # you need get the frame rate 
    # and divide by size of your signal
    # to create a Time Vector 
    # spaced linearly with the size 
    # of the audio file
    time = np.linspace(
        0, # start
        len(signal) / f_rate,
        num = len(signal)
    )

    signal_str = str([val for val in signal])[1:-1]
    print(f_rate)
    with open('signal.txt', 'w') as output:
        output.write(signal_str)
 
    
 
 
if __name__ == "__main__":
   
    # gets the command line Value
    path = sys.argv[1]
 
    visualize(path)