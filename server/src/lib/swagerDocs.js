const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Courier & Parcel Management API",
      version: "1.0.0",
      description: "API for Logistics, Parcel Tracking, and Admin Management",
    },
    servers: [
      { url: "http://localhost:5000", description: "Local Development" },
      {
        url: "https://courier-and-parcel.onrender.com",
        description: "Production Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    paths: {
      // --- AUTH ROUTES ---
      "/api/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Register User",
          responses: { 201: { description: "Created" } },
        },
      },
      "/api/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login User",
          responses: { 200: { description: "OK" } },
        },
      },
      "/api/auth/me": {
        get: {
          tags: ["Auth"],
          security: [{ bearerAuth: [] }],
          summary: "Get Profile",
          responses: { 200: { description: "OK" } },
        },
      },

      // --- PARCEL ROUTES ---
      "/api/book-parcel": {
        post: {
          tags: ["Parcels"],
          security: [{ bearerAuth: [] }],
          summary: "Book a New Parcel",
          responses: { 201: { description: "Booked" } },
        },
      },
      "/api/:parcelId/track": {
        get: {
          tags: ["Parcels"],
          security: [{ bearerAuth: [] }],
          summary: "Track Parcel Status",
          parameters: [{ name: "parcelId", in: "path", required: true }],
          responses: { 200: { description: "OK" } },
        },
      },
      "/api/all-bookings": {
        get: {
          tags: ["Parcels"],
          security: [{ bearerAuth: [] }],
          summary: "View Booking History",
          responses: { 200: { description: "OK" } },
        },
      },
      "/api/all-bookings/{parcelId}": {
        put: {
          tags: ["Parcels"],
          security: [{ bearerAuth: [] }],
          summary: "Update Booking",
          parameters: [{ name: "parcelId", in: "path", required: true }],
          responses: { 200: { description: "Updated" } },
        },
        delete: {
          tags: ["Parcels"],
          security: [{ bearerAuth: [] }],
          summary: "Cancel/Delete Booking",
          parameters: [{ name: "parcelId", in: "path", required: true }],
          responses: { 200: { description: "Deleted" } },
        },
      },

      // --- AGENT ROUTES ---
      "/api/parcels/assigned": {
        get: {
          tags: ["Agent"],
          security: [{ bearerAuth: [] }],
          summary: "View Assigned Parcels",
          responses: { 200: { description: "OK" } },
        },
      },
      "/api/parcels/{parcelId}/status": {
        put: {
          tags: ["Agent"],
          security: [{ bearerAuth: [] }],
          summary: "Update Delivery Status",
          parameters: [{ name: "parcelId", in: "path", required: true }],
          responses: { 200: { description: "Updated" } },
        },
      },

      // --- ADMIN ROUTES ---
      "/api/parcels/{parcelId}/assign": {
        put: {
          tags: ["Admin"],
          security: [{ bearerAuth: [] }],
          summary: "Assign Agent to Parcel",
          parameters: [{ name: "parcelId", in: "path", required: true }],
          responses: { 200: { description: "Assigned" } },
        },
      },
      "/api/users": {
        get: {
          tags: ["Admin"],
          security: [{ bearerAuth: [] }],
          summary: "Get All Users",
          responses: { 200: { description: "OK" } },
        },
      },
      "/api/users/{userId}": {
        put: {
          tags: ["Admin"],
          security: [{ bearerAuth: [] }],
          summary: "Update User Role",
          parameters: [{ name: "userId", in: "path", required: true }],
          responses: { 200: { description: "Updated" } },
        },
        delete: {
          tags: ["Admin"],
          security: [{ bearerAuth: [] }],
          summary: "Delete User",
          parameters: [{ name: "userId", in: "path", required: true }],
          responses: { 200: { description: "Deleted" } },
        },
      },
      "/api/agents": {
        get: {
          tags: ["Admin"],
          security: [{ bearerAuth: [] }],
          summary: "Get All Agents",
          responses: { 200: { description: "OK" } },
        },
      },
      "/api/metrics": {
        get: {
          tags: ["Admin"],
          security: [{ bearerAuth: [] }],
          summary: "Dashboard Stats",
          responses: { 200: { description: "OK" } },
        },
      },
      "/api/reports/bookings": {
        get: {
          tags: ["Admin"],
          security: [{ bearerAuth: [] }],
          summary: "Export CSV Report",
          responses: { 200: { description: "File Blob" } },
        },
      },
    },
  },
  apis: [], // Keep this empty so it only uses the definitions above
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
