import express from "express";
import dotenv from "dotenv";




dotenv.config();


const app = express();
app.use(express.json());
app.post("/weather", async (req, res) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ error: "City is required." });
  }
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.KEY}&q=${city}`
    );

    const data = await response.json(); 

    if (!response.ok) {
      return res.status(404).json({ error: "city not found" });
    }
  

    return res.status(200).json({
      city: data.location.name,
      temperature: data.current.temp_c,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch weather data." });
  }
});

app.listen(3000, () => {
  console.log(` Server running at port 3000`);
});
