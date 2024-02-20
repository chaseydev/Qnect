import axios from 'axios';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    emailAddress: '',
    urlLink: ''
  });
  const [qrCodeImage, setQRCodeImage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await axios.post('generate-contact-qr/', formData, {
        responseType: 'arraybuffer' // Ensure the response is received as binary data
      });
      const base64Image = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      setQRCodeImage(`data:image/png;base64,${base64Image}`);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred while submitting the form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Form Page</h1>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="emailAddress" className="form-label">Email Address:</label>
              <input
                type="email"
                className="form-control"
                id="emailAddress"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="urlLink" className="form-label">URL Link:</label>
              <input
                type="url"
                className="form-control"
                id="urlLink"
                name="urlLink"
                value={formData.urlLink}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="col-md-6">
          <div className="mt-4">
            <div className="mt-3">
              {qrCodeImage && (
                <img src={qrCodeImage} alt="QR Code" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormPage;
