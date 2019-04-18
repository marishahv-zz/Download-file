import React from "react";

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { certificate: {
        id: 123,
        private: {
            body: ["any binary data"]
        }
    } };
  }
  
  download(certData) {
    var certBody = certData.private.body;
    var cerID = certData.id;

    var byteArray = new Uint8Array(certBody);
    var a = document.getElementById('downloadCert' + cerID);
    var blobObject = new Blob([byteArray], { type: 'application/x-pkcs12' });   //Creates file-like object of immutable, raw data (i.e. an array of binary data)
    var fileName = "certificate.pfx";

    //For IE
    if (navigator.msSaveBlob) {
      window.navigator.msSaveOrOpenBlob(blobObject, fileName);
    } else {
      //For non-IE
      window.URL = window.URL || window.webkitURL;
      var url = window.URL.createObjectURL(blobObject);     //Creates DOMString that is URL to the object, specified as a parameter
      a.href = url;
      a.download = fileName;

      setTimeout(function () {
        window.URL.revokeObjectURL(url);
      }, 100);
    }
  }

  render() {
    return (
        <a id={"downloadCert" + this.state.certificate.id} className="any-css" onClick={this.download.bind(this, this.state.certificate)} download="" href="#"></a>
    );
  }
}
