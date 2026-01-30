const Donation = require("../models/Donation");
const Project = require("../models/Project");
const url = require("url");
const fs = require("fs");
const path = require("path");
const { verifyAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const donationRoutes = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  if (path === "/api/donations" && method === "GET") {
    getAllDonations(req, res);
    return true;
  }

  if (path === "/api/donations" && method === "POST") {
    donate(req, res);
    return true;
  }

  if (path === "/api/donations/donate" && method === "POST") {
    donate(req, res);
    return true;
  }

  if (path === "/api/admin/stats" && method === "GET") {
    getAdminStats(req, res);
    return true;
  }

  // Admin: confirm a pending donation (mark completed and update project totals)
  if (path.startsWith("/api/admin/donations/confirm/") && method === "PATCH") {
    // admin-only
    const id = path.split("/").pop();
    verifyAdmin(req, res, async () => {
      await confirmDonation(req, res, id);
    });
    return true;
  }

  // Public: get banks config
  if (path === "/api/banks" && method === "GET") {
    return getBanks(req, res);
  }

  if (path === "/api/donations/latest" && method === "GET") {
    return getLatestDonation(req, res);
  }

  // Admin: upload or update bank logo/details (multipart)
  if (path === "/api/admin/banks/upload" && method === "POST") {
    verifyAdmin(req, res, () => {
      upload(req, res, async (err) => {
        if (err) {
          res.writeHead(400, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ error: err.message }));
        }
        await uploadBank(req, res);
      });
    });
    return true;
  }

  return false;
};

const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate("projectId");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(donations));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
};

const getLatestDonation = async (req, res) => {
  try {
    const donation = await Donation.findOne()
      .sort({ donationDate: -1 })
      .populate("projectId");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(donation || {}));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
};

const donate = async (req, res) => {
  try {
    console.log("Donation request body:", req.body);
    const {
      fullName,
      email,
      amount,
      projectId,
      donorName,
      donorEmail,
      paymentMethod,
      bankName,
      bankAccount,
      senderAccount,
      transactionRef,
    } = req.body;

    // Handle both field name formats
    const name = donorName || fullName;
    const emailAddr = donorEmail || email;
    const donationAmount = Number(amount);

    console.log("Processed fields:", {
      name,
      emailAddr,
      donationAmount,
      projectId,
      paymentMethod,
      bankName,
    });

    if (!name || !emailAddr || !donationAmount || donationAmount <= 0) {
      console.log("Validation failed:", {
        name: !!name,
        emailAddr: !!emailAddr,
        donationAmount,
      });
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing or invalid required fields" }));
      return;
    }

    // If bank transfer, mark pending and don't immediately update project raisedAmount
    const isBank = paymentMethod === "Bank Transfer";
    const donation = new Donation({
      donorName: name,
      donorEmail: emailAddr,
      amount: donationAmount,
      projectId: projectId || null,
      paymentMethod: paymentMethod || "Credit Card",
      bankName: bankName || null,
      bankAccount: bankAccount || null,
      senderAccount: senderAccount || null,
      transactionRef: transactionRef || null,
      status: isBank ? "pending" : "completed",
    });

    await donation.save();
    console.log("Donation saved:", donation);

    if (projectId && !isBank) {
      // Only increment project raisedAmount when payment is completed (non-bank immediate)
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { $inc: { raisedAmount: donationAmount } },
        { new: true },
      );
      console.log("Project updated:", updatedProject);
    }

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Donation recorded", donation }));
  } catch (error) {
    console.error("Donation error:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
};

const getAdminStats = async (req, res) => {
  try {
    const totalRaised = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const monthlyRaised = await Donation.aggregate([
      {
        $match: {
          donationDate: {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalDonors = await Donation.distinct("donorEmail").then(
      (emails) => emails.length,
    );
    const volunteers = await require("../models/Volunteer").countDocuments();
    const activeProjects = await Project.countDocuments({ status: "Active" });

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        totalRaised: totalRaised[0]?.total || 0,
        monthlyRaised: monthlyRaised[0]?.total || 0,
        totalDonors,
        volunteers,
        activeProjects,
      }),
    );
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
};

module.exports = donationRoutes;

// --- Helpers: confirmDonation, banks management ---
const confirmDonation = async (req, res, id) => {
  try {
    const donation = await Donation.findById(id);
    if (!donation) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Donation not found" }));
    }

    if (donation.status === "completed") {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Donation already completed" }));
    }

    // optional transactionRef from body
    const { transactionRef } = req.body || {};
    donation.status = "completed";
    if (transactionRef) donation.transactionRef = transactionRef;
    await donation.save();

    // If donation associated with a project, increment its raised amount
    if (donation.projectId) {
      await Project.findByIdAndUpdate(
        donation.projectId,
        { $inc: { raisedAmount: donation.amount } },
        { new: true },
      );
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Donation confirmed", donation }));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: error.message }));
  }
};

const BANKS_FILE = path.join(__dirname, "..", "config", "banks.json");

const getBanks = (req, res) => {
  try {
    if (!fs.existsSync(BANKS_FILE)) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify([]));
    }
    const raw = fs.readFileSync(BANKS_FILE, "utf8");
    const banks = JSON.parse(raw || "[]");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(banks));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
};

const uploadBank = async (req, res) => {
  try {
    const { bankId, name, account, swift } = req.body || {};
    const logoPath = req.file ? `/uploads/${req.file.filename}` : null;

    let banks = [];
    if (fs.existsSync(BANKS_FILE)) {
      banks = JSON.parse(fs.readFileSync(BANKS_FILE, "utf8") || "[]");
    }

    const existing = banks.find((b) => b.id === bankId);
    if (existing) {
      existing.name = name || existing.name;
      existing.account = account || existing.account;
      existing.swift = swift || existing.swift;
      if (logoPath) existing.logoUrl = logoPath;
    } else {
      banks.push({ id: bankId, name, account, swift, logoUrl: logoPath });
    }

    // ensure config dir exists
    const cfgDir = path.dirname(BANKS_FILE);
    if (!fs.existsSync(cfgDir)) fs.mkdirSync(cfgDir, { recursive: true });
    fs.writeFileSync(BANKS_FILE, JSON.stringify(banks, null, 2), "utf8");

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Bank saved", banks }));
  } catch (err) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
};
