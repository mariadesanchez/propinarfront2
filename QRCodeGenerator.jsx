/* eslint-disable no-unused-vars */
// QRCodeGenerator.jsx


import React from "react";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";

// eslint-disable-next-line react/prop-types
const QRCodeGenerator = ({urlApp}) => {
  return (
    <div className="qrcode-container">
      <QRCode value={urlApp} />
    </div>
  );
};

QRCodeGenerator.propTypes = {
  url: PropTypes.string.isRequired,
};

export default QRCodeGenerator;
