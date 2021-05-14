# I-GUARD

![ICON](https://github.com/prajyu/I-Guard/blob/main/images/preview.png "logo title text 1")


Turn your mobile into a **Smart CCTV**

## Installation

``` bash
// Clone the repository
git clone https://github.com/prajyu/I-Guard.git

// Open cloned directory
cd I-Guard

// Install package.json file
npm i

// Run Server 
node server
```

## Usage
**I-GUARD** detects face , takes snapshot and send it to server and save it locally. Also records a 10 min (default) video after detection.

All files can be accessed in `database` directory sorted by date

After installation and running the server open [http://localhost:3000](http://localhost:3000)
Select an option **user** or **environment** and *start camera*

---------------------------------
##### Enable SMS Provision (optional)
1. Create an account in [twilio](https://www.twilio.com/try-twilio)

2. After Login/Register get your

    • **Auth Token** 
 
    • **SID**  

    • **Twilio Phone Number**

    • **Message service ID**

3. Go to cloned directory and open ```.env``` file and paste the credentials accordingly

4. Comment out *send_sms1* and *send_sms2* lines in `server.js`

5. Restart the server

----------------------------------

You can use **port forwarding** services to make it available through a **HTTPS** link.

## License
MIT
