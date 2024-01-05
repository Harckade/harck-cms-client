# About
This project is part of the **Harck CMS by [Harckade](https://www.harckade.com) - A free and opensource serverless content management system**
It is an example of a SSR (Server-Side Rendering) client for Harckade CMS powered by [Next.js](https://nextjs.org/).

Use it as a canvas to create your own blog using Harckade CMS.

# Run locally
First you need to update the .env.local file
```javascript
SERVER_ADDRESS = "API_ADDRESS"
YOUR_WEBSITE_URL = "http://localhost:3000"
GA_TRACKING_ID = "G-"
ENVIRONMENT = "DEV"
YOUR_PRIVACY_EMAIL = "info@localhost:3000"
```
GA_TRACKING_ID is Google analytics identifier. It is required if you want to integrate your blog with it.
Please note, that the Google analytics will work only if the users accepts the cookies first.

## Build and run
To run the server locally run the following commands:

```bash
npm run-script dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.


You can also build the whole bundle and run the server. It will be rendered way faster than using dev mode, but you will have to run the build script each time you edited something:

```bash
npm run-script build
npm run-script start
```


# Publish your blog online
## Requirements
- Harck CMS backoffice (both frontend and backend: check out Harck CMS backend project's documentation)
- Azure Static Web Apps properly configured
- Github Actions `Actions secrets and variables` configured
- Custom domain (optional)
- Configure blog languages

### Azure static Web Apps
Navigate to [Azure portal](https://portal.azure.com) and go to `Static Web Apps` section.
Then, perform the following actions:
1. Click on `create` button
2. Select your subscription and resource group
3. Enter a name for your website and select the `Free: For hobby or personal projects` plan
4. Choose a location that is nearest to you or your target audience
5. Under the `Deployment details` make sure `GitHub` is selected
6. If needed link your Github account with Azure and then select the organization and repository to which you have cloned the Harck Client
7. Select the desired branch (if it's your production website keep the `main` branch)
8. Keep the Build preset empty
9. Click `Review + create` and finish the setup
10. Once the setup is finished, open the static app on the Azure portal and copy the deployment token by clicking on the `Manage deployment token`. You will need it for the GitHub Actions configuration

### GitHub Actions configuration
Open the repository you have cloned and navigate to `Settings` section.

There, on the left side expand the `Secrets and variables` under `Security` section and click on `Actions`.
You need to configure the following secrets (make sure the secrets names are spelled correctly, as they are used by GitHub Actions workflow):
1. AZURE_STATIC_WEB_APPS_API_TOKEN (token to deploy the website on Azure Static Web Apps)
2. GA_TRACKING_ID (Google Analytics ID - optional)
3. SERVER_ADDRESS (Your Harck CMS API instance address)
4. YOUR_PRIVACY_EMAIL (Email that appears on the privacy page. WARNING: It is your responsability to update the privacy page according to your needs and your modifications)
5. YOUR_WEBSITE_URL (The URL of your blog. It is required because some links are built using this variable)
6. ENVIRONMENT (e.g.: DEV | PROD. If you put anything but PROD, robots.txt will disallow all agents)

### Custom domain
Navigate to [Azure portal](https://portal.azure.com) and go to your Harck client's Static Web App.
Then, on the left panel, under `settings` section click on the `Custom domains` and follow this [guide](https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain).


### Configure blog languages
The language system for this blog works on the following way:
- To properly display text in different languages, on the components you create, use Text variable defined on the `consts\translations`. E.g.: `Text.PrivacyPolicy[lang]`
- All new website pages that you want to expose in different languages should be added under `pages/[lang]`.
- The languages that will appear available on your blog's website are defined on the Harckade backoffice.
- When you add a new language (besides English), or just want to make changes to already existing text, do not forget to update the `consts\translations` files with respective languages. If you skip this step compiling/rendering issues may occur.


## Robots.txt
By default, any environment that is not `PROD` will disallow any search engine from indexing the website. Feel free to update it at `pages\robots.txt.js`. The environment is specified as a Github Actions secret


## Reflect changes on your website
Once you publish or remove an already existing article a new deployment of your website should occur. If after ~10 minutes you cannot see the changes on your website, go to the backoffice and on the `SETTINGS` page navigate to the `Deployment` tab and hit `DEPLOY`.
> [!NOTE]
> Tip: If you're having problems with deployment, check GitHub's actions logs to see what is going wrong.