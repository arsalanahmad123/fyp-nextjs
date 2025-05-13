import 'server-only';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const {
    NODEMAILER_GOOGLE_SMTP_USER,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    NODEMAILER_GOOGLE_REFRESH_TOKEN,
} = process.env;

const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    'http://localhost:3000/api/auth/callback/google'
);

oAuth2Client.setCredentials({
    refresh_token: NODEMAILER_GOOGLE_REFRESH_TOKEN,
});

export const getTransport = async () => {
    try {
        const accessTokenObj = await oAuth2Client.getAccessToken();
        const accessToken = accessTokenObj?.token;

        if (!accessToken) throw new Error('Failed to retrieve access token');

        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: NODEMAILER_GOOGLE_SMTP_USER,
                clientId: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                refreshToken: NODEMAILER_GOOGLE_REFRESH_TOKEN,
                accessToken,
            },
        });
    } catch (err) {
        console.error('Error setting up Nodemailer transport:', err);
        throw err;
    }
};
