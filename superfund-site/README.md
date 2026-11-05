# SuperFund website

This static, dependency-free website is kept separate from the Indiwage backend.
It can be previewed locally by opening `index.html` or running:

```powershell
python -m http.server 8000 --directory superfund-site
```

The GitHub Actions workflow at `.github/workflows/superfund-pages.yml` publishes
only this directory. In the repository's **Settings → Pages**, select **GitHub
Actions** as the deployment source. The website will be available at the Pages
URL for the repository once the workflow finishes.

The enquiry form is a frontend-only demonstration. It validates fields in the
browser, sends no requests, and does not store or collect financial information.
Connect it to a secure, consent-reviewed service before accepting real enquiries.
