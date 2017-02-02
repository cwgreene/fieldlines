import base64
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('file')
parser.add_argument('output')
options = parser.parse_args()
data = ''
with open(options.file) as afile:
    data = afile.read()
    header, data = data.split(",",1)
    data = base64.decodestring(data)
with open(options.output, 'w') as output:
    output.write(data)