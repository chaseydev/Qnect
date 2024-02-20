import segno
from segno import helpers

# Create a WIFI config with min. error level "L" or better
config = helpers.make_wifi_data(ssid='', password='', security='WPA')
# qrcode.designator
print(config)
qrcode = segno.make(config, error='h')

qrcode.save('wifi.png')