# US Mortgage Calculator

A responsive React.js application for calculating US mortgage payments with Bootstrap styling.

## Features

- 📊 **Accurate Mortgage Calculations** - Calculate monthly payments including principal, interest, taxes, and insurance
- 💰 **Comprehensive Cost Breakdown** - View detailed breakdown of all monthly costs
- 🏠 **Additional Costs Support** - Include property tax, home insurance, PMI, and HOA fees
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Clean and intuitive interface using Bootstrap 5
- ⚡ **Real-time Updates** - Instant calculation as you adjust values

## What This Calculator Includes

- **Principal & Interest**: The main loan payment
- **Property Tax**: Annual property taxes (divided monthly)
- **Home Insurance**: Annual homeowners insurance (divided monthly)
- **PMI**: Private Mortgage Insurance (required if down payment < 20%)
- **HOA Fees**: Homeowners Association fees
- **Loan-to-Value Ratio**: LTV calculation and warnings
- **Total Interest**: Total interest paid over the life of the loan

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Technologies Used

- **React 18** - Modern React with hooks
- **Bootstrap 5** - Responsive UI framework
- **React Bootstrap** - Bootstrap components for React
- **Vite** - Fast development and build tool

## How the Mortgage Calculation Works

The calculator uses the standard mortgage payment formula:

```
M = P * [r(1+r)^n] / [(1+r)^n - 1]
```

Where:

- M = Monthly payment
- P = Principal loan amount
- r = Monthly interest rate (annual rate / 12)
- n = Total number of payments (years \* 12)

## Customization

### Default Values

You can modify the default values in `src/App.jsx`:

- Default home price: $300,000
- Default down payment: $60,000
- Default interest rate: 6.5%
- Default loan term: 30 years

### Advertisement Configuration

Control advertisement display through `src/config.json`:

```json
{
  "features": {
    "showAds": false, // Set to true to enable ads
    "adPlacement": {
      "verticalLeftSidebar": true // Show/hide left sidebar ad
    }
  }
}
```

**To enable ads:**

1. Open `src/config.json`
2. Change `"showAds": false` to `"showAds": true`
3. Save the file and restart the dev server

**To disable ads:**

1. Open `src/config.json`
2. Change `"showAds": true` to `"showAds": false`
3. Save the file and restart the dev server

When ads are disabled, the main content expands to use the full width for a better user experience.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Contributing

Feel free to submit issues and pull requests!
