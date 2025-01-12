import express, { Router, Request, Response } from "express";
import axios from "axios";

const router: Router = express.Router();

const WIKI_API_URL = "https://en.wikipedia.org/w/api.php";
const TITLE = "List_of_ursids";
const WIKITEXT_SECTION_INDEX = 3;

router.get("/bear-data", async (req: Request, res: Response): Promise<void> => {
  try {
    const params = {
      action: "parse",
      page: TITLE,
      prop: "wikitext",
      section: String(WIKITEXT_SECTION_INDEX),
      format: "json",
      origin: "*",
    };

    const response = await axios.get(WIKI_API_URL, { params });
    const wikitext = response.data?.parse?.wikitext?.["*"];

    if (wikitext) {
      res.json({ wikitext });
    } else {
      res.status(500).send("Failed to fetch bear data.");
    }
  } catch (error) {
    console.error("Error fetching bear data:", error);
    res.status(500).send("Internal server error.");
  }
});

router.get(
  "/bear-image",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const fileName = req.query.fileName as string;

      if (!fileName) {
        res.status(400).send("Missing file name.");
        return;
      }

      const params = {
        action: "query",
        titles: `File:${fileName}`,
        prop: "imageinfo",
        iiprop: "url",
        format: "json",
        origin: "*",
      };

      const response = await axios.get(WIKI_API_URL, { params });
      const pages = response.data?.query?.pages as Record<
        string,
        { imageinfo?: { url: string }[] }
      >;
      const firstPage = Object.values(pages)[0];
      const imageUrl = firstPage?.imageinfo?.[0]?.url;

      if (imageUrl) {
        res.json({ imageUrl });
      } else {
        res.status(404).send("Image not found.");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      res.status(500).send("Internal server error.");
    }
  }
);

export default router;
