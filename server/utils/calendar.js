const { google } = require('googleapis');
const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');

// --- GOOGLE CALENDAR ---
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/google/callback" // adjust for deployment
);

exports.addToGoogleCalendar = async (tokens, booking) => {
  oauth2Client.setCredentials(tokens);

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  const event = {
    summary: 'Consultation Booking',
    description: `With consultant via ${booking.method}`,
    start: { dateTime: `${booking.date}T${booking.startTime}:00`, timeZone: 'UTC' },
    end: { dateTime: `${booking.date}T${booking.endTime}:00`, timeZone: 'UTC' },
  };

  await calendar.events.insert({
    calendarId: 'primary',
    resource: event,
  });
};

// --- MICROSOFT CALENDAR ---
exports.addToMicrosoftCalendar = async (accessToken, booking) => {
  const client = Client.init({ authProvider: done => done(null, accessToken) });

  await client.api('/me/events').post({
    subject: 'Consultation Booking',
    body: { contentType: 'HTML', content: `Consultation via ${booking.method}` },
    start: { dateTime: `${booking.date}T${booking.startTime}:00`, timeZone: 'UTC' },
    end: { dateTime: `${booking.date}T${booking.endTime}:00`, timeZone: 'UTC' },
  });
};
