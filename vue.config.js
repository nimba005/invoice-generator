module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/invoice-generator/'  // Ensure this matches your GitHub repository name exactly
    : '/'
};
