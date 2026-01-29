const { itrsConn } = require("../config/db");

class ItrsController {
  async getItrsData(req, res) {
    try {
      const data = await itrsConn()
        .collection("requests")
        .find()
        .toArray();

        console.log("Hello therre from backend")

      res.status(200).json(data);
    } catch (error) {
      console.error("ITRS fetch error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = new ItrsController();
