import express from 'express';
import puppeteer from 'puppeteer';

export async function testController(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // Just for some testing

  // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  // Website URL to export as pdf
  const website_url =
    'https://pariavgpvgithub-s3po--3000.local-credentialless.webcontainer.io';

  // Open URL in current page
  await page.goto(website_url, { waitUntil: 'networkidle0' });

  //To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen');

  // Downlaod the PDF
  const pdf = await page.pdf({
    path: 'result.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  });

  // Close the browser instance
  await browser.close();
  res.sendStatus(200);
}
