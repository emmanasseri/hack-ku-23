import React, { useState } from 'react';

const MintNFT = () => {
  const [address, setAddress] = useState('');
  const [secret, setSecret] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('address', address);
    formData.append('secret', secret);
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5001/mint', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        alert('NFT minted successfully');
      } else {
        alert('Error minting NFT: ' + result.message);
      }
    } catch (error) {
      alert('Error minting NFT: ' + error);
    }
  };

  return (
    <div>
      <h2>Mint NFT</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Secret:
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Image:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </label>
        <br />
        <button type="submit">Mint NFT</button>
      </form>
    </div>
  );
};

export default MintNFT;
