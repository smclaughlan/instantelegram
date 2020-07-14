
const production = process.env.NODE_ENV === "production";
const apiBaseUrl = production ? "https://instantelegramback.herokuapp.com" : process.env.REACT_APP_API_BASE_URL;

module.exports = {
    apiBaseUrl: apiBaseUrl,
    cloudinaryUrl: process.env.REACT_APP_CLOUDINARY_URL,
    cloudinaryPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
}