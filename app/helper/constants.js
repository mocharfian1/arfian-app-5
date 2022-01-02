class Constants {
    static UNAUTHORIZED_CODE = 401;
    static BAD_REQUEST_CODE = 400;
    static INTERNAL_SERVER_ERROR_CODE = 500;

    static UNAUTHORIZED_TEXT = "Unauthorized";
    static BAD_REQUEST_TEXT = "Parameter tidak lengkap";
    static INTERNAL_SERVER_ERROR_TEXT = "Server Error";

    static UNAUTHORIZED_RESPONSE = { status: this.UNAUTHORIZED_CODE, error: this.UNAUTHORIZED_TEXT };
    static BAD_REQUEST_RESPONSE = { status: this.BAD_REQUEST_CODE, error: this.BAD_REQUEST_TEXT };
    static INTERNAL_SERVER_ERROR_RESPONSE = { status: this.INTERNAL_SERVER_ERROR_CODE, error: this.INTERNAL_SERVER_ERROR_TEXT };
}

module.exports = Constants;
