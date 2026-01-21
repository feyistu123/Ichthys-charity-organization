const Donation = require("../models/Donation");
const Project = require("../models/Project");
const url = require("url");

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

const donate = async (req, res) => {
  try {
    console.log("Donation request body:", req.body);
    const { fullName, email, amount, projectId, donorName, donorEmail } =
      req.body;

    // Handle both field name formats
    const name = donorName || fullName;
    const emailAddr = donorEmail || email;
    const donationAmount = Number(amount);

    console.log("Processed fields:", {
      name,
      emailAddr,
      donationAmount,
      projectId,
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

    const donation = new Donation({
      donorName: name,
      donorEmail: emailAddr,
      amount: donationAmount,
      projectId: projectId || null,
    });

    await donation.save();
    console.log("Donation saved:", donation);

    if (projectId) {
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { $inc: { raisedAmount: donationAmount } },
        { new: true },
      );
      console.log("Project updated:", updatedProject);
    }

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Donation successful", donation }));
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
