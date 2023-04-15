const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const ripple = require('ripple-lib').RippleAPI;
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const api = new ripple({
  server: 'wss://s.altnet.rippletest.net:51233' // Testnet server
});

const PORT = process.env.PORT || 5001; // Change 5000 to 5001 or another available port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


//connect to the testnet
api.connect().then(() => {
    console.log('Connected to XRPL Testnet');
  }).catch(console.error);

  
//multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });

  //endpoint for NFT minting 
  app.post('/mint', upload.single('image'), async (req, res) => {
  // File information
  const file = req.file;

  // XRPL address and secret from user input
  const { address, secret } = req.body;

  // Additional checks for address and secret validation can be added here

  // Generate metadata URI (in this example, assume the file is accessible via its filename)
  //const metadataURI = 'http://localhost:3000/add' + file.filename;
  const metadataURI = 'http://localhost:5001/uploads/' + file.filename;



  // Mint NFT on XRPL
  try {
    const preparedTx = await api.prepareTransaction({
      TransactionType: 'Payment',
      Account: address,
      Destination: address,
      Amount: '1', // 1 drop, the smallest unit on XRPL
      Memos: [
        {
          Memo: {
            MemoType: 'NFT',
            MemoData: metadataURI
          }
        }
      ]
    }, {
      maxLedgerVersionOffset: 5
    });

    const signedTx = api.sign(preparedTx.txJSON, secret);
    const submitResult = await api.submit(signedTx.signedTransaction);

    if (submitResult.resultCode === 'tesSUCCESS') {
      res.status(200).json({ success: true, message: 'NFT minted successfully.' });
    } else {
      res.status(400).json({ success: false, message: 'Failed to mint NFT.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error minting NFT.', error });
  }
});
