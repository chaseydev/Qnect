import segno
from segno import helpers

# Create a WIFI config with min. error level "L" or better
config = helpers.make_wifi_data(ssid='HUAWEI-2.4G-u6nR', password='9z4287fP', security='WPA')
# qrcode.designator
print(config)
qrcode = segno.make(config, error='h')

qrcode.save('wifi.png')