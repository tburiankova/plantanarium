function catchErrors(error, displayError) {
  let errorMsg;
  if (error.response) {
    // request was made and server responded with a status cose, which is not 200-something
    errorMsg = error.response.data;
    console.error('Getting an error response', errorMsg);

    // Cloudinary specific
    if (error.response.data.error) {
      errorMsg = error.response.data.error.message;
    }
  } else if (error.request) {
    // request was made, but no response was received
    errorMsg = error.request;
    console.error('Error request', errorMsg);
  } else {
    // something else occurred
    errorMsg = error.message;
    console.error('Error message', errorMsg);
  }
  displayError(errorMsg);
}

export default catchErrors;
